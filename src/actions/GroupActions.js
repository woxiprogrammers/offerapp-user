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
  // URL
} from '../constants';

export const getGroupList = (token, userId) => {
  return (dispatch) => {
    dispatch(getGroupListRequest());
    // const path = '';
    console.log('Getting Group List');
    axios({
      url: 'http://www.mocky.io/v2/5abfeaeb2c00004f00c3ceba',
      // url: `${URL}/${path}/?token=${token}&page=${page}`,
      method: 'post',
      data: {
        userId
      }
    }).then((response) => {
      const status = response.status;
      if (status === 200) {
        dispatch(getGroupListSuccess(response.data));
      }
    }).catch((error) => {
        dispatch(getGroupListFailure(error));
    });
  };
};
export const getGroupListSuccess = (response) => {
  const { records } = response;
  // console.log('Records are :');
  // console.log(records);
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

export const getGroupOffers = (token, page, userId, groupId) => {
  return (dispatch) => {
    dispatch(getGroupOffersRequest(page));
    // const path = '';
    axios({
      url: 'http://www.mocky.io/v2/5abffe7d2c00004d00c3ced1',
      // url: `${URL}/${path}/?token=${token}&page=${page}`,
      method: 'post',
      data: {
        userId,
        groupId
      }
    }).then((response) => {
      const status = response.status;
      if (status === 200) {
        dispatch(getGroupOffersSuccess(response.data));
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

export const leaveGroup = (token, userId, groupId) => {
  console.log('Leaving Group!');
  return (dispatch) => {
    dispatch(leaveGroupRequest());
    // const path = '';
    axios({
      // url: `${URL}/${path}/?token=${token}`,
      url: 'http://www.mocky.io/v2/5ab9f7a33500005b0073a306',
      method: 'post',
      data: {
        userId,
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
