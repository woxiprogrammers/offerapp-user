import { combineReducers } from 'redux';
import LoginReducers from './LoginReducers';
import MainReducers from './mainreducers';

export default combineReducers({
  user: LoginReducers,
  main: MainReducers,
});
