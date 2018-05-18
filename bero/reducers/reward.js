import { FETCH_REWARDS } from '../actions/types';

const INITIAL_STATE = {
    rewards: null
};

const reward= (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_REWARDS:
            return { ...state, rewards: action.payload };
        default:
            return state;
    }
};

export default reward;