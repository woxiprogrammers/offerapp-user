import {
    CM_VERIFY_OTP_CHANGED,
    CM_VERIFY_OTP_REQUEST,
    CM_VERIFY_OTP_SUCCESS,
    CM_VERIFY_OTP_FAILURE,
} from '../../constants';

const INITIAL_STATE = {
    peOtpVerify: '',
    peOtpVerifyLoading: false,
    peOtpVerifyError: false,
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case CM_VERIFY_OTP_CHANGED:
        return { ...state, peOtpVerify: action.payload, peOtpVerifyError: false };
      case CM_VERIFY_OTP_SUCCESS:
        return {
          ...state,
          peOtpVerifyError: false,
          peOtpVerifyLoading: false,
          peOtpVerify: ''
        };
      case CM_VERIFY_OTP_FAILURE:
        return {
          ...state,
          peOtpVerifyError: true,
          peOtpVerify: '',
          peOtpVerifyLoading: false };
      case CM_VERIFY_OTP_REQUEST:
        return { ...state, peOtpVerifyLoading: true, peOtpVerifyError: false };
      default:
        return state;
    }
};
