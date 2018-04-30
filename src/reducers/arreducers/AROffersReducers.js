import {
  GET_AR_OFFERS_REQUEST,
  GET_AR_OFFERS_SUCCESS,
  GET_AR_OFFERS_FAILURE,
  AR_OFFERS_RESET,
  UPDATE_AR_FILTER
} from '../../constants';

const INITIAL_STATE = {
  arOffersLoading: false,
  arOffers: [],
  distance: 1,
  typeSelected: 'all',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AR_OFFERS_RESET: {
      console.log('Clearing list');
      return {
        ...INITIAL_STATE
      };
    }
    case GET_AR_OFFERS_REQUEST:
      return {
        ...state,
        arOffersLoading: true
      };
    case GET_AR_OFFERS_SUCCESS: {
      const { arOffers } = action;
      return {
        ...state,
        arOffers: [
          ...arOffers
        ],
        arOffersLoading: false
      }; }
    case GET_AR_OFFERS_FAILURE:
      return {
        ...state,
        arOffersLoading: false
    };
    case UPDATE_AR_FILTER:
    return {
      ...state,
      distance: action.distance,
      typeSelected: action.typeSelected
    };
    default:
      return state;
  }
};
