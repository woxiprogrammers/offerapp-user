import axios from 'axios';
import { Actions } from 'react-native-router-flux';
import { AsyncStorage } from 'react-native';
import {
  SU_VALUE_CHANGED,
  SU_USER_REQUEST,
  SU_USER_SUCCESS,
  SU_USER_FAILURE,
  URL
} from '../constants';

export const valueChanged = ({ prop, value }) => {
  return {
    payload: { prop, value },
    type: SU_VALUE_CHANGED
  };
};

export const signUpUser = ({
  suFirstName,
  suLastName,
  suEmail,
  suPassword,
  mobileVerify
}) => {
  return (dispatch) => {
    const roleSlug = 'customer';
    dispatch({ type: SU_USER_REQUEST });
    const path = 'register';
    axios({
      // url: 'http://www.mocky.io/v2/5abffe7d2c00004d00c3ced1',
      url: `${URL}/${path}`,
      method: 'post',
      data: {
        roleSlug,
        first_name: suFirstName,
        last_name: suLastName,
        email: suEmail,
        password: suPassword,
        mobile_no: mobileVerify
      }
    }).then(async (response) => {
      const status = response.status;
      if (status === 200) {
        const token = response.data.token;
        const userData = response.data.userData;
        try {
          await AsyncStorage.setItem('token', `${token}`);
        } catch (error) {
          console.log('Error Saving');
        }
        signUpUserSuccess(dispatch, token, userData);
      } else {
        dispatch({ type: SU_USER_FAILURE });
      }
    }).catch((error) => {
        console.log(error);
        dispatch({ type: SU_USER_FAILURE });
    });
  };
};

const signUpUserSuccess = (dispatch, token, userData) => {
  dispatch({
    type: SU_USER_SUCCESS,
    token,
    userData
  });
  Actions.push('mainScreen');
};
