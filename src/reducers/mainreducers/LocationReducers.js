import {
  GET_LOCATION_REQUEST,
  GET_LOCATION_SUCCESS,
  GET_LOCATION_FAILURE,
  SEARCH_LOCATION_REQUEST,
  SEARCH_LOCATION_SUCCESS,
  SEARCH_LOCATION_FAILURE
} from '../../constants';

const INITIAL_STATE = {
  location: '',
  latitude: 0.0,
  longitude: 0.0,
  locationLoading: false,
  searchLocationLoading: false,
  suggestedLocation: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_LOCATION_REQUEST:
      return {
        ...state,
        locationLoading: true
      };
    case GET_LOCATION_SUCCESS: {
      return {
        ...state,
        location: action.location,
        locationLoading: false
      }; }
    case GET_LOCATION_FAILURE:
      return {
        ...state,
        locationLoading: false
    };
    case SEARCH_LOCATION_REQUEST:
      return {
        ...state,
        searchLocationLoading: true
      };
    case SEARCH_LOCATION_SUCCESS: {
      return {
        ...state,
        suggestedLocation: action.suggestedLocation,
        searchLocationLoading: false
      }; }
    case SEARCH_LOCATION_FAILURE:
      return {
        ...state,
        searchLocationLoading: false
    };
    default:
      return state;
  }
};
