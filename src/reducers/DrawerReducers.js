import {
  GET_CATEGORIES_REQUEST,
  GET_CATEGORIES_SUCCESS,
  GET_CATEGORIES_FAILURE,
  GET_REACH_IN_TIME_REQUEST,
  GET_REACH_IN_TIME_SUCCESS,
  GET_REACH_IN_TIME_FAILURE,
  GET_OFFER_TYPES_REQUEST,
  GET_OFFER_TYPES_SUCCESS,
  GET_OFFER_TYPES_FAILURE,
  UPDATE_SHOW_CATEGORY
} from '../constants';

const INITIAL_STATE = {
  categories: [],
  showCategory: [],
  reachInTime: [],
  categoriesLoading: false,
  reachInTimeLoading: false,
  offerTypes: [],
  offerTypesLoading: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_CATEGORIES_REQUEST:
      return {
        ...state,
        categoriesLoading: true
      };
    case GET_CATEGORIES_SUCCESS: {
      const categories = action.categories;
      return {
        ...state,
        categoriesLoading: false,
        categories: [...categories],
        showCategory: [...categories]
      };
    }
    case GET_CATEGORIES_FAILURE:
      return {
        ...state,
        categoriesLoading: true
      };
    case GET_REACH_IN_TIME_REQUEST:
      return {
        ...state,
        reachInTimeLoading: true
      };
    case GET_REACH_IN_TIME_SUCCESS: {
      const reachInTime = action.reachInTime;
      return {
        ...state,
        reachInTimeLoading: false,
        reachInTime: [...reachInTime]
      };
    }
    case GET_REACH_IN_TIME_FAILURE:
      return {
        ...state,
        reachInTimeLoading: true
      };
    case UPDATE_SHOW_CATEGORY:
      return {
        ...state,
        showCategory: action.category
      };
    case GET_OFFER_TYPES_REQUEST:
      return {
        ...state,
        offerTypesLoading: true
      };
    case GET_OFFER_TYPES_SUCCESS: {
      const { offerTypes } = action;
      return {
        ...state,
        offerTypes,
        offerTypesLoading: false
      }; }
    case GET_OFFER_TYPES_FAILURE:
    return {
      ...state,
      offerTypesLoading: false
    };
    default:
      return state;
  }
};
