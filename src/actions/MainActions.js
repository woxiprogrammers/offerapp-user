import axios from 'axios';

import {
  NEARBY_OFFERS_RESET,
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

export const getNearbyOffers = ({ token, page, coords }) => {
  return (dispatch) => {
    dispatch(getNearbyOffersRequest(page));
    const path = 'customer/offer/nearby/listing';
    console.log('coords are :');
    console.log(coords);
    axios({
      // url: 'http://www.mocky.io/v2/5ae01b9032000055005109a3',
      url: `${URL}/${path}/?token=${token}&page=${page}`,
      method: 'post',
      data: {
        coords
      }
    }).then((response) => {
      if (page === 1) {
        dispatch({
          type: NEARBY_OFFERS_RESET
        });
      }
      const status = response.status;
      if (status === 200) {
        dispatch(getNearbyOffersSuccess(response.data.data));
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
    nearByOffers: records,
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


export const getSwipper = ({ token, coords }) => {
  return (dispatch) => {
    dispatch(getSwipperRequest());
    const path = 'customer/offer/trending/listing';
    axios({
      url: `${URL}/${path}/?token=${token}`,
      // url: 'http://www.mocky.io/v2/5ab8cd272c00000e001861a7',
      method: 'post',
      data: {
        coords
      }
    }).then((response) => {
      const status = response.status;
      if (status === 200) {
        dispatch(getSwipperSuccess(response.data.data));
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
    const path = 'customer/location/get';
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
        dispatch(getLocationSuccess(response.data.data));
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
