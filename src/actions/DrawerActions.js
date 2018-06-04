import axios from 'axios';

import {
  UPDATE_SHOW_CATEGORY,
  USER_DATA_FETCH_SUCCESS,
  GET_CATEGORIES_REQUEST,
  GET_CATEGORIES_SUCCESS,
  GET_CATEGORIES_FAILURE,
  GET_REACH_IN_TIME_REQUEST,
  GET_REACH_IN_TIME_SUCCESS,
  GET_REACH_IN_TIME_FAILURE,
  GET_OFFER_TYPES_REQUEST,
  GET_OFFER_TYPES_SUCCESS,
  GET_OFFER_TYPES_FAILURE,
  URL
} from '../constants';

export const getCategories = ({ token }) => {
  return (dispatch) => {
    dispatch(getCategoriesRequest());
    const path = 'customer/offer/category/listing';
    axios({
      url: `${URL}/${path}/?token=${token}`,
      // url: 'http://www.mocky.io/v2/5adb7a2c29000050003e3e04',
      method: 'get'
    }).then((response) => {
      const status = response.status;
      if (status === 200) {
        dispatch(getCategoriesSuccess(response.data.data));
      }
    }).catch((error) => {
        dispatch(getCategoriesFailure(error));
    });
  };
};
export const getCategoriesSuccess = (response) => {
  const categories = response.categories;
  return {
    type: GET_CATEGORIES_SUCCESS,
    categories
  };
};

export const getCategoriesRequest = () => {
  return {
    type: GET_CATEGORIES_REQUEST,
  };
};

export const getCategoriesFailure = (error) => {
  return {
    type: GET_CATEGORIES_FAILURE,
    error
  };
};
export const userDataFetch = ({ token }) => {
  const path = 'customer/data';
  return (dispatch) => {
    axios({
      url: `${URL}/${path}/?token=${token}`,
      // url: `http://www.mocky.io/v2/5ae189c12d000028009d7ca2?token=${token}`,
      method: 'post'
    })
      .then((response) => {
        const status = response.status;
        if (status === 200) {
          const { userData } = response.data.data;
          dispatch({ type: USER_DATA_FETCH_SUCCESS, userData });
        }
      }).catch(() => {
      });
  };
};

export const getReachInTime = ({ token }) => {
  return (dispatch) => {
    dispatch(getReachInTimeRequest());
    const path = 'customer/offer/reach-in-time/listing';
    axios({
      url: `${URL}/${path}/?token=${token}`,
      // url: 'http://www.mocky.io/v2/5adb7a2c29000050003e3e04',
      method: 'get'
    }).then((response) => {
      const status = response.status;
      if (status === 200) {
        dispatch(getReachInTimeSuccess(response.data.data));
      }
    }).catch((error) => {
        dispatch(getReachInTimeFailure(error));
    });
  };
};

export const getReachInTimeSuccess = (response) => {
  const reachInTime = response.reachInTime;
  return {
    type: GET_REACH_IN_TIME_SUCCESS,
    reachInTime
  };
};

export const getReachInTimeRequest = () => {
  return {
    type: GET_REACH_IN_TIME_REQUEST,
  };
};

export const getReachInTimeFailure = (error) => {
  return {
    type: GET_REACH_IN_TIME_FAILURE,
    error
  };
};

export const updateShowCategory = (category) => {
  return {
    type: UPDATE_SHOW_CATEGORY,
    category
  };
};


export const getOfferTypes = ({ token }) => {
  return (dispatch) => {
    dispatch(getOfferTypesRequest());
    const path = 'customer/offer/types/listing';
    axios({
      url: `${URL}/${path}/?token=${token}`,
      // url: 'http://www.mocky.io/v2/5adb7a2c29000050003e3e04',
      method: 'get'
    }).then((response) => {
      const status = response.status;
      if (status === 200) {
        dispatch(getOfferTypesSuccess(response.data.data));
      }
    }).catch((error) => {
        dispatch(getOfferTypesFailure(error));
    });
  };
};
export const getOfferTypesSuccess = (response) => {
  const offerTypes = response.offerTypes;
  return {
    type: GET_OFFER_TYPES_SUCCESS,
    offerTypes
  };
};

export const getOfferTypesRequest = () => {
  return {
    type: GET_OFFER_TYPES_REQUEST,
  };
};

export const getOfferTypesFailure = (error) => {
  return {
    type: GET_OFFER_TYPES_FAILURE,
    error
  };
};
