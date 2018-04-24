import {
  GET_CATEGORIES_REQUEST,
  GET_CATEGORIES_SUCCESS,
  GET_CATEGORIES_FAILURE,
  GET_REACH_IN_TIME_REQUEST,
  GET_REACH_IN_TIME_SUCCESS,
  GET_REACH_IN_TIME_FAILURE,
  UPDATE_SHOW_CATEGORY
} from '../constants';

const INITIAL_STATE = {
  categories: [],
  showCategory: [],
  reachInTime: [],
  categoriesLoading: false,
  reachInTimeLoading: false,
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
        showCategory: [...categories],
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
    default:
      return state;
  }
};
