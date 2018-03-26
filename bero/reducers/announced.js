import { ANNOUNCED_UPDATE, ANNOUNCED_CREATE, ANNOUNCED_FETCH } from "../actions/types";

const INITIAL_STATE = {
  topic: '',
  type: 'User',
  detail: '',
  photo: null,
  mark_position: {
    latitude: 13.731014,
    longitude: 100.781193,
  },
  announcedObject: null,
};

const announced = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ANNOUNCED_UPDATE:
      return { ...state, [action.payload.prop]: action.payload.value };
    case ANNOUNCED_CREATE:
      return { ...state,};
    case ANNOUNCED_FETCH:
      return { ...state, announcedObject: action.payload };
    default:
      return state;
  }
};



export default announced;