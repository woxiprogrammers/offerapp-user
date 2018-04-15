import { combineReducers } from 'redux';
import GroupListReducers from './GroupListReducers';
import GroupReducers from './GroupReducers';

export default combineReducers({
  grouplist: GroupListReducers,
  group: GroupReducers
});
