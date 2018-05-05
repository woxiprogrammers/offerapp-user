import axios from 'axios';
// import { Actions } from 'react-native-router-flux';

import {
  GET_INTERESTED_OFFERS_REQUEST,
  GET_INTERESTED_OFFERS_SUCCESS,
  GET_INTERESTED_OFFERS_FAILURE,
  SEND_INTERESTED_OFFER_REQUEST,
  SEND_INTERESTED_OFFER_SUCCESS,
  SEND_INTERESTED_OFFER_FAILURE,
  GET_GRAB_CODE_REQUEST,
  GET_GRAB_CODE_SUCCESS,
  GET_GRAB_CODE_FAILURE,
  INTERESTED_OFFERS_RESET,
  URL
} from '../constants';

export const getInterestedOffers = ({ token, page }) => {
  return (dispatch) => {
    dispatch(getInterestedOffersRequest(page));
    const path = 'customer/offer/interested/listing';
    const offerStatus = 'interested';
    axios({
      // url: 'http://www.mocky.io/v2/5abffe7d2c00004d00c3ced1',
      url: `${URL}/${path}/?token=${token}&page=${page}`,
      method: 'post',
      data: {
        offerStatus
      }
    }).then((response) => {
      const status = response.status;
      if (status === 200) {
        if (page === 1) {
          dispatch({
            type: INTERESTED_OFFERS_RESET
          });
        }
        dispatch(getInterestedOffersSuccess(response.data.data));
      }
    }).catch((error) => {
        dispatch(getInterestedOffersFailure(error));
    });
  };
};
export const getInterestedOffersSuccess = (response) => {
  const { records, pagination } = response;
  return {
    type: GET_INTERESTED_OFFERS_SUCCESS,
    interestedOffers: records,
    pagination
  };
};

export const getInterestedOffersRequest = (page) => {
  return {
    type: GET_INTERESTED_OFFERS_REQUEST,
    page
  };
};

export const getInterestedOffersFailure = (error) => {
  return {
    type: GET_INTERESTED_OFFERS_FAILURE,
    error
  };
};


export const sendInterestedOffer = ({
  token,
  offerId,
  selectedTime }) => {
  return (dispatch) => {
    dispatch(sendInterestedOfferRequest());
    const path = 'customer/offer/interested/add';
    axios({
      // url: 'http://www.mocky.io/v2/5ad1a1593000006600534c18',
      url: `${URL}/${path}/?token=${token}`,
      method: 'post',
      data: {
        offerId,
        selectedTime
      }
    }).then((response) => {
      const status = response.status;
      if (status === 200) {
        dispatch(sendInterestedOfferSuccess());
      }
    }).catch((error) => {
        dispatch(sendInterestedOfferFailure(error));
    });
  };
};
export const sendInterestedOfferSuccess = () => {
  return {
    type: SEND_INTERESTED_OFFER_SUCCESS,
  };
};

export const sendInterestedOfferRequest = () => {
  return {
    type: SEND_INTERESTED_OFFER_REQUEST,
  };
};

export const sendInterestedOfferFailure = (error) => {
  return {
    type: SEND_INTERESTED_OFFER_FAILURE,
    error
  };
};
export const getGrabCode = ({ token, offerId }) => {
  return (dispatch) => {
    dispatch(getGrabCodeRequest());
    // const path = 'customer/offer/interested/add';
    axios({
      url: `http://www.mocky.io/v2/5ae9bc0b3000006c005db199?token=${token}`,
      // url: `${URL}/${path}/?token=${token}`,
      method: 'post',
      data: {
        offerId
      }
    }).then((response) => {
      const status = response.status;
      if (status === 200) {
        dispatch(getGrabCodeSuccess(response.data.data));
      }
    }).catch((error) => {
        dispatch(getGrabCodeFailure(error));
    });
  };
};
export const getGrabCodeSuccess = (response) => {
  const grabCode = response.grabCode;
  return {
    type: GET_GRAB_CODE_SUCCESS,
    grabCode
  };
};

export const getGrabCodeRequest = () => {
  return {
    type: GET_GRAB_CODE_REQUEST,
  };
};

export const getGrabCodeFailure = (error) => {
  return {
    type: GET_GRAB_CODE_FAILURE,
    error
  };
};
