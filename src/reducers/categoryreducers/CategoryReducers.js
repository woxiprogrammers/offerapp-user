import {
  SET_CATEGORY
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
    default:
      return state;
  }
};
