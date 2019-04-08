import Immutable from 'utils/immutable/Immutable';
import { SHOW_TOASTR } from 'store/actions/app';

const initialState = {
    toastrOptions: {},
};

/**
 * Reducer to handle app actions
 * @param state
 * @param action
 * @returns {*}
 */
export default (state: Object = initialState, action: Object) => {
    const { type, payload } = action;
    switch (type) {
        case SHOW_TOASTR: {
            return Immutable({ ...state, toastrOptions: payload });
        }
        default:
            return state;
    }
};
