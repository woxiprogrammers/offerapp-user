import {
  NEARBY_OFFERS_RESET,
  GET_NEARBY_OFFERS_REQUEST,
  GET_NEARBY_OFFERS_SUCCESS,
  GET_NEARBY_OFFERS_FAILURE
} from '../../constants';

const INITIAL_STATE = {
  pagination: { nearByOffersLoading: false },
  nearByOffers: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case NEARBY_OFFERS_RESET:
      return {
        ...state,
        nearByOffers: [],
        pagination: {
          ...state.pagination,
          nearByOffersLoading: true
        }
      };
    case GET_NEARBY_OFFERS_REQUEST:
      return {
        ...state,
        pagination: {
          ...state.pagination,
          nearByOffersLoading: true
        }
      };
    case GET_NEARBY_OFFERS_SUCCESS: {
      console.log('Success Nearby Offers!!');
      const { nearByOffers = [] } = action;
      return {
        ...state,
        nearByOffers: [...state.nearByOffers, ...nearByOffers],
        pagination: {
          ...action.pagination,
          nearByOffersLoading: false
        }
      }; }
    case GET_NEARBY_OFFERS_FAILURE:
      return {
        ...state,
        pagination: {
          ...state.pagination,
          nearByOffersLoading: false
        }
    };
    default:
      return state;
  }
};
