import axios from 'axios';
import { Actions } from 'react-native-router-flux';
import { AsyncStorage } from 'react-native';
import {
    USER_CHANGED,
    PASSWORD_CHANGED,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    LOGIN_USER,
    LOGOUT_USER,
    URL
} from '../constants';

export const loginUser = ({ user, password }) => {
  console.log('Logging In');
  return (dispatch) => {
    dispatch({ type: LOGIN_USER });
    const path = 'login';
    const loginUserURL = `${URL}/${path}/`;
    axios.post(loginUserURL, {
    mobile_no: user,
    password
  }).then(async (response) => {
      const status = response.status;
      if (status === 200) {
        console.log('Password Correct!!!');
        const token = response.data.token;
        const userData = response.data.userData;
        try {
          await AsyncStorage.setItem('token', `${token}`);
        } catch (error) {
          console.log('Error Saving');
        }
        loginUserSuccess(dispatch, token, userData);
      } else {
        loginUserFailed(dispatch);
      }
    }).catch((error) => {
    console.log(error);
    loginUserFailed(dispatch);
  });
  };
};

export const userChanged = (text) => {
  return {
    type: USER_CHANGED,
    payload: text
  };
};

export const passwordChanged = (text) => {
  return {
    type: PASSWORD_CHANGED,
    payload: text
  };
};

export const logoutUser = () => {
  console.log('Going back to Login Screen');
  return async (dispatch) => {
    await AsyncStorage.removeItem('token');
    Actions.auth({ type: 'reset' });
    dispatch({
      type: LOGOUT_USER
    });
  };
};

const loginUserFailed = (dispatch) => {
    dispatch({ type: LOGIN_USER_FAIL });
};

const loginUserSuccess = (dispatch, token, userData) => {
    dispatch({
    type: LOGIN_USER_SUCCESS,
    token,
    userData
  });
  console.log('Going to Main Screen');
  Actions.push('mainScreen');
};
