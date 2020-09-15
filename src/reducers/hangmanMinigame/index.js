const actionTypes = {
    INIT: 'INIT',
    SET_WORD: 'SET_WORD',
    SET_ANSWER: 'SET_ANSWER',
    SET_STARTED: 'SET_STARTED',
    SET_HAS_FINISHED: 'SET_HAS_FINISHED'
};

export const initialState = {
    answer: '',
    topic: '',
    started: false,
    finished: false,
    word: 0,
    wordIndex: 0
};

export const reducer = (state, action) => {
    switch (action.type) {
        case actionTypes.INIT:
            return {
                ...state,
                topic: action.payload.topic,
                won: action.payload.won,
                started: action.payload.started,
                finished: action.payload.finished
            };
        case actionTypes.SET_WORD:
            return {
                ...state,
                word: action.payload.word,
                wordIndex: action.payload.wordIndex,
                timeLeft: action.payload.timeLeft
            };
        case actionTypes.SET_ANSWER:
            return { ...state, answer: action.payload.data };
        case actionTypes.SET_STARTED:
            return { ...state, started: action.payload.data };
        case actionTypes.SET_HAS_FINISHED:
            return { ...state, finished: action.payload.data };
        default:
            return state;
    }
};

const setAnswer = (value) => ({ type: actionTypes.SET_ANSWER, payload: { data: value } });

const init = ({ topic, won, started, finished }) => ({
    type: actionTypes.INIT,
    payload: {
        topic,
        won,
        started,
        finished
    }
});

const setWord = ({ word, wordIndex, timeLeft }) => ({
    type: actionTypes.SET_WORD,
    payload: {
        word,
        wordIndex,
        timeLeft
    }
});

const setStarted = (value) => ({
    type: actionTypes.SET_STARTED,
    payload: {
        data: value
    }
});

const setHasFinished = (value) => ({
    type: actionTypes.SET_HAS_FINISHED,
    payload: {
        data: value
    }
});

export const actions = {
    init,
    setWord,
    setAnswer,
    setStarted,
    setHasFinished
};
