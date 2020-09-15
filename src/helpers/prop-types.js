import PropTypes from 'prop-types';

export const userShape = PropTypes.shape({
    _id: PropTypes.string,
    username: PropTypes.string
});

export const gameShape = PropTypes.shape({
    _id: PropTypes.string,
    owner: userShape,
    title: PropTypes.string,
    description: PropTypes.string,
    contributors: PropTypes.arrayOf(userShape),
    tags: PropTypes.arrayOf(PropTypes.string),
    likes: PropTypes.number,
    timesPlayed: PropTypes.number,
    minigames: {
        guessing: {
            topic: PropTypes.string,
            answer: PropTypes.string,
            hints: PropTypes.arrayOf(PropTypes.string)
        },
        hangman: {
            topic: PropTypes.string,
            words: PropTypes.arrayOf(PropTypes.string)
        },
        alphabet: {
            topic: PropTypes.string,
            letters: {
                A: {
                    answer: PropTypes.string,
                    definition: PropTypes.string
                },
                B: {
                    answer: PropTypes.string,
                    definition: PropTypes.string
                },
                C: {
                    answer: PropTypes.string,
                    definition: PropTypes.string
                },
                D: {
                    answer: PropTypes.string,
                    definition: PropTypes.string
                },
                E: {
                    answer: PropTypes.string,
                    definition: PropTypes.string
                },
                F: {
                    answer: PropTypes.string,
                    definition: PropTypes.string
                },
                G: {
                    answer: PropTypes.string,
                    definition: PropTypes.string
                },
                H: {
                    answer: PropTypes.string,
                    definition: PropTypes.string
                },
                I: {
                    answer: PropTypes.string,
                    definition: PropTypes.string
                },
                J: {
                    answer: PropTypes.string,
                    definition: PropTypes.string
                },
                K: {
                    answer: PropTypes.string,
                    definition: PropTypes.string
                },
                L: {
                    answer: PropTypes.string,
                    definition: PropTypes.string
                },
                M: {
                    answer: PropTypes.string,
                    definition: PropTypes.string
                },
                N: {
                    answer: PropTypes.string,
                    definition: PropTypes.string
                },
                Ñ: {
                    answer: PropTypes.string,
                    definition: PropTypes.string
                },
                O: {
                    answer: PropTypes.string,
                    definition: PropTypes.string
                },
                P: {
                    answer: PropTypes.string,
                    definition: PropTypes.string
                },
                Q: {
                    answer: PropTypes.string,
                    definition: PropTypes.string
                },
                R: {
                    answer: PropTypes.string,
                    definition: PropTypes.string
                },
                S: {
                    answer: PropTypes.string,
                    definition: PropTypes.string
                },
                T: {
                    answer: PropTypes.string,
                    definition: PropTypes.string
                },
                U: {
                    answer: PropTypes.string,
                    definition: PropTypes.string
                },
                V: {
                    answer: PropTypes.string,
                    definition: PropTypes.string
                },
                W: {
                    answer: PropTypes.string,
                    definition: PropTypes.string
                },
                X: {
                    answer: PropTypes.string,
                    definition: PropTypes.string
                },
                Y: {
                    answer: PropTypes.string,
                    definition: PropTypes.string
                },
                Z: {
                    answer: PropTypes.string,
                    definition: PropTypes.string
                }
            }
        }
    }
});

export const guessingMinigameShape = PropTypes.shape({
    topic: PropTypes.string,
    answer: PropTypes.string,
    hints: PropTypes.arrayOf(PropTypes.string)
});
