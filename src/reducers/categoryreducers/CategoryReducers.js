import {
  SET_CATEGORY,
  UPDATE_SORT_BY,
  UPDATE_FILTER,
} from '../../constants';

const INITIAL_STATE = {
  categorySelected: '',
  sortSelected: 'nearestFirst',
  distance: 1,
  typeSelected: 'all',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_CATEGORY:
      return {
        ...state,
        categorySelected: action.categorySelected
      };
    case UPDATE_SORT_BY: {
      return {
        ...state,
        sortSelected: action.sortSelected
      };
    }
    case UPDATE_FILTER: {
      return {
        ...state,
        distance: action.distance,
        typeSelected: action.typeSelected
      };
    }
    default:
      return state;
  }
};
