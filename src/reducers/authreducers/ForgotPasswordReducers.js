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
} from '../../constants';

const INITIAL_STATE = {
    password: '',
    forgotPasswordLoading: false,
    forgotPasswordError: false,
    fpMobileVerify: '',
    fpMobileVerifyLoading: false,
    fpMobileVerifyError: false,
    fpOtpVerify: '',
    fpOtpVerifyLoading: false,
    fpOtpVerifyError: false,
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case FP_PASSWORD_VALUE_CHANGED:
        return { ...state, password: action.payload, error: false };
      case FP_MOBILE_VERIFY_CHANGED:
        return { ...state, fpMobileVerify: action.payload, fpMobileVerifyError: false };
      case FP_VERIFY_OTP_CHANGED:
        return { ...state, fpOtpVerify: action.payload, fpOtpVerifyError: false };
      case FP_GET_OTP_SUCCESS:
        return {
          ...state,
          fpMobileVerifyError: false,
          fpMobileVerifyLoading: false
        };
      case FP_GET_OTP_FAILURE:
        return {
          ...state,
          fpMobileVerifyError: true,
          fpMobileVerify: '',
          fpMobileVerifyLoading: false };
      case FP_GET_OTP_REQUEST:
        return { ...state, fpMobileVerifyLoading: true, fpMobileVerifyError: false };
      case FP_VERIFY_OTP_SUCCESS:
        return {
          ...state,
          fpOtpVerifyError: false,
          fpOtpVerifyLoading: false,
          fpOtpVerify: ''
        };
      case FP_VERIFY_OTP_FAILURE:
        return {
          ...state,
          fpOtpVerifyError: true,
          fpOtpVerify: '',
          fpOtpVerifyLoading: false };
      case FP_VERIFY_OTP_REQUEST:
        return { ...state, fpOtpVerifyLoading: true, fpOtpVerifyError: false };
      case FORGOT_PASSWORD_SUCCESS:
        return {
          ...state,
          ...INITIAL_STATE
        };
      case FORGOT_PASSWORD_FAILURE:
        return {
          ...state,
          forgotPasswordError: true,
          password: '',
          forgotPasswordLoading: false };
      case FORGOT_PASSWORD_REQUEST:
        return { ...state, forgotPasswordLoading: true, forgotPasswordError: false };
      default:
        return state;
    }
};
