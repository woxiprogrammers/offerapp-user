import {
    PASSWORD_VALUE_CHANGED,
    CP_VERIFY_OTP_CHANGED,
    CP_VERIFY_OTP_REQUEST,
    CP_VERIFY_OTP_SUCCESS,
    CP_VERIFY_OTP_FAILURE,
    CHANGE_PASSWORD_REQUEST,
    CHANGE_PASSWORD_SUCCESS,
    CHANGE_PASSWORD_FAILURE,
} from '../../constants';

const INITIAL_STATE = {
    password: '',
    changePasswordLoading: false,
    changePasswordError: false,
    peOtpVerify: '',
    peOtpVerifyLoading: false,
    peOtpVerifyError: false,
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case PASSWORD_VALUE_CHANGED:
        return { ...state, password: action.payload };
      case CP_VERIFY_OTP_CHANGED:
        return { ...state, peOtpVerify: action.payload, peOtpVerifyError: false };
      case CHANGE_PASSWORD_SUCCESS:
        return {
          ...state,
          changePasswordError: false,
          changePasswordLoading: false,
          password: ''
        };
      case CHANGE_PASSWORD_FAILURE:
        return {
          ...state,
          changePasswordError: true,
          password: '',
          changePasswordLoading: false };
      case CHANGE_PASSWORD_REQUEST:
        return { ...state, changePasswordLoading: true, changePasswordError: false };
      case CP_VERIFY_OTP_SUCCESS:
        return {
          ...state,
          peOtpVerifyError: false,
          peOtpVerifyLoading: false,
          peOtpVerify: ''
        };
      case CP_VERIFY_OTP_FAILURE:
        return {
          ...state,
          peOtpVerifyError: true,
          peOtpVerify: '',
          peOtpVerifyLoading: false };
      case CP_VERIFY_OTP_REQUEST:
        return { ...state, peOtpVerifyLoading: true, peOtpVerifyError: false };
      default:
        return state;
    }
};
