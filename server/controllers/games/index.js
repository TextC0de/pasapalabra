import { Game, User } from '../../models';
import { isJsonString } from '../../helpers/json-helpers';

const createGame = async ({ body, user }, res) => {
    const { title, description = '', tags = [] } = body;

    if (!title) {
        return res.status(400).json({
            error: 'You must provide the game title'
        });
    }

    try {
        const ownerExists = await User.exists({ username: user.username });
        if (!ownerExists) throw new Error('Invalid game owner');
    } catch (error) {
        return res.status(400).json({
            error,
            message:
                "The game wasn't created (The owner doesn't exists or you dont have permissions)"
        });
    }

    try {
        const game = new Game({
            owner: {
                id: user._id,
                username: user.username
            },
            title,
            description,
            tags
        });
        await game.save();

        return res.status(201).json({
            data: game._id,
            message: 'Game created'
        });
    } catch (error) {
        return res.status(400).json({
            error,
            message: "The game wasn't created"
        });
    }
};

const updateGame = async ({ body, user, params }, res) => {
    const { id } = params;
    if (!body || !id) {
        return res.status(400).json({
            error: 'You must provide a body to update and the game id to update'
        });
    }

    try {
        const game = await Game.findById(id).exec();

        if (game.owner.id !== user.id) {
            throw new Error('You dont have permissions to update this game');
        }

        await Game.findByIdAndUpdate(id, body).exec();
        return res.status(200).json({
            success: true,
            message: 'Game updated'
        });
    } catch (error) {
        return res.status(404).json({
            error,
            message: 'Game not updated'
        });
    }
};

const deleteGame = async ({ params }, res) => {
    const { id } = params;
    if (!id) {
        return res.status(400).json({
            error: 'You must provide a game id for delete'
        });
    }

    try {
        await Game.findOneAndDelete({ _id: id });

        return res.status(200).json({
            success: true,
            message: `The game with id "${id}" was deleted`
        });
    } catch (error) {
        return res.status(404).json({
            error,
            message: `The game with id "${id}" wasn't deleted`
        });
    }
};

const getGameById = async ({ params, user }, res) => {
    const { id } = params;

    if (!id) {
        return res.status(400).json({
            error: 'You must provide a game id for get'
        });
    }

    try {
        const game = await Game.findById(id);
        return res.status(200).json({
            success: true,
            message: `The game with id "${id}" was found and delivered`,
            data:
                game.owner.id === user._id
                    ? game
                    : {
                          _id: id,
                          owner: game.owner,
                          title: game.title,
                          tags: game.tags,
                          contributors: game.contributors,
                          likes: game.likes,
                          timesPlayed: game.timesPlayed
                      }
        });
    } catch (error) {
        return res.status(404).json({
            error,
            message: `The game with id "${id}" wasn't found`
        });
    }
};

const getGames = async ({ query }, res) => {
    const { filters = '{}', options = null } = query;

    if (!isJsonString(filters) || (!isJsonString(options) && options !== null)) {
        return res.status(400).json({
            error:
                "Couldn't get games, the filter must be a json string and the options must be a json string or null"
        });
    }

    try {
        const games = await Game.find(
            JSON.parse(filters),
            'title owner likes timesPlayed contributors',
            JSON.parse(options)
        );
        if (!games) {
            return res.status(404).json({
                message: `Couldn't get games with
                filters: ${JSON.stringify(filters)}, 
                options: ${JSON.stringify(options)}`
            });
        }

        return res.status(200).json({
            success: true,
            message: `Delivered ${games.length} games`,
            data: games
        });
    } catch (error) {
        return res.status(400).json({
            error,
            message: `Error while getting games
            filters: ${JSON.stringify(filters)}, 
            options: ${JSON.stringify(options)}`
        });
    }
};

export default {
    createGame,
    updateGame,
    deleteGame,
    getGames,
    getGameById
};
