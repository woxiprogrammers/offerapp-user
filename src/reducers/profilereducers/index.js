import { combineReducers } from 'redux';
import ProfileEditReducers from './ProfileEditReducers';
import ChangePasswordReducers from './ChangePasswordReducers';
import ChangeMobileReducers from './ChangeMobileReducers';

export default combineReducers({
  profileedit: ProfileEditReducers,
  changepassword: ChangePasswordReducers,
  changemobile: ChangeMobileReducers
});
