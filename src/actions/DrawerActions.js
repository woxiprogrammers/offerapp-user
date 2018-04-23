import axios from 'axios';

import {
  UPDATE_SHOW_CATEGORY,
  GET_CATEGORIES_REQUEST,
  GET_CATEGORIES_SUCCESS,
  GET_CATEGORIES_FAILURE,
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


export const updateShowCategory = (category) => {
  return {
    type: UPDATE_SHOW_CATEGORY,
    category
  };
};
