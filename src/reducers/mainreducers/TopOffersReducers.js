import { ListView } from 'react-native';
import {
  GET_TOP_OFFERS_REQUEST,
  GET_TOP_OFFERS_SUCCESS,
  GET_TOP_OFFERS_FAILURE
} from '../../constants';

const INITIAL_STATE = {
  pagination: { paginationLoading: false },
  posts: [],
  ds: new ListView.DataSource({
    rowHasChanged: (r1, r2) => { return r1 !== r2; } })
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_TOP_OFFERS_REQUEST:
      return {
        ...state,
        pagination: {
          ...state.pagination,
          paginationLoading: true
        }
      };
    case GET_TOP_OFFERS_SUCCESS: {
      const { posts = [] } = action;
      return {
        ...state,
        posts: [...state.posts, ...posts],
        pagination: {
          ...action.pagination,
          paginationLoading: false
        }
      }; }
    case GET_TOP_OFFERS_FAILURE:
      return {
        ...state,
        pagination: {
          ...state.pagination,
          paginationLoading: false
        }
    };
    default:
      return state;
  }
};
