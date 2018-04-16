import {
  GET_OFFER_DETAILS_REQUEST,
  GET_OFFER_DETAILS_SUCCESS,
  GET_OFFER_DETAILS_FAILURE,
  GET_OFFER_SWIPER_REQUEST,
  GET_OFFER_SWIPER_SUCCESS,
  GET_OFFER_SWIPER_FAILURE,
  ADD_TO_WISHLIST_REQUEST,
  ADD_TO_WISHLIST_SUCCESS,
  ADD_TO_WISHLIST_FAILURE,
  ADD_TO_INTERESTED_REQUEST,
  ADD_TO_INTERESTED_SUCCESS,
  ADD_TO_INTERESTED_FAILURE,
} from '../constants';

const INITIAL_STATE = {
  imageList: [],
  loadQueue: [],
  offerSwiperLoading: false,
  offerLoading: false,
  addToWishListLoading: false,
  addToInterestedLoading: false,
  offerLatitude: 0,
  offerLongitude: 0
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_OFFER_DETAILS_REQUEST:
      return {
        ...state,
        offerLoading: true
      };
    case GET_OFFER_DETAILS_SUCCESS: {
      return {
        ...state,
        offerLoading: false,
        ...action.offer
      };
    }
    case GET_OFFER_DETAILS_FAILURE:
      return {
        ...state,
        offerLoading: false
    };
    case GET_OFFER_SWIPER_REQUEST:
      return {
        ...state,
        offerSwiperLoading: true
      };
    case GET_OFFER_SWIPER_SUCCESS: {
      const imageList = action.imageList;
      const loadQueue = action.loadQueue;
      return {
        ...state,
        offerSwiperLoading: false,
        imageList: [...imageList],
        loadQueue: [...loadQueue],
      }; }
    case GET_OFFER_SWIPER_FAILURE:
      return {
        ...state,
        offerSwiperLoading: true
      };
      case ADD_TO_WISHLIST_REQUEST:
        return {
          ...state,
          addToWishListLoading: true
        };
      case ADD_TO_WISHLIST_SUCCESS: {
        return {
          ...state,
          addToWishListLoading: false,
        };
      }
      case ADD_TO_WISHLIST_FAILURE:
        return {
          ...state,
          addToWishListLoading: false
      };
      case ADD_TO_INTERESTED_REQUEST:
        return {
          ...state,
          addToInterestedLoading: true
        };
      case ADD_TO_INTERESTED_SUCCESS: {
        return {
          ...state,
          addToInterestedLoading: false,
        };
      }
      case ADD_TO_INTERESTED_FAILURE:
        return {
          ...state,
          addToInterestedLoading: false
      };
    default:
      return state;
  }
};
