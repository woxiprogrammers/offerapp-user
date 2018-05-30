import {
    USER_CHANGED,
    PASSWORD_CHANGED,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    LOGIN_USER,
    LOGOUT_USER,
    USER_DATA_FETCH_SUCCESS,
    IMAGEURL
  } from '../constants';

const INITIAL_STATE = {
    user: '8082448809',
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
      case USER_DATA_FETCH_SUCCESS: {
        const profilePic = action.userData.profilePic;
        const profilePicPath = `${IMAGEURL}${profilePic}`;
        console.log('profilePicPath is :');
        console.log(profilePicPath);
        return {
          ...state,
          userData: {
          ...action.userData,
          profilePic: profilePicPath
          }
        };
      }
      case LOGOUT_USER:
          return {
            ...state,
            ...INITIAL_STATE
          };
      default:
        return state;
    }
};
