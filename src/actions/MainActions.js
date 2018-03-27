import axios from 'axios';

import {
  // GET_TOP_OFFERS_REQUEST,
  // GET_TOP_OFFERS_SUCCESS,
  // GET_TOP_OFFERS_FAILURE,
  GET_SWIPER_REQUEST,
  GET_SWIPER_SUCCESS,
  GET_SWIPER_FAILURE,
  GET_LOCATION_REQUEST,
  GET_LOCATION_SUCCESS,
  GET_LOCATION_FAILURE,
  SEARCH_LOCATION_REQUEST,
  SEARCH_LOCATION_SUCCESS,
  SEARCH_LOCATION_FAILURE,
  // URL
} from '../constants';

// export const getTopOffers = (token) => {
//   return (dispatch) => {
//     dispatch(getTopOffersRequest());
//     const userPath = '';
//     axios({
//       url: `${URL}/${userPath}/?token=${token}`,
//       method: 'post',
//     }).then((response) => {
//       const status = response.status;
//       if (status === 200) {
//         dispatch(getTopOffersSuccess(response.data));
//       }
//     }).catch((error) => {
//         dispatch(getTopOffersFailure(error));
//     });
//   };
// };
// export const getTopOffersSuccess = (response) => {
//   const { records, pagination } = response;
//   return {
//     type: GET_TOP_OFFERS_SUCCESS,
//     posts: records,
//     pagination
//   };
// };
//
// export const getTopOffersRequest = () => {
//   return {
//     type: GET_TOP_OFFERS_REQUEST,
//   };
// };
//
// export const getTopOffersFailure = (error) => {
//   return {
//     type: GET_TOP_OFFERS_FAILURE,
//     error
//   };
// };
//
export const getSwipper = (/*token*/) => {
  return (dispatch) => {
    dispatch(getSwipperRequest());
    // const userPath = '';
    axios({
      // url: `${URL}/${userPath}/?token=${token}`,
      url: 'http://www.mocky.io/v2/5ab8cd272c00000e001861a7',
      method: 'post',
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


export const getLocation = (/*token*/) => {
  return (dispatch) => {
    dispatch(getLocationRequest());
    // const userPath = '';
    axios({
      // url: `${URL}/${userPath}/?token=${token}`,
      url: 'http://www.mocky.io/v2/5ab8cb752c0000810f186197',
      method: 'get',
    }).then((response) => {
      const status = response.status;
      if (status === 200) {
        dispatch(getLocationSuccess(response.data));
      }
    }).catch((error) => {
        dispatch(getLocationFailure(error));
    });
  };
};
export const getLocationSuccess = (response) => {
  const { location } = response;
  return {
    type: GET_LOCATION_SUCCESS,
    location
  };
};

export const getLocationRequest = () => {
  return {
    type: GET_LOCATION_REQUEST,
  };
};

export const getLocationFailure = (error) => {
  return {
    type: GET_LOCATION_FAILURE,
    error
  };
};


export const searchLocation = (/*token,*/text) => {
  return (dispatch) => {
    dispatch(searchLocationRequest());
    // const userPath = '';
    axios({
      // url: `${URL}/${userPath}/?token=${token}`,
      url: 'http://www.mocky.io/v2/5ab9f7a33500005b0073a306',
      method: 'get',
      data: {
        searchText: text
      }
    }).then((response) => {
      const status = response.status;
      if (status === 200) {
        dispatch(searchLocationSuccess(response.data));
      }
    }).catch((error) => {
        dispatch(searchLocationFailure(error));
    });
  };
};

export const searchLocationSuccess = (response) => {
  const { suggestedLocation } = response;
  return {
    type: SEARCH_LOCATION_SUCCESS,
    suggestedLocation
  };
};

export const searchLocationRequest = () => {
  return {
    type: SEARCH_LOCATION_REQUEST,
  };
};

export const searchLocationFailure = (error) => {
  return {
    type: SEARCH_LOCATION_FAILURE,
    error
  };
};
