import { HERO_STATUS_FINDING, HERO_STATUS_ACCEPTED, HERO_STATUS_LOADING } from '../actions/types';

const INITIAL_STATE = {
    status: 'loading',
};

const heroStatus = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case HERO_STATUS_LOADING:
            return { ...state, status: 'loading' };
        case HERO_STATUS_FINDING:
            return { ...state, status: 'finding' };
        case HERO_STATUS_ACCEPTED:
            return { ...state, status: 'accepted' };
        default:
            return state;
    }
};

export default heroStatus;