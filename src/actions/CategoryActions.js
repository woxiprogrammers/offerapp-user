import axios from 'axios';

import {
  SET_CATEGORY,
  LISTING_VIEW_CATEGORY_RESET,
  GET_LISTING_VIEW_CATEGORY_REQUEST,
  GET_LISTING_VIEW_CATEGORY_SUCCESS,
  GET_LISTING_VIEW_CATEGORY_FAILURE,
} from '../constants';

export const setCategory = (categorySelected) => {
  return {
    type: SET_CATEGORY,
    categorySelected
  };
};
export const getListViewCategory = (
  token,
  categorySelected,
  sortSelected,
  distance,
  typeSelected,
  coords,
  page
  ) => {
  return (dispatch) => {
    if (page === 1) {
      dispatch({
        type: LISTING_VIEW_CATEGORY_RESET
      });
    }
    dispatch(getListViewCategoryRequest(page));
    // const path = '';
    axios({
      url: 'http://www.mocky.io/v2/5abffe7d2c00004d00c3ced1',
      // url: `${URL}/${path}/?token=${token}&page=${page}`,
      method: 'post',
      data: {
        categorySelected
      }
    }).then((response) => {
      const status = response.status;
      if (status === 200) {
        dispatch(getListViewCategorySuccess(response.data));
      }
    }).catch((error) => {
        dispatch(getListViewCategoryFailure(error));
    });
  };
};
export const getListViewCategorySuccess = (response) => {
  const { records, pagination } = response;
  return {
    type: GET_LISTING_VIEW_CATEGORY_SUCCESS,
    listingViewCategoryOffers: records,
    pagination
  };
};

export const getListViewCategoryRequest = (page) => {
  return {
    type: GET_LISTING_VIEW_CATEGORY_REQUEST,
    page
  };
};

export const getListViewCategoryFailure = (error) => {
  return {
    type: GET_LISTING_VIEW_CATEGORY_FAILURE,
    error
  };
};
