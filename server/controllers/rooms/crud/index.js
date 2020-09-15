import { Room, Game } from '../../../models';
import { isJsonString } from '../../../helpers/json-helpers';

const createRoom = async ({ body, user }, res) => {
    const { game } = body;
    if (!game || !game._id || !user) {
        return res.status(400).json({
            error: 'You must provide a game and a user'
        });
    }

    try {
        const fullGameData = await Game.findById(game._id);
        if (!fullGameData) {
            return res.status(400).json({
                error: new Error('The game was deleted while creating the room'),
                message: 'Room not created!'
            });
        }

        const room = new Room({
            game: fullGameData,
            player: {
                id: user._id,
                username: user.username
            }
        });

        await room.save();

        return res.status(201).json({
            success: true,
            data: room._id,
            message: 'Room created!'
        });
    } catch (error) {
        return res.status(400).json({
            error,
            message: 'Room not created!'
        });
    }
};

const updateRoom = async ({ body, params, user }, res) => {
    const { id } = params;
    if (!body || !id) {
        return res.status(400).json({
            success: false,
            error: 'You must provide an id and a body to update'
        });
    }

    try {
        const room = await Room.findById(id);

        if (room.player.id !== user._id) {
            return res.status(400).json({
                error: new Error('You dont have permissions to update this room'),
                message: 'Room not updated!'
            });
        }

        await Room.findByIdAndUpdate(id, body);

        return res.status(200).json({
            success: true,
            message: 'Room updated!'
        });
    } catch (error) {
        return res.status(404).json({
            error,
            message: 'Room not updated!'
        });
    }
};

/* const deleteRoom = async ({ params, user }, res) => {
    const { id } = params;
    if (id || !user) {
        return res.status(400).json({
            success: false,
            error: 'You must provide an id and a body to update'
        });
    }

    await Room.findOneAndDelete({ _id: req.params.id }, (err, room) => {
        if (err) {
            return res.status(400).json({ success: false, error: err });
        }

        if (!room) {
            return res.status(404).json({ success: false, error: `Room not found` });
        }

        return res.status(200).json({ success: true, data: room });
    }).catch((err) => console.log(err));
}; */

const getRoomById = async ({ params, user }, res) => {
    const { id } = params;
    if (!id) {
        return res.status(400).json({
            success: false,
            error: 'You must provide an id'
        });
    }

    try {
        const room = await Room.findById(id);
        if (!room) {
            return res.status(404).json({
                error: new Error("Room doesn't exists"),
                message: 'Room not found!'
            });
        }

        if (room.player.id === user._id) {
            Object.keys(room.game.minigames).forEach((minigameKey) => {
                if (!room.minigamesStatus[minigameKey].hasFinished) {
                    Object.keys(room.game.minigames[minigameKey]).forEach((minigamePropKey) => {
                        if (minigamePropKey !== 'topic') {
                            delete room.game.minigames[minigameKey][minigamePropKey];
                        }
                    });
                }
            });

            return res.status(200).json({
                message: `Room with id "${id}" was delivered successfully!`,
                data: room
            });
        }

        delete room.game;
        return res.status(200).json({
            message: `Room with id "${id}" was delivered successfully!`,
            data: room
        });
    } catch (error) {
        return res.status(404).json({
            error,
            message: 'There was an error while getting the room!'
        });
    }
};

const getRooms = async ({ query }, res) => {
    const { filters = '{}', options = null } = query;

    if (!isJsonString(filters) || (!isJsonString(options) && options !== null)) {
        return res.status(400).json({
            error:
                "Couldn't get games, the filter must be a json string and the options must be a json string or null"
        });
    }

    try {
        const rooms = await Game.find(
            JSON.parse(filters),
            'player hasFinished actualGame minigamesStatus',
            JSON.parse(options)
        );

        if (!rooms) {
            return res.status(404).json({
                message: `No rooms found with
                filters: ${JSON.stringify(filters)}, 
                options: ${JSON.stringify(options)}`
            });
        }

        return res.status(200).json({
            success: true,
            message: `Delivered ${rooms.length} rooms`,
            data: rooms
        });
    } catch (error) {
        return res.status(400).json({
            error,
            message: `Error while getting rooms
            filters: ${JSON.stringify(filters)}, 
            options: ${JSON.stringify(options)}`
        });
    }
};

export default {
    createRoom,
    updateRoom,
    getRooms,
    getRoomById
};
