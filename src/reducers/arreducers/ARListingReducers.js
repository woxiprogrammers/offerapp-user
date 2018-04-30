import {
  GET_AR_LISTING_OFFERS_REQUEST,
  GET_AR_LISTING_OFFERS_SUCCESS,
  GET_AR_LISTING_OFFERS_FAILURE,
  AR_LISTING_OFFERS_RESET,
} from '../../constants';

const INITIAL_STATE = {
  pagination: { arListingOffersLoading: false },
  arListingOffers: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AR_LISTING_OFFERS_RESET:
      console.log('Clearing list');
      return {
        ...state,
        arListingOffers: [],
        pagination: {
          ...state.pagination,
          arListingOffersLoading: false
        }
      };
    case GET_AR_LISTING_OFFERS_REQUEST:
      return {
        ...state,
        pagination: {
          ...state.pagination,
          arListingOffersLoading: true
        }
      };
    case GET_AR_LISTING_OFFERS_SUCCESS: {
      const { arListingOffers = [] } = action;
      return {
        ...state,
        arListingOffers: [...state.arListingOffers, ...arListingOffers],
        pagination: {
          ...action.pagination,
          arListingOffersLoading: false
        }
      }; }
    case GET_AR_LISTING_OFFERS_FAILURE:
      return {
        ...state,
        pagination: {
          ...state.pagination,
          arListingOffersLoading: false
        }
    };
    default:
      return state;
  }
};
