import axios from 'axios';
import { Actions } from 'react-native-router-flux';
import { AsyncStorage } from 'react-native';
import { Permissions, Notifications } from 'expo';
import {
    USER_CHANGED,
    PASSWORD_CHANGED,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    LOGIN_USER,
    LOGOUT_USER,
    URL
} from '../constants';

const registerForPushNotificationsAsync = async () => {
 const { status: existingStatus } = await Permissions.getAsync(
   Permissions.NOTIFICATIONS
 );
 let finalStatus = existingStatus;

 // only ask if permissions have not already been determined, because
 // iOS won't necessarily prompt the user a second time.
 if (existingStatus !== 'granted') {
   // Android remote notification permissions are granted during the app
   // install, so this will only ask on iOS
   const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
   finalStatus = status;
 }

 // Stop here if the user did not grant permissions
 if (finalStatus !== 'granted') {
   return;
 }
 // Get the token that uniquely identifies this device
 const PushToken = await Notifications.getExpoPushTokenAsync();
 return PushToken;
};

export const loginUser = ({ user, password }) => {
  return async (dispatch) => {
    dispatch({ type: LOGIN_USER });
    const PushToken = await registerForPushNotificationsAsync();
    const path = 'login';
    const loginUserURL = `${URL}/${path}/`;
    axios.post(loginUserURL, {
    mobile_no: user,
    password,
    PushToken
  }).then(async (response) => {
      const status = response.status;
      if (status === 200) {
        const token = response.data.token;
        try {
          await AsyncStorage.setItem('token', `${token}`);
        } catch (error) {
          console.log('Error Saving');
        }
        loginUserSuccess(dispatch, token);
      } else {
        loginUserFailed(dispatch);
      }
    }).catch(() => {
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

const loginUserSuccess = (dispatch, token) => {
    dispatch({
    type: LOGIN_USER_SUCCESS,
    token
  });
  Actions.drawer({ type: 'reset' });
};
