import axios from 'axios';
import { Actions } from 'react-native-router-flux';
import { Toast } from 'native-base';
import {
  PROFILE_VALUE_CHANGED,
  PROFILE_EDIT_REQUEST,
  PROFILE_EDIT_SUCCESS,
  PROFILE_EDIT_FAILURE,
  USER_DATA_FETCH_SUCCESS,
  CP_VERIFY_OTP_CHANGED,
  CP_VERIFY_OTP_REQUEST,
  CP_VERIFY_OTP_SUCCESS,
  CP_VERIFY_OTP_FAILURE,
  CM_VERIFY_OTP_CHANGED,
  CM_VERIFY_OTP_REQUEST,
  CM_VERIFY_OTP_SUCCESS,
  CM_VERIFY_OTP_FAILURE,
  PROFILE_GET_OTP_REQUEST,
  PROFILE_GET_OTP_SUCCESS,
  PROFILE_GET_OTP_FAILURE,
  PASSWORD_VALUE_CHANGED,
  CHANGE_PASSWORD_REQUEST,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAILURE,
  CM_MOBILE_VERIFY_CHANGED,
  URL
} from '../constants';

export const profileValueChanged = ({ prop, value }) => {
  return {
    payload: { prop, value },
    type: PROFILE_VALUE_CHANGED
  };
};

export const profileEdit = ({
  peFirstName,
  peLastName,
  peEmail,
  peProfilePicBase64,
  token
}) => {
  return (dispatch) => {
    dispatch({ type: PROFILE_EDIT_REQUEST });
    const path = 'customer/profile/edit';
    // console.log('peProfilePicBase64 is :');
    // console.log(peProfilePicBase64);
    axios({
      // url: `http://www.mocky.io/v2/5ae189c12d000028009d7ca2?token=${token}`,
      url: `${URL}/${path}?token=${token}`,
      method: 'post',
      data: {
        firstName: peFirstName,
        lastName: peLastName,
        email: peEmail,
        profilePicBase64: peProfilePicBase64,
      }
    }).then(async (response) => {
      const status = response.status;
      if (status === 200) {
        const { userData } = response.data.data;
        console.log('Success Editing Profile');
        console.log(userData);
        profileEditSuccess(dispatch, userData);
      } else {
        dispatch({ type: PROFILE_EDIT_FAILURE });
      }
    }).catch((error) => {
        console.log(error);
        dispatch({ type: PROFILE_EDIT_FAILURE });
    });
  };
};

const profileEditSuccess = (dispatch, userData) => {
  dispatch({
    type: PROFILE_EDIT_SUCCESS
  });
  dispatch({ type: USER_DATA_FETCH_SUCCESS, userData });
  Actions.push('mainScreen');
};

export const changePasswordVerifyOtp = ({ peMobileVerify, peOtpVerify }) => {
  return (dispatch) => {
    dispatch(changePasswordVerifyOtpRequest());
    const path = 'verifyOtp';
    axios({
      url: `${URL}/${path}`,
      // url: 'http://www.mocky.io/v2/5adb7a2c29000050003e3e04',
      method: 'post',
      data: {
        mobile_no: peMobileVerify,
        otp: peOtpVerify
      }
    }).then((response) => {
      const status = response.status;
      if (status === 200) {
        dispatch(changePasswordVerifyOtpSuccess());
        Actions.push('changePasswordScreen');
      }
    }).catch((error) => {
        dispatch(changePasswordVerifyOtpFailure(error));
    });
  };
};
export const changePasswordVerifyOtpSuccess = () => {
  return {
    type: CP_VERIFY_OTP_SUCCESS,
  };
};

export const changePasswordVerifyOtpRequest = () => {
  return {
    type: CP_VERIFY_OTP_REQUEST,
  };
};

export const changePasswordVerifyOtpFailure = (error) => {
  return {
    type: CP_VERIFY_OTP_FAILURE,
    error
  };
};

export const changePasswordVerifyOtpChanged = (text) => {
  return {
    type: CP_VERIFY_OTP_CHANGED,
    payload: text
  };
};

export const changeMobileVerifyOtpChanged = (text) => {
  return {
    type: CM_VERIFY_OTP_CHANGED,
    payload: text
  };
};

export const changeMobileMobileVerifyChanged = (text) => {
  return {
    type: CM_MOBILE_VERIFY_CHANGED,
    payload: text
  };
};
export const profileGetOtp = ({ mobileVerify, fromChangeMobile }) => {
  return (dispatch) => {
    dispatch(profileGetOtpRequest());
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
        dispatch(profileGetOtpSuccess());
        if (fromChangeMobile) {
        Actions.push('changeMobileOtpVerifyScreen');
      }
      }
    }).catch((error) => {
        dispatch(profileGetOtpFailure(error));
    });
  };
};
export const profileGetOtpSuccess = () => {
  return {
    type: PROFILE_GET_OTP_SUCCESS
  };
};

export const profileGetOtpRequest = () => {
  return {
    type: PROFILE_GET_OTP_REQUEST
  };
};

export const profileGetOtpFailure = (error) => {
  return {
    type: PROFILE_GET_OTP_FAILURE,
    error
  };
};

export const passwordValueChanged = (text) => {
  return {
    type: PASSWORD_VALUE_CHANGED,
    payload: text
  };
};


export const changePassword = ({ password, token }) => {
  return (dispatch) => {
    dispatch(changePasswordRequest());
    const path = 'customer/change_credential/password';
    const credentialSlug = 'password';
    axios({
      url: `${URL}/${path}?token=${token}`,
      // url: `http://www.mocky.io/v2/5ae2e3f53100005500083c01?token=${token}`,
      method: 'post',
      data: {
        password,
        credentialSlug
      }
    }).then((response) => {
      const status = response.status;
      if (status === 200) {
        dispatch(changePasswordSuccess());
        console.log('Password Change Success');
        Actions.push('mainScreen');
      }
    }).catch((error) => {
        dispatch(changePasswordFailure(error));
    });
  };
};
export const changePasswordSuccess = () => {
  return {
    type: CHANGE_PASSWORD_SUCCESS
  };
};

export const changePasswordRequest = () => {
  return {
    type: CHANGE_PASSWORD_REQUEST
  };
};

export const changePasswordFailure = (error) => {
  return {
    type: CHANGE_PASSWORD_FAILURE,
    error
  };
};


export const changeMobileVerifyOtp = ({ token, pecmMobileVerify, peOtpVerify }) => {
  return (dispatch) => {
    dispatch(changeMobileVerifyOtpRequest());
    const path = 'customer/change_credential/mobile_no';
    const credentialSlug = 'mobile_no';
    axios({
      url: `${URL}/${path}?token=${token}`,
      // url: 'http://www.mocky.io/v2/5adb7a2c29000050003e3e04',
      method: 'post',
      data: {
        mobile_no: pecmMobileVerify,
        otp: peOtpVerify,
        credentialSlug
      }
    }).then((response) => {
      console.log(response);
      const status = response.status;
      if (status === 200) {
        dispatch(changeMobileVerifyOtpSuccess());
        Toast.show({
                  text: 'Mobile Number Changed, Please Login Again',
                  buttonText: 'Okay',
                  duration: 3000
                });
        Actions.auth({ type: 'reset' });
      }
    }).catch((error) => {
        console.log(error);
        dispatch(changeMobileVerifyOtpFailure(error));
    });
  };
};
export const changeMobileVerifyOtpSuccess = () => {
  return {
    type: CM_VERIFY_OTP_SUCCESS,
  };
};

export const changeMobileVerifyOtpRequest = () => {
  return {
    type: CM_VERIFY_OTP_REQUEST,
  };
};

export const changeMobileVerifyOtpFailure = (error) => {
  return {
    type: CM_VERIFY_OTP_FAILURE,
    error
  };
};
