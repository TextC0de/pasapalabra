import mongoose, { Schema } from 'mongoose';
import util from 'util';

const Game = mongoose.model('Game').schema;

function PlayerMinigameStatusSchema(...args) {
    Schema.apply(this, args);

    this.add({
        started: { type: Boolean, default: false },
        finished: { type: Boolean, default: false },
        initialDate: { type: Date, default: null },
        deadlineDate: { type: Date, default: null },
        finishDate: { type: Number, default: null },
        secondsWinned: { type: Number, default: 0 }
    });
}
util.inherits(PlayerMinigameStatusSchema, Schema);

const PlayerGuessingStatusSchema = new PlayerMinigameStatusSchema({
    answeredHints: [Number],
    won: { type: Boolean, default: false }
});

const PlayerHangmanStatusSchema = new PlayerMinigameStatusSchema({
    wordIndex: { type: Number, default: 0 },
    normalizedLettersTried: [String],
    wordsStatus: [
        {
            word: { type: String, required: true },
            guessed: { type: Boolean, required: true },
            tries: [String]
        }
    ]
});

const PlayerAlphabetStatusSchema = new PlayerMinigameStatusSchema({
    seenLetters: { type: Number, default: 0 },
    wrongLetters: { type: Number, default: 0 },
    correctLetters: { type: Number, default: 0 }
});

const Player = new Schema({
    id: { type: String, required: true },
    username: { type: String, required: true },
    minigamesStatus: {
        guessing: { type: PlayerGuessingStatusSchema, default: {} },
        hangman: { type: PlayerHangmanStatusSchema, default: {} },
        alphabet: { type: PlayerAlphabetStatusSchema, default: {} }
    }
});

const MinigameStatus = new Schema({
    hasFinished: { type: Boolean, default: false }
});

const Room = new Schema(
    {
        game: { type: Game, required: true },
        player: { type: Player, required: true },
        hasFinished: { type: Boolean, default: false },
        actualMinigameCode: { type: String, default: 'guessing' },
        minigamesStatus: {
            guessing: { type: MinigameStatus, default: {} },
            hangman: { type: MinigameStatus, default: {} },
            alphabet: { type: MinigameStatus, default: {} }
        }
    },
    { timestamps: true }
);

export default mongoose.model('rooms', Room);
