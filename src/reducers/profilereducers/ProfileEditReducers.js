import {
    // MOBILE_VERIFY_CHANGED,
    PROFILE_GET_OTP_REQUEST,
    PROFILE_GET_OTP_SUCCESS,
    PROFILE_GET_OTP_FAILURE,
    // VERIFY_OTP_REQUEST,
    // VERIFY_OTP_SUCCESS,
    // VERIFY_OTP_FAILURE,
    PROFILE_VALUE_CHANGED,
    PROFILE_EDIT_REQUEST,
    PROFILE_EDIT_SUCCESS,
    PROFILE_EDIT_FAILURE,
    PROFILE_PIC_UPLOAD_REQUEST,
    PROFILE_PIC_UPLOAD_SUCCESS,
    PROFILE_PIC_UPLOAD_FAILURE,
    CM_MOBILE_VERIFY_CHANGED,
  } from '../../constants';

const INITIAL_STATE = {
    peMobileVerify: '',
    peMobileVerifyLoading: false,
    peMobileVerifyError: false,
    peOtpVerify: '',
    peOtpVerifyLoading: false,
    peOtpVerifyError: false,
    peFirstName: '',
    peProfilePicResult: '',
    peLastName: '',
    peEmail: '',
    pePassword: '',
    peLoading: false,
    peError: false,
    pecmMobileVerify: '',
    peProfilePicUploadLoading: false,
    peProfilePicName: ''
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case PROFILE_VALUE_CHANGED: {
        // console.log(action.payload.prop);
        // console.log(action.payload.value);
        return {
          ...state,
          [action.payload.prop]: action.payload.value,
          peError: false
        }; }
      case CM_MOBILE_VERIFY_CHANGED:
        return { ...state, pecmMobileVerify: action.payload, peMobileVerifyError: false };
      case PROFILE_GET_OTP_SUCCESS:
        return {
          ...state,
          peMobileVerifyError: false,
          peMobileVerifyLoading: false
        };
      case PROFILE_GET_OTP_FAILURE:
        return {
          ...state,
          peMobileVerifyError: true,
          peMobileVerifyLoading: false };
      case PROFILE_GET_OTP_REQUEST:
        return {
          ...state,
          peMobileVerifyLoading: true,
          peMobileVerifyError: false,
        };
      // case VERIFY_OTP_SUCCESS:
      //   return {
      //     ...state,
      //     otpVerifyError: false,
      //     otpVerifyLoading: false,
      //     otpVerify: ''
      //   };
      // case VERIFY_OTP_FAILURE:
      //   return {
      //     ...state,
      //     otpVerifyError: true,
      //     otpVerify: '',
      //     otpVerifyLoading: false };
      // case VERIFY_OTP_REQUEST:
      //   return { ...state, otpVerifyLoading: true, otpVerifyError: false };
      case PROFILE_PIC_UPLOAD_SUCCESS:
        return {
          ...state,
          peProfilePicName: action.peProfilePicName,
          peProfilePicUploadLoading: false
        };
      case PROFILE_PIC_UPLOAD_FAILURE:
        return {
          ...state,
          peProfilePicUploadLoading: false,
         };
      case PROFILE_PIC_UPLOAD_REQUEST:
        return { ...state, peProfilePicUploadLoading: true };
      case PROFILE_EDIT_SUCCESS:
        return {
          ...state,
          ...INITIAL_STATE
        };
      case PROFILE_EDIT_FAILURE:
        return {
          ...state,
          peLoading: false,
          peError: true
         };
      case PROFILE_EDIT_REQUEST:
        return { ...state, peLoading: true, peError: false };
      default:
        return state;
    }
};
