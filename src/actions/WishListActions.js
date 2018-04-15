import axios from 'axios';
// import { Actions } from 'react-native-router-flux';

import {
  GET_WISHLIST_OFFERS_REQUEST,
  GET_WISHLIST_OFFERS_SUCCESS,
  GET_WISHLIST_OFFERS_FAILURE,
  WISHLIST_OFFERS_RESET,
  REMOVE_WISHLIST_OFFER
  // URL
} from '../constants';

export const getWishListOffers = (token, page, userId) => {
  return (dispatch) => {
    if (page === 1) {
      dispatch({
        type: WISHLIST_OFFERS_RESET
      });
    }
    dispatch(getWishListOffersRequest(page));
    // const path = '';
    axios({
      url: 'http://www.mocky.io/v2/5abffe7d2c00004d00c3ced1',
      // url: `${URL}/${path}/?token=${token}&page=${page}`,
      method: 'post',
      data: {
        userId
      }
    }).then((response) => {
      const status = response.status;
      if (status === 200) {
        dispatch(getWishListOffersSuccess(response.data));
      }
    }).catch((error) => {
        dispatch(getWishListOffersFailure(error));
    });
  };
};
export const getWishListOffersSuccess = (response) => {
  const { records, pagination } = response;
  return {
    type: GET_WISHLIST_OFFERS_SUCCESS,
    wishListOffers: records,
    pagination
  };
};

export const getWishListOffersRequest = (page) => {
  return {
    type: GET_WISHLIST_OFFERS_REQUEST,
    page
  };
};

export const getWishListOffersFailure = (error) => {
  return {
    type: GET_WISHLIST_OFFERS_FAILURE,
    error
  };
};

export const removeWislistOffer = (index, token, offerId, userId) => {
  return (dispatch) => {
    // const path = '';
    axios({
      url: 'http://www.mocky.io/v2/5ad1a1593000006600534c18',
      // url: `${URL}/${path}/?token=${token}`,
      method: 'post',
      data: {
        userId,
        offerId
      }
    }).then((response) => {
      const status = response.status;
      if (status === 200) {
        dispatch(removeWislistOfferSuccess(index));
      }
    }).catch((error) => {
      console.error(error);
    });
  };
};

export const removeWislistOfferSuccess = (index) => {
  return {
    type: REMOVE_WISHLIST_OFFER,
    index
  };
};
