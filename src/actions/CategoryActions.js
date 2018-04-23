import axios from 'axios';

import {
  SET_CATEGORY,
  UPDATE_SORT_BY,
  UPDATE_FILTER,
  LISTING_VIEW_CATEGORY_RESET,
  MAP_VIEW_CATEGORY_RESET,
  AR_VIEW_CATEGORY_RESET,
  GET_LISTING_VIEW_CATEGORY_REQUEST,
  GET_LISTING_VIEW_CATEGORY_SUCCESS,
  GET_LISTING_VIEW_CATEGORY_FAILURE,
  GET_MAP_VIEW_CATEGORY_REQUEST,
  GET_MAP_VIEW_CATEGORY_SUCCESS,
  GET_MAP_VIEW_CATEGORY_FAILURE,
  GET_AR_VIEW_CATEGORY_REQUEST,
  GET_AR_VIEW_CATEGORY_SUCCESS,
  GET_AR_VIEW_CATEGORY_FAILURE,
  URL,
} from '../constants';

export const setCategory = (categorySelected) => {
  return {
    type: SET_CATEGORY,
    categorySelected
  };
};
export const updateSortBy = ({ sortSelected }) => {
  return {
    type: UPDATE_SORT_BY,
    sortSelected
  };
};
export const updateFilter = ({ distance, typeSelected }) => {
  return {
    type: UPDATE_FILTER,
    distance,
    typeSelected
  };
};

export const getListViewCategory = ({
  token,
  categorySelected,
  sortSelected,
  distance,
  typeSelected,
  coords,
  page }) => {
  return (dispatch) => {
    if (page === 1) {
      dispatch({
        type: LISTING_VIEW_CATEGORY_RESET
      });
    }
    dispatch(getListViewCategoryRequest(page));
    const path = 'customer/offer/nearby/listing';
    console.log('Getting List View CategoryScreen');
    axios({
      // url: 'http://www.mocky.io/v2/5abffe7d2c00004d00c3ced1',
      url: `${URL}/${path}/?token=${token}&page=${page}`,
      method: 'post',
      data: {
        categorySelected,
        sortSelected,
        distance,
        offerTypeSlug: typeSelected,
        coords,
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
export const getMapViewCategory = ({
  //token,
  categorySelected,
  distance,
  typeSelected,
  coords,
  page }) => {
  return (dispatch) => {
    if (page === 1) {
      dispatch({
        type: MAP_VIEW_CATEGORY_RESET
      });
    }
    dispatch(getMapViewCategoryRequest(page));
    // const path = '';
    console.log('Getting Map View CategoryScreen');
    axios({
      url: 'http://www.mocky.io/v2/5ad72ad12e00006600c93e01',
      // url: `${URL}/${path}/?token=${token}&page=${page}`,
      method: 'post',
      data: {
        categorySelected,
        distance,
        typeSelected,
        coords,
      }
    }).then((response) => {
      const status = response.status;
      if (status === 200) {
        dispatch(getMapViewCategorySuccess(response.data));
      }
    }).catch((error) => {
        dispatch(getMapViewCategoryFailure(error));
    });
  };
};
export const getMapViewCategorySuccess = (response) => {
  const { records, pagination, markers } = response;
  return {
    type: GET_MAP_VIEW_CATEGORY_SUCCESS,
    mapViewCategoryOffers: records,
    pagination,
    markers
  };
};

export const getMapViewCategoryRequest = (page) => {
  return {
    type: GET_MAP_VIEW_CATEGORY_REQUEST,
    page
  };
};

export const getMapViewCategoryFailure = (error) => {
  return {
    type: GET_MAP_VIEW_CATEGORY_FAILURE,
    error
  };
};
export const getARViewCategory = ({
  //token,
  categorySelected,
  distance,
  typeSelected,
  coords,
  page }) => {
  return (dispatch) => {
    if (page === 1) {
      dispatch({
        type: AR_VIEW_CATEGORY_RESET
      });
    }
    dispatch(getARViewCategoryRequest(page));
    // const path = '';
    console.log('Getting AR View CategoryScreen');
    axios({
      url: 'http://www.mocky.io/v2/5ad84f513000006c00e58702',
      // url: `${URL}/${path}/?token=${token}&page=${page}`,
      method: 'post',
      data: {
        categorySelected,
        distance,
        typeSelected,
        coords
      }
    }).then((response) => {
      const status = response.status;
      if (status === 200) {
        dispatch(getARViewCategorySuccess(response.data));
      }
    }).catch((error) => {
        dispatch(getARViewCategoryFailure(error));
    });
  };
};
export const getARViewCategorySuccess = (response) => {
  const { records } = response;
  return {
    type: GET_AR_VIEW_CATEGORY_SUCCESS,
    arViewCategoryOffers: records
  };
};

export const getARViewCategoryRequest = (page) => {
  return {
    type: GET_AR_VIEW_CATEGORY_REQUEST,
    page
  };
};

export const getARViewCategoryFailure = (error) => {
  return {
    type: GET_AR_VIEW_CATEGORY_FAILURE,
    error
  };
};
