import axios from 'axios';
import {
    AR_OFFERS_RESET,
    UPDATE_AR_FILTER,
    GET_AR_OFFERS_REQUEST,
    GET_AR_OFFERS_SUCCESS,
    GET_AR_OFFERS_FAILURE,
    GET_AR_LISTING_OFFERS_REQUEST,
    GET_AR_LISTING_OFFERS_SUCCESS,
    GET_AR_LISTING_OFFERS_FAILURE,
    AR_LISTING_OFFERS_RESET,
    UPDATE_AR_OFFER_TYPES,
    UPDATE_AR_DISTANCE,
    GYRO_MOVE_THRESHOLD_X,
    ADD_AR_OBJECT,
    UPDATE_GYRO_DATA,
    CLEAR_AR_OBJECTS,
    UPDATE_X,
    UPDATE_Y,
    URL
    // AR_HANDLE
//    GYRO_MOVE_THRESHOLD_Y
} from '../constants';

export function addARObject(arObject) {
  return dispatch => {
      dispatch({
          type: ADD_AR_OBJECT,
          arObject
      });
  };
}

export function clearARObjects() {
  return dispatch => {
      dispatch({
          type: CLEAR_AR_OBJECTS
      });
  };
}

export function updateX(difference) {
  return dispatch => {
    dispatch({
        type: UPDATE_X,
        difference
    });
  };
}
export function updateY(difference) {
  return dispatch => {
    dispatch({
        type: UPDATE_Y,
        difference
    });
  };
}
// export function arHandle(arOn) {
//   return dispatch => {
//     dispatch({
//         type: AR_HANDLE,
//         arOn
//     });
//   };
// }
export function updateGyroData(gyroData) {
  let moveX = 0;
  const moveY = 0;
  if (gyroData.y > GYRO_MOVE_THRESHOLD_X
      || gyroData.y < GYRO_MOVE_THRESHOLD_X * -1) {
      moveX = 1;
  }
  // if (gyroData.x > GYRO_MOVE_THRESHOLD_Y
  //     || gyroData.x < GYRO_MOVE_THRESHOLD_Y * -1) {
  //     moveY = 1;
  // }
  return dispatch => {
      dispatch({
          type: UPDATE_GYRO_DATA,
          rotationRate: gyroData,
          moveX,
          moveY
      });
  };
}
export const updateARFilter = ({ distance, typeSelected }) => {
  return {
    type: UPDATE_AR_FILTER,
    distance,
    typeSelected
  };
};
export const getAROffers = ({
  token,
  distance,
  typeSelected,
  coords,
  page }) => {
  return (dispatch) => {
    dispatch(getAROffersRequest(page));
    const path = 'customer/offer/augmented-reality/seller-info';
    axios({
      // url: 'http://www.mocky.io/v2/5ae1a0c92d000046009d7d22',
      url: `${URL}/${path}/?token=${token}`,
      method: 'post',
      data: {
        distance,
        offerTypeSlug: typeSelected,
        coords
      }
    }).then((response) => {
      const status = response.status;
      if (status === 200) {
        if (page === 1) {
          dispatch({
            type: AR_OFFERS_RESET
          });
        }
        dispatch(getAROffersSuccess(response.data.data));
      }
    }).catch((error) => {
        dispatch(getAROffersFailure(error));
    });
  };
};
export const getAROffersSuccess = (response) => {
  const { records } = response;
  return {
    type: GET_AR_OFFERS_SUCCESS,
    arOffers: records
  };
};

export const getAROffersRequest = (page) => {
  return {
    type: GET_AR_OFFERS_REQUEST,
    page
  };
};

export const getAROffersFailure = (error) => {
  return {
    type: GET_AR_OFFERS_FAILURE,
    error
  };
};
export const getARListingOffers = ({
    sellerAddressId,
    typeSelected,
    token,
    page
  }) => {
  return (dispatch) => {
    if (page === 1) {
      dispatch({
        type: AR_LISTING_OFFERS_RESET
      });
    }
    dispatch(getARListingOffersRequest(page));
    const path = 'customer/offer/augmented-reality/listing';
    axios({
      // url: `http://www.mocky.io/v2/5ae19c8e2d00005e009d7d03?token=${token}`,
      url: `${URL}/${path}/?token=${token}&page=${page}`,
      method: 'post',
      data: {
        offerTypeSlug: typeSelected,
        sellerAddressId
      }
    }).then((response) => {
      const status = response.status;
      if (status === 200) {
        dispatch(getARListingOffersSuccess(response.data.data));
      }
    }).catch((error) => {
        dispatch(getARListingOffersFailure(error));
    });
  };
};
export const getARListingOffersSuccess = (response) => {
  const { records, pagination } = response;
  return {
    type: GET_AR_LISTING_OFFERS_SUCCESS,
    arListingOffers: records,
    pagination
  };
};

export const getARListingOffersRequest = (page) => {
  return {
    type: GET_AR_LISTING_OFFERS_REQUEST,
    page
  };
};

export const getARListingOffersFailure = (error) => {
  return {
    type: GET_AR_LISTING_OFFERS_FAILURE,
    error
  };
};

export const updateAROfferTypes = (typeSelected) => {
  return {
    type: UPDATE_AR_OFFER_TYPES,
    typeSelected
  };
};
export const updateARDistance = (distance) => {
  return {
    type: UPDATE_AR_DISTANCE,
    distance
  };
};
