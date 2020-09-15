import { actions, reducer } from '../index';

describe('Form reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual({});
    });

    it('should handle FIELD_CHANGE', () => {
        const fieldChange = actions.setFieldChange('testField', 'testValue');
        expect(reducer({}, fieldChange)).toEqual({ testField: 'testValue' });
    });
});
