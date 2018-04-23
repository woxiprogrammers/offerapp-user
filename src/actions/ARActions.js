import axios from 'axios';
import {
    AR_OFFERS_RESET,
    UPDATE_AR_FILTER,
    GET_AR_OFFERS_REQUEST,
    GET_AR_OFFERS_SUCCESS,
    GET_AR_OFFERS_FAILURE,
    GYRO_MOVE_THRESHOLD_X,
    ADD_AR_OBJECT,
    UPDATE_GYRO_DATA,
    CLEAR_AR_OBJECTS,
    UPDATE_X,
    UPDATE_Y,
    // AR_HANDLE
//    GYRO_MOVE_THRESHOLD_Y
} from '../constants';

export function addARObject(arObject) {
  console.log(arObject);
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
  console.log('============--!!!!');
  console.log(distance);
  console.log(typeSelected);
  return {
    type: UPDATE_AR_FILTER,
    distance,
    typeSelected
  };
};
export const getAROffers = ({
  //token,
  distance,
  typeSelected,
  coords,
  page }) => {
  return (dispatch) => {
    if (page === 1) {
      dispatch({
        type: AR_OFFERS_RESET
      });
    }
    dispatch(getAROffersRequest(page));
    // const path = '';
    console.log('Getting AR Offers Screen');
    axios({
      url: 'http://www.mocky.io/v2/5ad84f513000006c00e58702',
      // url: `${URL}/${path}/?token=${token}&page=${page}`,
      method: 'post',
      data: {
        distance,
        typeSelected,
        coords
      }
    }).then((response) => {
      const status = response.status;
      if (status === 200) {
        dispatch(getAROffersSuccess(response.data));
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
