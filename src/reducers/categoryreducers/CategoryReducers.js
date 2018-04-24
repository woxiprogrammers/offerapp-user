import {
  SET_CATEGORY,
  UPDATE_SORT_BY,
  UPDATE_FILTER,
  UPDATE_DISTANCE,
  UPDATE_OFFER_TYPES,
  GET_OFFER_TYPES_REQUEST,
  GET_OFFER_TYPES_SUCCESS,
  GET_OFFER_TYPES_FAILURE,
} from '../../constants';

const INITIAL_STATE = {
  categorySelected: '',
  sortSelected: 'nearestFirst',
  distance: 1,
  typeSelected: 'all',
  offerTypes: [],
  offerTypesLoading: false,
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
    case UPDATE_OFFER_TYPES: {
      console.log('Updating type :');
      console.log(action.typeSelected);
      return {
        ...state,
        typeSelected: action.typeSelected
      }; }
    case UPDATE_DISTANCE:
      return {
        ...state,
        distance: action.distance
      };
    case UPDATE_FILTER: {
      return {
        ...state,
        distance: action.distance,
        typeSelected: action.typeSelected
      };
    }
    case GET_OFFER_TYPES_REQUEST:
      return {
        ...state,
        offerTypesLoading: true
      };
    case GET_OFFER_TYPES_SUCCESS: {
      return {
        ...state,
        offerTypes: action.offerTypes,
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
