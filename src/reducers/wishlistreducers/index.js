import {
  GET_WISHLIST_OFFERS_REQUEST,
  GET_WISHLIST_OFFERS_SUCCESS,
  GET_WISHLIST_OFFERS_FAILURE,
  WISHLIST_OFFERS_RESET,
  REMOVE_WISHLIST_OFFER
} from '../../constants';

const INITIAL_STATE = {
  pagination: { wishListOffersLoading: false },
  wishListOffers: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case WISHLIST_OFFERS_RESET:
      return {
        ...state,
        wishListOffers: [],
        pagination: {
          ...state.pagination,
          wishListOffersLoading: true
        }
      };
    case GET_WISHLIST_OFFERS_REQUEST:
      return {
        ...state,
        pagination: {
          ...state.pagination,
          wishListOffersLoading: true
        }
      };
    case GET_WISHLIST_OFFERS_SUCCESS: {
      const { wishListOffers = [] } = action;
      return {
        ...state,
        wishListOffers: [...state.wishListOffers, ...wishListOffers],
        pagination: {
          ...action.pagination,
          wishListOffersLoading: false
        }
      }; }
    case REMOVE_WISHLIST_OFFER: {
      return {
        ...state,
        wishListOffers: [
            ...state.wishListOffers.slice(0, action.index),
            ...state.wishListOffers.slice(action.index + 1)
        ]
      };
    }
    case GET_WISHLIST_OFFERS_FAILURE:
      return {
        ...state,
        pagination: {
          ...state.pagination,
          wishListOffersLoading: false
        }
    };
    default:
      return state;
  }
};
