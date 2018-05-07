import axios from 'axios';
import { Actions } from 'react-native-router-flux';

import {
  GET_GROUP_LIST_REQUEST,
  GET_GROUP_LIST_SUCCESS,
  GET_GROUP_LIST_FAILURE,
  GET_GROUP_OFFERS_REQUEST,
  GET_GROUP_OFFERS_SUCCESS,
  GET_GROUP_OFFERS_FAILURE,
  LEAVE_GROUP_REQUEST,
  LEAVE_GROUP_SUCCESS,
  LEAVE_GROUP_FAILURE,
  GROUP_OFFERS_RESET,
  URL
} from '../constants';

export const getGroupList = (token) => {
  return (dispatch) => {
    dispatch(getGroupListRequest());
    const path = 'customer/group/list';
    axios({
      // url: 'http://www.mocky.io/v2/5adc0ef13100005500233bff',
      url: `${URL}/${path}/?token=${token}`,
      method: 'get'
    }).then((response) => {
      const status = response.status;
      if (status === 200) {
        dispatch(getGroupListSuccess(response.data.data));
      }
    }).catch((error) => {
        dispatch(getGroupListFailure(error));
    });
  };
};
export const getGroupListSuccess = (response) => {
  const { records } = response;
  return {
    type: GET_GROUP_LIST_SUCCESS,
    groupList: records,
  };
};

export const getGroupListRequest = () => {
  return {
    type: GET_GROUP_LIST_REQUEST,
  };
};

export const getGroupListFailure = (error) => {
  return {
    type: GET_GROUP_LIST_FAILURE,
    error
  };
};

export const getGroupOffers = ({ token, page, groupId }) => {
  return (dispatch) => {
    if (page === 1) {
      dispatch({
        type: GROUP_OFFERS_RESET
      });
    }
    dispatch(getGroupOffersRequest(page));
    const path = 'customer/group/offers';
    axios({
      // url: 'http://www.mocky.io/v2/5adc135c3100005d00233c00',
      url: `${URL}/${path}/?token=${token}&page=${page}`,
      method: 'post',
      data: {
        groupId
      }
    }).then((response) => {
      const status = response.status;
      if (status === 200) {
        dispatch(getGroupOffersSuccess(response.data.data));
      }
    }).catch((error) => {
        dispatch(getGroupOffersFailure(error));
    });
  };
};
export const getGroupOffersSuccess = (response) => {
  const { records, pagination } = response;
  return {
    type: GET_GROUP_OFFERS_SUCCESS,
    groupOffers: records,
    pagination
  };
};

export const getGroupOffersRequest = (page) => {
  return {
    type: GET_GROUP_OFFERS_REQUEST,
    page
  };
};

export const getGroupOffersFailure = (error) => {
  return {
    type: GET_GROUP_OFFERS_FAILURE,
    error
  };
};

export const leaveGroup = ({ token, groupId }) => {
  return (dispatch) => {
    dispatch(leaveGroupRequest());
    const path = 'customer/group/remove';
    axios({
      url: `${URL}/${path}/?token=${token}`,
      // url: 'http://www.mocky.io/v2/5ab9f7a33500005b0073a306',
      method: 'post',
      data: {
        groupId
      }
    }).then((response) => {
      const status = response.status;
      if (status === 200) {
        dispatch(leaveGroupSuccess());
        Actions.groupListingScreen();
      }
    }).catch((error) => {
        dispatch(leaveGroupFailure(error));
    });
  };
};

export const leaveGroupSuccess = () => {
  return {
    type: LEAVE_GROUP_SUCCESS,
  };
};

export const leaveGroupRequest = () => {
  return {
    type: LEAVE_GROUP_REQUEST,
  };
};

export const leaveGroupFailure = (error) => {
  return {
    type: LEAVE_GROUP_FAILURE,
    error
  };
};
