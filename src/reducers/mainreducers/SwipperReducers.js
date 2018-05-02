import {
  GET_SWIPER_REQUEST,
  GET_SWIPER_SUCCESS,
  GET_SWIPER_FAILURE
} from '../../constants';

const INITIAL_STATE = {
  offerId: [],
  imageList: [],
  loadQueue: [],
  swiperLoading: true,
  swiperError: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_SWIPER_REQUEST:
      return {
        ...state,
        swiperLoading: true,
        swiperError: false,
      };
    case GET_SWIPER_SUCCESS: {
      const offerId = action.offerId;
      const imageList = action.imageList;
      const loadQueue = action.loadQueue;
      return {
        ...state,
        swiperLoading: false,
        swiperError: false,
        offerId: [...offerId],
        imageList: [...imageList],
        loadQueue: [...loadQueue],
      }; }
    case GET_SWIPER_FAILURE:
      return {
        ...state,
        swiperLoading: false,
        swiperError: true,
      };
    default:
      return state;
  }
};
