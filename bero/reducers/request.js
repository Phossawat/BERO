import { REQUEST_UPDATE, REQUEST_FETCH_SUCCESS, REQUEST_FETCH_SINGLE_SUCCESS, REQUEST_FETCH_ACCEPTED_SUCCESS, FETCH_SAVED, FETCH_EVENT, FETCH_KEY_NEAR, SEARCH_REQUEST, REQUEST_FETCH_EVENT_SUCCESS } from '../actions/types';

const INITIAL_STATE = {
  topic: '',
  hero: '1',
  type: 'Any',
  view: 'Public',
  must_be: 'all',
  distance: "1",
  detail: '',
  photo: null,
  mark_position: {
    latitude: 13.731014,
    longitude: 100.781193,
  },
  requestObject: null,
  requestSingle: null,
  requestAccepted: { "detail": "",
  "facebookUid": "1449629778454500",
  "hero": "1",
  "heroAccepted": 0,
  "imageUrl": "https://firebasestorage.googleapis.com/v0/b/bero-be-a-hero.appspot.com/o/images%2Fdefault.png?alt=media&token=736b210d-1e8d-4915-855e-525d98cb1898",
  "mark_position": {
    "latitude": 13.732772,
    "longitude": 100.781193,
  },
  "must_be": "all",
  "ownerName": "Photsawat Pruekphanasant",
  "ownerprofilePicture": "http://graph.facebook.com/1449629778454500/picture?type=square",
  "owneruid": "4laIpaHEU7YgYnt42Awaug3jaVy2",
  "requestType": "Request",
  "status": "in-progress",
  "topic": "Test",
  "type": "Any",
  "view": "Public",
  "when": 1522595134448 },
  requestSaved: null,
  requestEvent: null,
  keyNear: null,
  searchRequest: null,
  requestAccepted2: null,
};

const request = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case REQUEST_UPDATE:
      return { ...state, [action.payload.prop]: action.payload.value };
    case REQUEST_FETCH_SUCCESS:
      return { ...state, requestObject: action.payload };
    case REQUEST_FETCH_SINGLE_SUCCESS:
      return { ...state, requestSingle: action.payload };
    case REQUEST_FETCH_ACCEPTED_SUCCESS:
      return { ...state, requestAccepted: action.payload };
    case REQUEST_FETCH_EVENT_SUCCESS:
      return { ...state, requestAccepted2: action.payload };
    case FETCH_SAVED:
      return { ...state, requestSaved: action.payload };
    case FETCH_EVENT:
      return { ...state, requestEvent: action.payload };
    case FETCH_KEY_NEAR:
      return { ...state, keyNear: action.payload };
    case SEARCH_REQUEST:
      return { ...state, searchRequest: action.payload };
    default:
      return state;
  }
};



export default request;