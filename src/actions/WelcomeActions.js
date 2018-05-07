import { AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import {
    LOGIN_USER_SUCCESS,
  } from '../constants';

export const checkLoggedIn = () => {
  return async (dispatch) => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      dispatch({
      type: LOGIN_USER_SUCCESS,
      token
    });
      console.log('Going to Main Screen');
      Actions.drawer({ type: 'reset' });
    } else {
      console.log('Going to Login Screen');
      Actions.auth({ type: 'reset' });
    }
  };
};
