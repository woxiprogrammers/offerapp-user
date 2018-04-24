import {
    USER_CHANGED,
    PASSWORD_CHANGED,
    MOBILE_VERIFY_CHANGED,
    OTP_VERIFY_CHANGED,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    LOGIN_USER,
    LOGOUT_USER,
    GET_OTP_REQUEST,
    GET_OTP_SUCCESS,
    GET_OTP_FAILURE,
    VERIFY_OTP_REQUEST,
    VERIFY_OTP_SUCCESS,
    VERIFY_OTP_FAILURE,
  } from '../constants';

const INITIAL_STATE = {
    user: '5555555555',
    password: 'tejas',
    error: false,
    loginLoading: false,
    token: '',
    userData: [],
    mobileVerify: '',
    mobileVerifyLoading: false,
    mobileVerifyError: false,
    otpVerify: '',
    otpVerifyLoading: false,
    otpVerifyError: false,
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case USER_CHANGED:
        return { ...state, user: action.payload, error: false };
      case PASSWORD_CHANGED:
        return { ...state, password: action.payload, error: false };
      case MOBILE_VERIFY_CHANGED:
        return { ...state, mobileVerify: action.payload, mobileVerifyError: false };
      case OTP_VERIFY_CHANGED:
        return { ...state, otpVerify: action.payload, otpVerifyError: false };
      case LOGIN_USER_SUCCESS:
        return {
          ...state,
          ...INITIAL_STATE,
          token: action.token,
          userData: action.userData
        };
      case LOGIN_USER_FAIL:
        return {
          ...state,
          error: true,
          password: '',
          loginLoading: false };
      case LOGIN_USER:
        return { ...state, loginLoading: true, error: false };
      case LOGOUT_USER:
          return {
            ...state,
            ...INITIAL_STATE
          };
      case GET_OTP_SUCCESS:
        return {
          ...state,
          mobileVerifyError: false,
          mobileVerifyLoading: false
        };
      case GET_OTP_FAILURE:
        return {
          ...state,
          mobileVerifyError: true,
          mobileVerify: '',
          mobileVerifyLoading: false };
      case GET_OTP_REQUEST:
        return { ...state, mobileVerifyLoading: true, mobileVerifyError: false };
      case VERIFY_OTP_SUCCESS:
        return {
          ...state,
          otpVerifyError: false,
          otpVerifyLoading: false,
          otpVerify: ''
        };
      case VERIFY_OTP_FAILURE:
        return {
          ...state,
          otpVerifyError: true,
          otpVerify: '',
          otpVerifyLoading: false };
      case VERIFY_OTP_REQUEST:
        return { ...state, otpVerifyLoading: true, otpVerifyError: false };
      default:
        return state;
    }
};
