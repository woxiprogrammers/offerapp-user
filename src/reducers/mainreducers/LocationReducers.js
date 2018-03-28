import {
  GET_LOCATION_REQUEST,
  GET_LOCATION_SUCCESS,
  GET_LOCATION_FAILURE,
  SET_LOCATION_REQUEST,
  SET_LOCATION_SUCCESS,
  SET_LOCATION_FAILURE,
  SEARCH_LOCATION_REQUEST,
  SEARCH_LOCATION_SUCCESS,
  SEARCH_LOCATION_FAILURE
} from '../../constants';

const INITIAL_STATE = {
  locationName: '',
  latitude: 0.0,
  longitude: 0.0,
  locationLoading: true,
  setLocationLoading: false,
  searchLocationLoading: false,
  suggestedLocation: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_LOCATION_REQUEST:
      return {
        ...state,
        setLocationLoading: true,
      };
    case SET_LOCATION_SUCCESS: {
      return {
        ...state,
        locationName: action.locationName,
        latitude: action.coords.latitude,
        longitude: action.coords.longitude,
        setLocationLoading: false
      }; }
    case SET_LOCATION_FAILURE:
      return {
        ...state,
        setLocationLoading: false
    };
    case GET_LOCATION_REQUEST:
      return {
        ...state,
        locationLoading: true,
        latitude: action.coords.latitude,
        longitude: action.coords.longitude
      };
    case GET_LOCATION_SUCCESS: {
      return {
        ...state,
        locationName: action.locationName,
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
