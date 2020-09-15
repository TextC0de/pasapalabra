const actionTypes = {
    FIELD_CHANGE: 'FIELD_CHANGE'
};

export const initialState = {};
export const reducer = (state, action) => {
    switch (action.type) {
        case actionTypes.FIELD_CHANGE:
            return { ...state, [action.payload.field]: action.payload.value };
        default:
            return { ...state };
    }
};

const setFieldChange = (field, value) => {
    return {
        type: actionTypes.FIELD_CHANGE,
        payload: { field, value }
    };
};

export const actions = {
    setFieldChange
};
