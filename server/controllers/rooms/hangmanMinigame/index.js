import { Room } from '../../../models';
import { normalizeString } from '../../../helpers/string';
import { getDiffInSeconds } from '../../../helpers/dates';

const TIME_WINNED_PER_WORD = 2;

const getProperWord = async ({ params }, res) => {
    try {
        const room = await Room.findById(
            params.id,
            'player.minigamesStatus.hangman game.minigames.hangman.words'
        );

        const { words } = room.game.minigames.hangman;
        const {
            wordIndex,
            normalizedLettersTried,
            guessedWords,
            incorrectWords,
            deadlineDate
        } = room.player.minigamesStatus.hangman;
        const word = words[wordIndex];

        const guessedWordLettersArray = normalizeString(word)
            .split('')
            .map((normalizedLetter, index) =>
                normalizedLettersTried.includes(normalizedLetter) ? word[index] : '__'
            );

        return res.status(200).json({
            data: {
                word: guessedWordLettersArray.join(' ').toString().trim(),
                normalizedLettersTried,
                guessedWords,
                incorrectWords,
                timeLeft: Math.floor(getDiffInSeconds(deadlineDate, new Date()))
            }
        });
    } catch (error) {
        return res.status(404).json({ error });
    }
};

const postAnswer = async ({ params, body }, res) => {
    console.log('here');
    const { answer } = body;

    if (!answer) {
        return res.status(400).json({ error: 'You must provide an answer' });
    }

    try {
        const room = await Room.findById(
            params.id,
            'player.minigamesStatus.hangman game.minigames.hangman.words'
        );

        const { wordIndex, guessedWords, incorrectWords } = room.player.minigamesStatus.hangman;
        const word = room.game.minigames.hangman.words[wordIndex];

        const answerWasCorrect = normalizeString(answer) === normalizeString(word);
        room.player.minigamesStatus.hangman.wordIndex = wordIndex + 1;

        if (answerWasCorrect) {
            room.player.minigamesStatus.hangman.secondsWinned += TIME_WINNED_PER_WORD;
            room.player.minigamesStatus.hangman.guessedWords = [...guessedWords, word];
            await room.save();

            return res.status(200).json({
                message: 'The answer was correct!'
            });
        }

        room.player.minigamesStatus.hangman.incorrectWords = [...incorrectWords, word];
        await room.save();
        return res.status(400).json({ error: "Answer doesn't match" });
    } catch (error) {
        return res.status(404).json({ error });
    }
};

export default {
    getProperWord,
    postAnswer
};
