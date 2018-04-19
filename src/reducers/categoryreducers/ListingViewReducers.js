import {
  GET_LISTING_VIEW_CATEGORY_REQUEST,
  GET_LISTING_VIEW_CATEGORY_SUCCESS,
  GET_LISTING_VIEW_CATEGORY_FAILURE,
  LISTING_VIEW_CATEGORY_RESET,
} from '../../constants';

const INITIAL_STATE = {
  pagination: { page: 1, listingViewCategoryOffersLoading: false },
  listingViewCategoryOffers: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LISTING_VIEW_CATEGORY_RESET: {
      console.log('Clearing list');
      return {
        ...state,
        listingViewCategoryOffers: [],
        pagination: {
          ...state.pagination,
          listingViewCategoryOffersLoading: true
        }
      };
    }
    case GET_LISTING_VIEW_CATEGORY_REQUEST:
      return {
        ...state,
        pagination: {
          ...state.pagination,
          listingViewCategoryOffersLoading: true
        }
      };
    case GET_LISTING_VIEW_CATEGORY_SUCCESS: {
      const { listingViewCategoryOffers = [] } = action;
      return {
        ...state,
        listingViewCategoryOffers: [
          ...state.listingViewCategoryOffers,
          ...listingViewCategoryOffers
        ],
        pagination: {
          ...action.pagination,
          listingViewCategoryOffersLoading: false
        }
      }; }
    case GET_LISTING_VIEW_CATEGORY_FAILURE:
      return {
        ...state,
        pagination: {
          ...state.pagination,
          listingViewCategoryOffersLoading: false
        }
    };
    default:
      return state;
  }
};
