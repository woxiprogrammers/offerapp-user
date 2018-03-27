import {
    USER_CHANGED,
    PASSWORD_CHANGED,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    LOGIN_USER,
    LOGOUT_USER
  } from '../constants';

const INITIAL_STATE = {
    user: '7744866241',
    password: 'secret',
    error: false,
    loginLoading: false,
    token: ''
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
          token: action.payload
        };
      case LOGOUT_USER:
          return {
            ...state,
            ...INITIAL_STATE
          };
      case LOGIN_USER_FAIL:
        return {
          ...state,
          error: true,
          password: '',
          loginLoading: false };
      case LOGIN_USER:
        return { ...state, loginLoading: true, error: false };
      default:
        return state;
    }
};
