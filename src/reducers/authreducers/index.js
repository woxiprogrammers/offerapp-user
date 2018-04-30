import { combineReducers } from 'redux';
import ForgotPasswordReducers from './ForgotPasswordReducers';
import SignUpReducers from './SignUpReducers';

export default combineReducers({
  forgotpassword: ForgotPasswordReducers,
  signup: SignUpReducers
});
