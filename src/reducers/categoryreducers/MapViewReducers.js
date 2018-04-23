import {
  GET_MAP_VIEW_CATEGORY_REQUEST,
  GET_MAP_VIEW_CATEGORY_SUCCESS,
  GET_MAP_VIEW_CATEGORY_FAILURE,
  MAP_VIEW_CATEGORY_RESET,
} from '../../constants';

const INITIAL_STATE = {
  pagination: { page: 1, mapViewCategoryOffersLoading: false },
  mapViewCategoryOffers: [],
  markers: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case MAP_VIEW_CATEGORY_RESET: {
      console.log('Clearing list');
      return {
        ...INITIAL_STATE
      };
    }
    case GET_MAP_VIEW_CATEGORY_REQUEST:
      return {
        ...state,
        pagination: {
          ...state.pagination,
          mapViewCategoryOffersLoading: true
        }
      };
    case GET_MAP_VIEW_CATEGORY_SUCCESS: {
      const { mapViewCategoryOffers = [], markers = [] } = action;
      return {
        ...state,
        mapViewCategoryOffers: [
          ...state.mapViewCategoryOffers,
          ...mapViewCategoryOffers
        ],
        markers: [
          ...state.markers,
          ...markers
        ],
        pagination: {
          ...action.pagination,
          mapViewCategoryOffersLoading: false
        }
      }; }
    case GET_MAP_VIEW_CATEGORY_FAILURE:
      return {
        ...state,
        pagination: {
          ...state.pagination,
          mapViewCategoryOffersLoading: false
        }
    };
    default:
      return state;
  }
};
