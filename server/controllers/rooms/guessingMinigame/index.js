import { Room } from '../../../models';
import { normalizeString } from '../../../helpers/string';
import { getDiffInSeconds } from '../../../helpers/dates';

const TIME_PER_HINT = 15;
const TIME_WINNED_PER_HINT = 2;

const TIME_PER_WORD = 15;
const TIME_WINNED_PER_WORD = 2;

const TIME_PER_LETTER = 15;
const TIME_WINNED_PER_LETTER = 2;

const getProperHint = async ({ params }, res) => {
    const now = new Date();

    try {
        const room = await Room.findById(
            params.id,
            'player.minigamesStatus.guessing game.minigames.guessing.hints'
        );

        const { hints } = room.game.minigames.guessing;
        const { initialDate, answeredHints } = room.player.minigamesStatus.guessing;

        const ellapsedTime = Math.floor(getDiffInSeconds(now, initialDate));
        const hintIndex = Math.floor(ellapsedTime / TIME_PER_HINT);
        const timeTillNextHint = Math.floor((hintIndex + 1) * TIME_PER_HINT - ellapsedTime);

        return res.status(200).json({
            data: {
                hint: hints[hintIndex],
                hintIndex,
                timeTillNextHint,
                answeredHints: answeredHints || []
            }
        });
    } catch (error) {
        return res.status(404).json({ error });
    }
};

const postAnswer = async ({ params, body }, res) => {
    const now = new Date();
    const { answer } = body;

    if (!answer) {
        return res.status(400).json({ error: 'You must provide an answer' });
    }

    try {
        const room = await Room.findById(
            params.id,
            'player.minigamesStatus.guessing game.minigames.guessing'
        );

        const { answer: gameAnswer, hints } = room.game.minigames.guessing;
        const { answeredHints, initialDate } = room.player.minigamesStatus.guessing;

        const hintIndex = Math.floor(
            Math.floor(getDiffInSeconds(now, initialDate)) / TIME_PER_HINT
        );

        if (answeredHints.includes(hintIndex)) {
            return res.status(400).json({
                error: 'Hint already answered',
                message: 'Wait till the next hint'
            });
        }

        const answerWasCorrect = normalizeString(answer) === normalizeString(gameAnswer);

        room.player.minigamesStatus.guessing.answeredHints = [...answeredHints, hintIndex];

        if (answerWasCorrect) {
            room.player.minigamesStatus.guessing.won = true;
            room.player.minigamesStatus.guessing.finished = true;
            room.player.minigamesStatus.guessing.secondsWinned =
                (hints.length - hintIndex) * TIME_WINNED_PER_HINT;
            await room.save();
            return res.status(200).json({
                message: 'The answer was correct!'
            });
        }

        await room.save();
        return res.status(400).json({ error: "Answer doesn't match" });
    } catch (error) {
        return res.status(404).json({ error });
    }
};

export default {
    getProperHint,
    postAnswer
};
