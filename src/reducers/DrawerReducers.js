import {
  GET_CATEGORIES_REQUEST,
  GET_CATEGORIES_SUCCESS,
  GET_CATEGORIES_FAILURE,
  UPDATE_SHOW_CATEGORY
} from '../constants';

const INITIAL_STATE = {
  categories: [],
  showCategory: [],
  categoriesLoading: true,
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
    case UPDATE_SHOW_CATEGORY:
      return {
        ...state,
        showCategory: action.category
      };
    default:
      return state;
  }
};
