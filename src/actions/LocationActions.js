import axios from 'axios';

import {
  SEARCH_LOCATION_REQUEST,
  SEARCH_LOCATION_SUCCESS,
  SEARCH_LOCATION_FAILURE,
  SET_LOCATION_REQUEST,
  SET_LOCATION_SUCCESS,
  SET_LOCATION_FAILURE,
  // URL
} from '../constants';

export const searchLocation = (token, text) => {
  return (dispatch) => {
    dispatch(searchLocationRequest());
    // const path = '';
    axios({
      // url: `${URL}/${path}/?token=${token}`,
      url: 'http://www.mocky.io/v2/5ab9f7a33500005b0073a306',
      method: 'post',
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

export const setLocation = (token, text) => {
  return (dispatch) => {
    dispatch(setLocationRequest());
    // const path = '';
    axios({
      // url: `${URL}/${path}/?token=${token}`,
      url: 'http://www.mocky.io/v2/5abb92f02d00004a009bdda7',
      method: 'post',
      data: {
        locationName: text
      }
    }).then((response) => {
      const status = response.status;
      if (status === 200) {
        dispatch(setLocationSuccess(response.data));
      }
    }).catch((error) => {
        dispatch(setLocationFailure(error));
    });
  };
};

export const setLocationSuccess = (response) => {
  const { locationName, coords } = response;
  console.log('Coords change: ');
  console.log(coords);
  console.log('Location change: ');
  console.log(locationName);
  return {
    type: SET_LOCATION_SUCCESS,
    locationName,
    coords
  };
};

export const setLocationRequest = () => {
  return {
    type: SET_LOCATION_REQUEST,
  };
};

export const setLocationFailure = (error) => {
  return {
    type: SET_LOCATION_FAILURE,
    error
  };
};
