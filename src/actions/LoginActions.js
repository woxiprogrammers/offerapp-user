import axios from 'axios';
import { Actions } from 'react-native-router-flux';
import { AsyncStorage } from 'react-native';
import {
    USER_CHANGED,
    PASSWORD_CHANGED,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    LOGIN_USER,
    LOGOUT_USER,
    MOBILE_VERIFY_CHANGED,
    OTP_VERIFY_CHANGED,
    GET_OTP_REQUEST,
    GET_OTP_SUCCESS,
    GET_OTP_FAILURE,
    VERIFY_OTP_REQUEST,
    VERIFY_OTP_SUCCESS,
    VERIFY_OTP_FAILURE,
    URL
} from '../constants';

export const loginUser = ({ user, password }) => {
  return (dispatch) => {
    dispatch({ type: LOGIN_USER });
    const path = 'login';
    const loginUserURL = `${URL}/${path}/`;
    axios.post(loginUserURL, {
    mobile_no: user,
    password
  }).then(async (response) => {
      const status = response.status;
      if (status === 200) {
        const token = response.data.token;
        try {
          await AsyncStorage.setItem('token', `${token}`);
        } catch (error) {
          console.log('Error Saving');
        }
        loginUserSuccess(dispatch, token);
      } else {
        loginUserFailed(dispatch);
      }
    }).catch(() => {
    loginUserFailed(dispatch);
  });
  };
};

export const userChanged = (text) => {
  return {
    type: USER_CHANGED,
    payload: text
  };
};

export const passwordChanged = (text) => {
  return {
    type: PASSWORD_CHANGED,
    payload: text
  };
};

export const getOtp = ({ mobileVerify }) => {
  return (dispatch) => {
    dispatch(getOtpRequest());
    const path = 'getOtp';
    axios({
      url: `${URL}/${path}`,
      // url: 'http://www.mocky.io/v2/5adb7a2c29000050003e3e04',
      method: 'post',
      data: {
        mobile_no: mobileVerify
      }
    }).then((response) => {
      const status = response.status;
      if (status === 200) {
        dispatch(getOtpSuccess());
        Actions.push('otpVerifyScreen');
      }
    }).catch((error) => {
        dispatch(getOtpFailure(error));
    });
  };
};
export const getOtpSuccess = () => {
  return {
    type: GET_OTP_SUCCESS
  };
};

export const getOtpRequest = () => {
  return {
    type: GET_OTP_REQUEST
  };
};

export const getOtpFailure = (error) => {
  return {
    type: GET_OTP_FAILURE,
    error
  };
};
export const verifyOtp = ({ mobileVerify, otpVerify }) => {
  return (dispatch) => {
    dispatch(verifyOtpRequest());
    const path = 'verifyOtp';
    axios({
      url: `${URL}/${path}`,
      // url: 'http://www.mocky.io/v2/5adb7a2c29000050003e3e04',
      method: 'post',
      data: {
        mobile_no: mobileVerify,
        otp: otpVerify
      }
    }).then((response) => {
      const status = response.status;
      if (status === 200) {
        dispatch(verifyOtpSuccess());
        Actions.push('signUpFillUpScreen');
      }
    }).catch((error) => {
        dispatch(verifyOtpFailure(error));
    });
  };
};
export const verifyOtpSuccess = () => {
  return {
    type: VERIFY_OTP_SUCCESS,
  };
};

export const verifyOtpRequest = () => {
  return {
    type: VERIFY_OTP_REQUEST,
  };
};

export const verifyOtpFailure = (error) => {
  return {
    type: VERIFY_OTP_FAILURE,
    error
  };
};
export const mobileVerifyChanged = (text) => {
  return {
    type: MOBILE_VERIFY_CHANGED,
    payload: text
  };
};
export const otpVerifyChanged = (text) => {
  return {
    type: OTP_VERIFY_CHANGED,
    payload: text
  };
};
export const logoutUser = () => {
  return async (dispatch) => {
    await AsyncStorage.removeItem('token');
    Actions.auth({ type: 'reset' });
    dispatch({
      type: LOGOUT_USER
    });
  };
};

const loginUserFailed = (dispatch) => {
    dispatch({ type: LOGIN_USER_FAIL });
};

const loginUserSuccess = (dispatch, token) => {
    dispatch({
    type: LOGIN_USER_SUCCESS,
    token
  });
  Actions.push('mainScreen');
};
