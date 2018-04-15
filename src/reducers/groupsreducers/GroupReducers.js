import { ListView } from 'react-native';
import {
  GET_GROUP_OFFERS_REQUEST,
  GET_GROUP_OFFERS_SUCCESS,
  GET_GROUP_OFFERS_FAILURE,
  LEAVE_GROUP_REQUEST,
  LEAVE_GROUP_SUCCESS,
  LEAVE_GROUP_FAILURE
} from '../../constants';

const INITIAL_STATE = {
  pagination: { groupOffersLoading: false },
  groupOffers: [],
  ds: new ListView.DataSource({
    rowHasChanged: (r1, r2) => { return r1 !== r2; } }),
  leaveGroupLoading: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_GROUP_OFFERS_REQUEST:
      return {
        ...state,
        pagination: {
          ...state.pagination,
          groupOffersLoading: true
        }
      };
    case GET_GROUP_OFFERS_SUCCESS: {
      const { groupOffers = [] } = action;
      return {
        ...state,
        groupOffers: [...state.groupOffers, ...groupOffers],
        pagination: {
          ...action.pagination,
          groupOffersLoading: false
        }
      }; }
    case GET_GROUP_OFFERS_FAILURE:
      return {
        ...state,
        pagination: {
          ...state.pagination,
          groupOffersLoading: false
        }
    };
    case LEAVE_GROUP_REQUEST:
      return {
        ...state,
        leaveGroupLoading: true,
      };
    case LEAVE_GROUP_SUCCESS: {
      return {
        ...state,
        leaveGroupLoading: false
      }; }
    case LEAVE_GROUP_FAILURE:
      return {
        ...state,
        leaveGroupLoading: false
    };
    default:
      return state;
  }
};
