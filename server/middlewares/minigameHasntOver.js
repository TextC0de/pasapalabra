import { Room } from '../models';

export default async ({ params, user }, res, next) => {
    const now = new Date();
    const { id, minigameCode } = params;

    if (!id || !minigameCode) {
        return res.status(400).json({
            success: false,
            error: 'You must provide an id and a minigameCode code'
        });
    }

    try {
        const room = await Room.findById(id, `actualMinigameCode player.id player.minigamesStatus`);

        if (!room) {
            return res.status(404).json({
                error: new Error("Room doesn't exists"),
                message: 'Room not found!'
            });
        }

        if (room.player.id !== user._id.toString()) {
            return res.status(403).json({
                error: new Error('You are not a player in this game')
            });
        }

        const { deadlineDate: guessingDeadlineDate } = room.player.minigamesStatus.guessing;
        const { deadlineDate: hangmanDeadlineDate } = room.player.minigamesStatus.hangman;
        const { started, deadlineDate, finished } = room.player.minigamesStatus[minigameCode];

        if (room.actualMinigameCode !== minigameCode) {
            if (minigameCode === 'hangman') {
                if (now >= guessingDeadlineDate) {
                    room.player.minigamesStatus.guessing.finished = true;
                    room.actualMinigameCode = 'hangman';
                }
            } else if (minigameCode === 'alphabet') {
                if (now >= hangmanDeadlineDate) {
                    room.player.minigamesStatus.hangman.finished = true;
                    room.actualMinigameCode = 'alphabet';
                }
            } else {
                return res.status(400).json({
                    error: 'This minigameCode hasnt started yet or have already finished',
                    finished
                });
            }
        }

        if (!started) {
            return res.status(400).json({ error: 'The minigameCode hasnt started yet' });
        }

        if (finished || (deadlineDate && now >= deadlineDate)) {
            if (!finished || room.actualMinigameCode === minigameCode) {
                room.player.minigamesStatus[minigameCode].finished = true;
                room.actualMinigameCode = minigameCode === 'guessing' ? 'hangman' : 'alphabet';
                await room.save();
            }

            return res.status(400).json({
                error: 'The minigameCode has already ended',
                finished: true
            });
        }

        return next();
    } catch (error) {
        console.error(error);
        return res.status(404).json({ error });
    }
};
