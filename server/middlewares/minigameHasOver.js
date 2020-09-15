import { Room } from '../models';

export default async ({ params, user }, res, next) => {
    const { id, minigameCode } = params;

    if (!id || !minigameCode) {
        return res.status(400).json({
            error: 'You must provide an id and a minigameCode code'
        });
    }

    try {
        const room = await Room.findById(id, `actualMinigameCode player.id player.minigamesStatus`);

        if (!room) {
            return res.status(404).json({
                error: "Room doesn't exists",
                message: 'Room not found!'
            });
        }

        if (room.player.id !== user._id.toString()) {
            return res.status(403).json({
                error: 'You are not a player in this game'
            });
        }

        const { deadlineDate: guessingDeadlineDate } = room.player.minigamesStatus.guessing;
        const { deadlineDate: hangmanDeadlineDate } = room.player.minigamesStatus.hangman;
        const { started, finished } = room.player.minigamesStatus[minigameCode];

        const now = new Date();
        if (!finished && room.actualMinigameCode !== minigameCode) {
            if (room.actualMinigameCode === 'hangman') {
                if (now >= guessingDeadlineDate) {
                    room.player.minigamesStatus.guessing.finished = true;
                    room.actualMinigameCode = 'hangman';
                    await room.save();
                }
            } else if (room.actualMinigameCode === 'alphabet') {
                if (now >= hangmanDeadlineDate) {
                    room.player.minigamesStatus.hangman.finished = true;
                    room.actualMinigameCode = 'alphabet';
                    await room.save();
                }
            } else {
                return res.status(400).json({
                    error: 'This minigameCode hasnt started yet or have already finished'
                });
            }
        }

        if (!started || !finished) {
            return res.status(400).json({ error: 'The minigameCode hasnt finished yet' });
        }

        return next();
    } catch (error) {
        console.error(error);
        return res.status(404).json({ error });
    }
};
