import axios from 'axios';

import {
  GET_NEARBY_OFFERS_REQUEST,
  GET_NEARBY_OFFERS_SUCCESS,
  GET_NEARBY_OFFERS_FAILURE,
  GET_SWIPER_REQUEST,
  GET_SWIPER_SUCCESS,
  GET_SWIPER_FAILURE,
  GET_LOCATION_REQUEST,
  GET_LOCATION_SUCCESS,
  GET_LOCATION_FAILURE,
  URL
} from '../constants';

export const getNearbyOffers = (token, page, userLocation) => {
  return (dispatch) => {
    dispatch(getNearbyOffersRequest(page));
    // const path = '';
    axios({
      url: 'http://www.mocky.io/v2/5abb7db42d000047009bdd30',
      // url: `${URL}/${path}/?token=${token}&page=${page}`,
      method: 'post',
      data: {
        userLocation
      }
    }).then((response) => {
      const status = response.status;
      if (status === 200) {
        dispatch(getNearbyOffersSuccess(response.data));
      }
    }).catch((error) => {
        dispatch(getNearbyOffersFailure(error));
    });
  };
};
export const getNearbyOffersSuccess = (response) => {
  const { records, pagination } = response;
  return {
    type: GET_NEARBY_OFFERS_SUCCESS,
    posts: records,
    pagination
  };
};

export const getNearbyOffersRequest = (page) => {
  return {
    type: GET_NEARBY_OFFERS_REQUEST,
    page
  };
};

export const getNearbyOffersFailure = (error) => {
  return {
    type: GET_NEARBY_OFFERS_FAILURE,
    error
  };
};


export const getSwipper = (token, userLocation) => {
  return (dispatch) => {
    dispatch(getSwipperRequest());
    // const path = '';
    axios({
      // url: `${URL}/${path}/?token=${token}`,
      url: 'http://www.mocky.io/v2/5ab8cd272c00000e001861a7',
      method: 'post',
      data: {
        userLocation
      }
    }).then((response) => {
      const status = response.status;
      if (status === 200) {
        dispatch(getSwipperSuccess(response.data));
      }
    }).catch((error) => {
        dispatch(getSwipperFailure(error));
    });
  };
};
export const getSwipperSuccess = (response) => {
  const offerId = response.offerId;
  const imageList = response.imageList;
  const loadQueue = response.loadQueue;

  return {
    type: GET_SWIPER_SUCCESS,
    offerId,
    imageList,
    loadQueue
  };
};

export const getSwipperRequest = () => {
  return {
    type: GET_SWIPER_REQUEST,
  };
};

export const getSwipperFailure = (error) => {
  return {
    type: GET_SWIPER_FAILURE,
    error
  };
};


export const getLocation = (token, coords) => {
  return async (dispatch) => {
    dispatch(getLocationRequest(coords));
    console.log(coords);
    const path = 'customer/getlocation';
    console.log('Getting Location: ');
    console.log(`${URL}/${path}/?token=${token}`);
    await axios({
      // url: 'http://www.mocky.io/v2/5abb3eb22d000054009bdb41',
      url: `${URL}/${path}/?token=${token}`,
      method: 'post',
      data: {
        coords
      }
    }).then((response) => {
      const status = response.status;
      if (status === 200) {
        console.log(response.data);
        dispatch(getLocationSuccess(response.data));
      }
    }).catch((error) => {
        dispatch(getLocationFailure(error));
    });
  };
};
export const getLocationSuccess = (response) => {
  const { locationName } = response;
  return {
    type: GET_LOCATION_SUCCESS,
    locationName
  };
};

export const getLocationRequest = (coords) => {
  return {
    type: GET_LOCATION_REQUEST,
    coords
  };
};

export const getLocationFailure = (error) => {
  return {
    type: GET_LOCATION_FAILURE,
    error
  };
};
