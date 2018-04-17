import axios from 'axios';

import {
  GET_OFFER_DETAILS_REQUEST,
  GET_OFFER_DETAILS_SUCCESS,
  GET_OFFER_DETAILS_FAILURE,
  // GET_OFFER_SWIPER_REQUEST,
  // GET_OFFER_SWIPER_SUCCESS,
  // GET_OFFER_SWIPER_FAILURE,
  ADD_TO_WISHLIST_REQUEST,
  ADD_TO_WISHLIST_SUCCESS,
  ADD_TO_WISHLIST_FAILURE,
  ADD_TO_INTERESTED_REQUEST,
  ADD_TO_INTERESTED_SUCCESS,
  ADD_TO_INTERESTED_FAILURE,
  // URL
} from '../constants';

export const getOfferDetails = (token, userId, offerId) => {
  return (dispatch) => {
    dispatch(getOfferDetailsRequest());
    // const path = '';
    axios({
      url: 'http://www.mocky.io/v2/5ad545413200006600202a92',
      // url: `${URL}/${path}/?token=${token}&page=${page}`,
      method: 'post',
      data: {
        userId,
        offerId
      }
    }).then((response) => {
      const status = response.status;
      if (status === 200) {
        dispatch(getOfferDetailsSuccess(response.data));
      }
    }).catch((error) => {
        dispatch(getOfferDetailsFailure(error));
    });
  };
};
export const getOfferDetailsSuccess = (response) => {
  return {
    type: GET_OFFER_DETAILS_SUCCESS,
    offer: response,
  };
};

export const getOfferDetailsRequest = () => {
  return {
    type: GET_OFFER_DETAILS_REQUEST,
  };
};

export const getOfferDetailsFailure = (error) => {
  return {
    type: GET_OFFER_DETAILS_FAILURE,
    error
  };
};


// export const getOfferSwipper = (token, offerId) => {
//   return (dispatch) => {
//     dispatch(getOfferSwipperRequest());
//     // const path = '';
//     axios({
//       // url: `${URL}/${path}/?token=${token}`,
//       url: 'http://www.mocky.io/v2/5ab8cd272c00000e001861a7',
//       method: 'post',
//       data: {
//         offerId
//       }
//     }).then((response) => {
//       const status = response.status;
//       if (status === 200) {
//         dispatch(getOfferSwipperSuccess(response.data));
//       }
//     }).catch((error) => {
//         dispatch(getOfferSwipperFailure(error));
//     });
//   };
// };
// export const getOfferSwipperSuccess = (response) => {
//   const imageList = response.imageList;
//   const loadQueue = response.loadQueue;
//   return {
//     type: GET_OFFER_SWIPER_SUCCESS,
//     imageList,
//     loadQueue
//   };
// };
//
// export const getOfferSwipperRequest = () => {
//   return {
//     type: GET_OFFER_SWIPER_REQUEST,
//   };
// };
//
// export const getOfferSwipperFailure = (error) => {
//   return {
//     type: GET_OFFER_SWIPER_FAILURE,
//     error
//   };
// };

export const addToWishList = (token, userId, offerId) => {
  return (dispatch) => {
    dispatch(getOfferDetailsRequest());
    // const path = '';
    axios({
      url: 'http://www.mocky.io/v2/5ad32bcd2d000054005c976f',
      // url: `${URL}/${path}/?token=${token}&page=${page}`,
      method: 'post',
      data: {
        userId,
        offerId
      }
    }).then((response) => {
      const status = response.status;
      if (status === 200) {
        dispatch(getOfferDetailsSuccess());
      }
    }).catch((error) => {
        dispatch(getOfferDetailsFailure(error));
    });
  };
};
export const addToWishListSuccess = () => {
  return {
    type: ADD_TO_WISHLIST_SUCCESS,
  };
};

export const addToWishListRequest = () => {
  return {
    type: ADD_TO_WISHLIST_REQUEST,
  };
};

export const addToWishListFailure = (error) => {
  return {
    type: ADD_TO_WISHLIST_FAILURE,
    error
  };
};
export const addToInterested = (token, offerId, userId, selectedTime) => {
  return (dispatch) => {
    dispatch(addToInterestedRequest());
    // const path = '';
    axios({
      url: 'http://www.mocky.io/v2/5ad1a1593000006600534c18',
      // url: `${URL}/${path}/?token=${token}&page=${page}`,
      method: 'post',
      data: {
        offerId,
        userId,
        selectedTime
      }
    }).then((response) => {
      const status = response.status;
      if (status === 200) {
        dispatch(addToInterestedSuccess());
      }
    }).catch((error) => {
        dispatch(addToInterestedFailure(error));
    });
  };
};
export const addToInterestedSuccess = () => {
  return {
    type: ADD_TO_INTERESTED_SUCCESS,
  };
};

export const addToInterestedRequest = () => {
  return {
    type: ADD_TO_INTERESTED_REQUEST,
  };
};

export const addToInterestedFailure = (error) => {
  return {
    type: ADD_TO_INTERESTED_FAILURE,
    error
  };
};
