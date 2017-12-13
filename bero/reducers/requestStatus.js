import { REQUEST_STATUS_CREATE, REQUEST_STATUS_INPROGRESS, REQUEST_STATUS_LOADING } from '../actions/types';

const INITIAL_STATE = {
    status: 'loading',
};

const requestStatus = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case REQUEST_STATUS_CREATE:
            return { ...state, status: 'create' };
        case REQUEST_STATUS_INPROGRESS:
            return { ...state, status: 'in-progress' };
        case REQUEST_STATUS_LOADING:
            return { ...state, status: 'loading' };
        default:
            return state;
    }
};

export default requestStatus;