import {
    USER_CHANGED,
    PASSWORD_CHANGED,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    LOGIN_USER,
    LOGOUT_USER,
    USER_DATA_FETCH_SUCCESS,
    PROFILE_PIC_UPLOAD_SUCCESS,
    PROFILE_PIC_UPLOAD_FAILURE
  } from '../constants';

const INITIAL_STATE = {
    user: '5555555555',
    password: 'tejas',
    error: false,
    loginLoading: false,
    token: '',
    userData: [],
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case USER_CHANGED:
        return { ...state, user: action.payload, error: false };
      case PASSWORD_CHANGED:
        return { ...state, password: action.payload, error: false };
      case LOGIN_USER_SUCCESS:
        return {
          ...state,
          ...INITIAL_STATE,
          token: action.token
        };
      case LOGIN_USER_FAIL:
        return {
          ...state,
          error: true,
          password: '',
          loginLoading: false };
      case LOGIN_USER:
        return { ...state, loginLoading: true, error: false };
      case USER_DATA_FETCH_SUCCESS:
        return { ...state, userData: action.userData };
      case PROFILE_PIC_UPLOAD_SUCCESS: {
        const { profilePic } = action.profilePic;
        return {
          ...state,
          userData: [
            ...state.userData,
            profilePic
          ]
        }; }
      case PROFILE_PIC_UPLOAD_FAILURE:
        return {
          ...state,
        };
      case LOGOUT_USER:
          return {
            ...state,
            ...INITIAL_STATE
          };
      default:
        return state;
    }
};
