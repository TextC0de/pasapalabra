const addToListNoDuplicates = (list, item) => [...new Set([...list, item])];

const removeByIndexNoMutation = (list, index) => {
    const listCopy = list;
    listCopy.splice(index, 1);
    return listCopy;
};

const actionTypes = {
    SET_LETTERS_LEFT: 'SET_LETTERS_LEFT',
    ON_TIME_UP: 'ON_TIME_UP',
    INCREMENT_ELLAPSED_TIME: 'INCREMENT_ELLAPSED_TIME',
    SHOW_NEXT_LETTER: 'INCREMENT_ACTUAL_LETTER',
    PUSH_CORRECT_LETTER: 'PUSH_CORRECT_LETTER',
    PUSH_WRONG_LETTER: 'PUSH_WRONG_LETTER',
    PUSH_SEEN_LETTER: 'PUSH_SEEN_LETTER',
    REMOVE_ACTUAL_FROM_LETTERS_LEFT: 'REMOVE_ACTUAL_FROM_LETTERS_LEFT'
};

export const initialState = {
    letterIndex: 0,
    lettersLeft: [],
    seenLetters: [],
    wrongLetters: [],
    lettersLeftSetted: false,
    correctLetters: [],
    timeIsUp: false,
    ellapsedTime: 0
};

export const reducer = (state, action) => {
    switch (action.type) {
        case actionTypes.ON_TIME_UP:
            return { ...state, timeIsUp: true };
        case actionTypes.SHOW_NEXT_LETTER:
            return {
                ...state,
                letterIndex:
                    state.letterIndex === state.lettersLeft.length - 1 ? 0 : state.letterIndex + 1
            };
        case actionTypes.INCREMENT_ELLAPSED_TIME:
            return { ...state, ellapsedTime: state.ellapsedTime + 1 };
        case actionTypes.SET_LETTERS_LEFT:
            return { ...state, lettersLeft: [...action.payload.data], lettersLeftSetted: true };
        case actionTypes.PUSH_CORRECT_LETTER:
            return {
                ...state,
                correctLetters: addToListNoDuplicates(
                    state.correctLetters,
                    state.lettersLeft[state.letterIndex]
                )
            };
        case actionTypes.PUSH_WRONG_LETTER:
            return {
                ...state,
                wrongLetters: addToListNoDuplicates(
                    state.wrongLetters,
                    state.lettersLeft[state.letterIndex]
                )
            };
        case actionTypes.PUSH_SEEN_LETTER:
            return {
                ...state,
                seenLetters: addToListNoDuplicates(
                    state.seenLetters,
                    state.lettersLeft[state.letterIndex]
                )
            };
        case actionTypes.REMOVE_ACTUAL_FROM_LETTERS_LEFT:
            return {
                ...state,
                lettersLeft: removeByIndexNoMutation(state.lettersLeft, state.letterIndex)
            };
        default:
            return state;
    }
};

const onTimeUp = () => ({ type: actionTypes.ON_TIME_UP });
const nextLetter = () => ({ type: actionTypes.SHOW_NEXT_LETTER });
const incrementEllapsedTime = () => ({ type: actionTypes.INCREMENT_ELLAPSED_TIME });
const removeActualFromLettersLeft = () => ({ type: actionTypes.REMOVE_ACTUAL_FROM_LETTERS_LEFT });

const setLettersLeft = (letters) => ({
    type: actionTypes.SET_LETTERS_LEFT,
    payload: { data: letters }
});

const pushCorrectLetter = () => ({ type: actionTypes.PUSH_CORRECT_LETTER });
const pushWrongLetter = () => ({ type: actionTypes.PUSH_WRONG_LETTER });
const pushSeenLetter = () => ({ type: actionTypes.PUSH_SEEN_LETTER });

export const actions = {
    onTimeUp,
    nextLetter,
    incrementEllapsedTime,
    removeActualFromLettersLeft,
    setLettersLeft,
    pushCorrectLetter,
    pushWrongLetter,
    pushSeenLetter
};
