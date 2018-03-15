import { FETCH_MESSAGES, SEND_MESSAGES } from '../actions/types';

const INITIAL_STATE = {
    messages: null,
};

const chat= (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_MESSAGES:
            return { ...state, messages: action.payload };
        case SEND_MESSAGES:
            return state;
        default:
            return state;
    }
};

export default chat;