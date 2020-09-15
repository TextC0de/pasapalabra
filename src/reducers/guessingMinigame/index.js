const actionTypes = {
    INIT: 'INIT',
    SET_WON: 'SET_WON',
    SET_HINT: 'SET_HINT',
    SET_ANSWER: 'SET_ANSWER',
    SET_STARTED: 'SET_STARTED',
    SET_HAS_FINISHED: 'SET_HAS_FINISHED'
};

export const initialState = {
    answer: '',
    topic: '',
    won: false,
    started: false,
    finished: false,
    hint: 0,
    hintIndex: 0,
    timeTillNextHint: 0,
    answeredHints: []
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
        case actionTypes.SET_WON:
            return { ...state, won: action.payload.data };
        case actionTypes.SET_HINT:
            return {
                ...state,
                hint: action.payload.hint,
                hintIndex: action.payload.hintIndex,
                timeTillNextHint: action.payload.timeTillNextHint,
                answeredHints: action.payload.answeredHints || []
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

const setHint = ({ hint, hintIndex, timeTillNextHint, answeredHints }) => ({
    type: actionTypes.SET_HINT,
    payload: {
        hint,
        hintIndex,
        timeTillNextHint,
        answeredHints
    }
});

const setWon = (value) => ({
    type: actionTypes.SET_WON,
    payload: {
        data: value
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
    setWon,
    setHint,
    setAnswer,
    setStarted,
    setHasFinished
};
