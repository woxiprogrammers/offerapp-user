import axios from 'axios';
import { Actions } from 'react-native-router-flux';
import {
  FP_MOBILE_VERIFY_CHANGED,
  FP_VERIFY_OTP_CHANGED,
  FP_PASSWORD_VALUE_CHANGED,
  FP_GET_OTP_REQUEST,
  FP_GET_OTP_SUCCESS,
  FP_GET_OTP_FAILURE,
  FP_VERIFY_OTP_REQUEST,
  FP_VERIFY_OTP_SUCCESS,
  FP_VERIFY_OTP_FAILURE,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILURE,
  URL
} from '../constants';

export const forgotPasswordGetOtp = ({ mobileVerify }) => {
  return (dispatch) => {
    dispatch(forgotPasswordGetOtpRequest());
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
        dispatch(forgotPasswordGetOtpSuccess());
        Actions.push('forgotPasswordVerifyOtpScreen');
      }
    }).catch((error) => {
        dispatch(forgotPasswordGetOtpFailure(error));
    });
  };
};
export const forgotPasswordGetOtpSuccess = () => {
  return {
    type: FP_GET_OTP_SUCCESS
  };
};

export const forgotPasswordGetOtpRequest = () => {
  return {
    type: FP_GET_OTP_REQUEST
  };
};

export const forgotPasswordGetOtpFailure = (error) => {
  return {
    type: FP_GET_OTP_FAILURE,
    error
  };
};
export const forgotPasswordPasswordValueChanged = (text) => {
  return {
    type: FP_PASSWORD_VALUE_CHANGED,
    payload: text
  };
};
export const forgotPasswordVerifyOtp = ({ fpMobileVerify, fpOtpVerify }) => {
  return (dispatch) => {
    dispatch(forgotPasswordVerifyOtpRequest());
    const path = 'verifyOtp';
    axios({
      url: `${URL}/${path}`,
      // url: 'http://www.mocky.io/v2/5adb7a2c29000050003e3e04',
      method: 'post',
      data: {
        mobile_no: fpMobileVerify,
        otp: fpOtpVerify
      }
    }).then((response) => {
      const status = response.status;
      if (status === 200) {
        dispatch(forgotPasswordVerifyOtpSuccess());
        Actions.push('forgotPasswordScreen');
      }
    }).catch((error) => {
        dispatch(forgotPasswordVerifyOtpFailure(error));
    });
  };
};
export const forgotPasswordVerifyOtpSuccess = () => {
  return {
    type: FP_VERIFY_OTP_SUCCESS,
  };
};

export const forgotPasswordVerifyOtpRequest = () => {
  return {
    type: FP_VERIFY_OTP_REQUEST,
  };
};

export const forgotPasswordVerifyOtpFailure = (error) => {
  return {
    type: FP_VERIFY_OTP_FAILURE,
    error
  };
};

export const forgotPasswordMobileVerifyChanged = (text) => {
  return {
    type: FP_MOBILE_VERIFY_CHANGED,
    payload: text
  };
};
export const forgotPasswordVerifyOtpChanged = (text) => {
  return {
    type: FP_VERIFY_OTP_CHANGED,
    payload: text
  };
};

export const forgotPassword = ({ password, fpMobileVerify }) => {
  return (dispatch) => {
    dispatch(forgotPasswordRequest());
    const path = 'forgetpassword';
    axios({
      url: `${URL}/${path}`,
      // url: 'http://www.mocky.io/v2/5ae2e3f53100005500083c01',
      method: 'post',
      data: {
        password,
        mobile_no: fpMobileVerify
      }
    }).then((response) => {
      const status = response.status;
      if (status === 200) {
        dispatch(forgotPasswordSuccess());
        Actions.reset('auth');
      }
    }).catch((error) => {
        dispatch(forgotPasswordFailure(error));
    });
  };
};
export const forgotPasswordSuccess = () => {
  return {
    type: FORGOT_PASSWORD_SUCCESS
  };
};

export const forgotPasswordRequest = () => {
  return {
    type: FORGOT_PASSWORD_REQUEST
  };
};

export const forgotPasswordFailure = (error) => {
  return {
    type: FORGOT_PASSWORD_FAILURE,
    error
  };
};
