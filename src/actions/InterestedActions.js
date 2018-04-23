import axios from 'axios';
// import { Actions } from 'react-native-router-flux';

import {
  GET_INTERESTED_OFFERS_REQUEST,
  GET_INTERESTED_OFFERS_SUCCESS,
  GET_INTERESTED_OFFERS_FAILURE,
  SEND_INTERESTED_OFFER_REQUEST,
  SEND_INTERESTED_OFFER_SUCCESS,
  SEND_INTERESTED_OFFER_FAILURE,
  INTERESTED_OFFERS_RESET,
  URL
} from '../constants';

export const getInterestedOffers = ({ token, page }) => {
  return (dispatch) => {
    if (page === 1) {
      dispatch({
        type: INTERESTED_OFFERS_RESET
      });
    }
    dispatch(getInterestedOffersRequest(page));
    const path = 'customer/offer/interested/listing';
    const offerStatus = 'interested';
    console.log('Getting Interested Offers :');
    console.log(`${URL}/${path}/?token=${token}&page=${page}`);
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


export const sendInterestedOffer = (token, offerId, userId, selectedTime) => {
  return (dispatch) => {
    dispatch(sendInterestedOfferRequest());
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
