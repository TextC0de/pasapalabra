import { Room } from '../../../models';

const GUESSING_MINIGAME_CODE = 'guessing';
const HANGMAN_MINIGAME_CODE = 'hangman';
const ALPHABET_MINIGAME_CODE = 'alphabet';

const TIME_PER_HINT = 15;
const TIME_PER_WORD = 150;
const TIME_PER_LETTER = 15;

const startMinigame = async ({ params }, res) => {
    const { id, minigameCode } = params;

    if (!id || !minigameCode) {
        return res.status(400).json({
            success: false,
            error: 'You must provide an id and a minigame'
        });
    }

    try {
        const room = await Room.findById(
            id,
            'player.minigamesStatus game.minigames.guessing.hints game.minigames.hangman.words'
        );

        if (!room) {
            return res.status(404).json({
                error: "Room doesn't exists",
                message: 'Room not found!'
            });
        }

        if (room.player.minigamesStatus[minigameCode].started) {
            return res.status(400).json({ error: 'The minigame has already started' });
        }

        const minigame = room.game.minigames[minigameCode];
        let deadlineDate;
        switch (minigameCode) {
            case GUESSING_MINIGAME_CODE:
                deadlineDate = new Date().setSeconds(
                    new Date().getSeconds() + minigame.hints.length * TIME_PER_HINT
                );
                break;
            case HANGMAN_MINIGAME_CODE:
                deadlineDate = new Date().setSeconds(
                    new Date().getSeconds() + minigame.words.length * TIME_PER_WORD
                );
                break;
            case ALPHABET_MINIGAME_CODE:
                deadlineDate = new Date().setSeconds(
                    new Date().getSeconds() + 20 * TIME_PER_LETTER
                );
                break;
            default:
                break;
        }

        room.player.minigamesStatus[minigameCode].started = true;
        room.player.minigamesStatus[minigameCode].initialDate = new Date();
        room.player.minigamesStatus[minigameCode].deadlineDate = deadlineDate;
        await room.save();

        return res.status(200).json({
            message: 'Minigame started'
        });
    } catch (error) {
        return res.status(404).json({ error });
    }
};

const getMinigameDataAndPlayerStats = async ({ params }, res) => {
    const { id, minigameCode } = params;

    if (!id || !minigameCode) {
        return res.status(400).json({
            success: false,
            error: 'You must provide an id and a minigame'
        });
    }

    try {
        const room = await Room.findById(id, 'game.minigames player.minigamesStatus');

        const minigame = room.game.minigames[minigameCode];
        switch (minigameCode) {
            case GUESSING_MINIGAME_CODE:
                return res.status(200).json({
                    data: {
                        answer: minigame.answer,
                        secondsWinned: minigame.secondsWinned
                    }
                });
            case HANGMAN_MINIGAME_CODE:
                return res.status(200).json({
                    data: {
                        words: minigame.words,
                        secondsWinned: minigame.secondsWinned
                    }
                });
            default:
                return res.status(400).json({
                    error: 'wrong minigame code'
                });
        }
    } catch (error) {
        return res.status(404).json({ error });
    }
};

export default {
    startMinigame,
    getMinigameDataAndPlayerStats
};
