import {
    MOBILE_VERIFY_CHANGED,
    VERIFY_OTP_CHANGED,
    GET_OTP_REQUEST,
    GET_OTP_SUCCESS,
    GET_OTP_FAILURE,
    VERIFY_OTP_REQUEST,
    VERIFY_OTP_SUCCESS,
    VERIFY_OTP_FAILURE,
    SU_VALUE_CHANGED,
    SU_USER_REQUEST,
    SU_USER_SUCCESS,
    SU_USER_FAILURE,
  } from '../../constants';

const INITIAL_STATE = {
    mobileVerify: '',
    mobileVerifyLoading: false,
    mobileVerifyError: false,
    otpVerify: '',
    otpVerifyLoading: false,
    otpVerifyError: false,
    suFirstName: '',
    suLastName: '',
    suEmail: '',
    suPassword: '',
    suLoading: false,
    suError: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case MOBILE_VERIFY_CHANGED:
        return { ...state, mobileVerify: action.payload, mobileVerifyError: false };
      case VERIFY_OTP_CHANGED:
        return { ...state, otpVerify: action.payload, otpVerifyError: false };
      case SU_VALUE_CHANGED:
        return {
          ...state,
          [action.payload.prop]: action.payload.value,
          suError: false
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
      case SU_USER_SUCCESS:
        return {
          ...state,
          ...INITIAL_STATE,
          token: action.token,
          userData: action.userData
        };
      case SU_USER_FAILURE:
        return {
          ...state,
          suPassword: '',
          suLoading: false,
          suError: true
         };
      case SU_USER_REQUEST:
        return { ...state, suLoading: true, suError: false };
      default:
        return state;
    }
};
