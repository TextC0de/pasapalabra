import mongoose from 'mongoose';
import util from 'util';

const { Schema } = mongoose;

function MinigameSchema(...args) {
    Schema.apply(this, args);

    this.add({
        topic: { type: String, default: '' }
    });
}
util.inherits(MinigameSchema, Schema);

const GuessingSchema = new MinigameSchema({
    answer: { type: String, required: false },
    hints: [String]
});

const HangmanSchema = new MinigameSchema({
    words: [String]
});

const AlphabetLetterSchema = new Schema({
    answer: { type: String, default: '' },
    definition: { type: String, default: '' }
});

const AlphabetSchema = new Schema({
    letters: {
        A: { type: AlphabetLetterSchema, default: {} },
        B: { type: AlphabetLetterSchema, default: {} },
        C: { type: AlphabetLetterSchema, default: {} },
        D: { type: AlphabetLetterSchema, default: {} },
        E: { type: AlphabetLetterSchema, default: {} },
        F: { type: AlphabetLetterSchema, default: {} },
        G: { type: AlphabetLetterSchema, default: {} },
        H: { type: AlphabetLetterSchema, default: {} },
        I: { type: AlphabetLetterSchema, default: {} },
        J: { type: AlphabetLetterSchema, default: {} },
        K: { type: AlphabetLetterSchema, default: {} },
        L: { type: AlphabetLetterSchema, default: {} },
        M: { type: AlphabetLetterSchema, default: {} },
        N: { type: AlphabetLetterSchema, default: {} },
        Ñ: { type: AlphabetLetterSchema, default: {} },
        O: { type: AlphabetLetterSchema, default: {} },
        P: { type: AlphabetLetterSchema, default: {} },
        Q: { type: AlphabetLetterSchema, default: {} },
        R: { type: AlphabetLetterSchema, default: {} },
        S: { type: AlphabetLetterSchema, default: {} },
        T: { type: AlphabetLetterSchema, default: {} },
        U: { type: AlphabetLetterSchema, default: {} },
        V: { type: AlphabetLetterSchema, default: {} },
        W: { type: AlphabetLetterSchema, default: {} },
        X: { type: AlphabetLetterSchema, default: {} },
        Y: { type: AlphabetLetterSchema, default: {} },
        Z: { type: AlphabetLetterSchema, default: {} }
    }
});

const Game = new Schema(
    {
        owner: {
            id: { type: String, required: true },
            username: { type: String, required: true }
        },
        title: { type: String, required: true },
        description: { type: String, required: false },
        contributors: [
            {
                id: { type: String, required: true },
                username: { type: String, required: true }
            }
        ],
        tags: [String],
        likes: { type: Number, default: 0 },
        timesPlayed: { type: Number, default: 0 },
        isPublished: { type: Boolean, default: false },
        isPrivate: { type: Boolean, default: false },
        minigames: {
            guessing: { type: GuessingSchema, default: {} },
            hangman: { type: HangmanSchema, default: {} },
            alphabet: { type: AlphabetSchema, default: {} }
        }
    },
    { timestamps: true }
);

export default mongoose.model('Game', Game);
