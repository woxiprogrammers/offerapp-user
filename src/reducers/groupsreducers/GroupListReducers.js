import {
  GET_GROUP_LIST_REQUEST,
  GET_GROUP_LIST_SUCCESS,
  GET_GROUP_LIST_FAILURE
} from '../../constants';

const INITIAL_STATE = {
  groupListLoading: false,
  groupList: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_GROUP_LIST_REQUEST:
      return {
        ...state,
        groupListLoading: true
      };
    case GET_GROUP_LIST_SUCCESS: {
      const { groupList = [] } = action;
      return {
        ...state,
        groupList: [...groupList],
        groupListLoading: false
      }; }
    case GET_GROUP_LIST_FAILURE:
      return {
        ...state,
        groupListLoading: false
    };
    default:
      return state;
  }
};
