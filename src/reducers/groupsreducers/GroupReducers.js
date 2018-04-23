import {
  GET_GROUP_OFFERS_REQUEST,
  GET_GROUP_OFFERS_SUCCESS,
  GET_GROUP_OFFERS_FAILURE,
  LEAVE_GROUP_REQUEST,
  LEAVE_GROUP_SUCCESS,
  LEAVE_GROUP_FAILURE,
  GROUP_OFFERS_RESET
} from '../../constants';

const INITIAL_STATE = {
  pagination: { groupOffersLoading: false },
  groupOffers: [],
  leaveGroupLoading: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GROUP_OFFERS_RESET:
      return {
        ...state,
        groupOffers: [],
        pagination: {
          ...state.pagination,
          groupOffersLoading: true
        }
      };
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
