import {
  GET_INTERESTED_OFFERS_REQUEST,
  GET_INTERESTED_OFFERS_SUCCESS,
  GET_INTERESTED_OFFERS_FAILURE,
  SEND_INTERESTED_OFFER_REQUEST,
  SEND_INTERESTED_OFFER_SUCCESS,
  SEND_INTERESTED_OFFER_FAILURE,
  INTERESTED_OFFERS_RESET,
} from '../../constants';

const INITIAL_STATE = {
  pagination: { interestedOffersLoading: false },
  interestedOffers: [],
  sendInterestedOfferLoading: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case INTERESTED_OFFERS_RESET:
      return {
        ...state,
        interestedOffers: [],
        pagination: {
          ...state.pagination,
          interestedOffersLoading: true
        }
      };
    case GET_INTERESTED_OFFERS_REQUEST:
      return {
        ...state,
        pagination: {
          ...state.pagination,
          interestedOffersLoading: true
        }
      };
    case GET_INTERESTED_OFFERS_SUCCESS: {
      const { interestedOffers = [] } = action;
      return {
        ...state,
        interestedOffers: [...state.interestedOffers, ...interestedOffers],
        pagination: {
          ...action.pagination,
          interestedOffersLoading: false
        }
      }; }
    case GET_INTERESTED_OFFERS_FAILURE:
      return {
        ...state,
        pagination: {
          ...state.pagination,
          interestedOffersLoading: false
        }
    };
    case SEND_INTERESTED_OFFER_REQUEST:
      return {
        ...state,
        sendInterestedOfferLoading: true
      };
    case SEND_INTERESTED_OFFER_SUCCESS:
      return {
        ...state,
        sendInterestedOfferLoading: false
      };
    case SEND_INTERESTED_OFFER_FAILURE:
    return {
      ...state,
      sendInterestedOfferLoading: false
    };
    default:
      return state;
  }
};
