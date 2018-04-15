import { combineReducers } from 'redux';
import LoginReducers from './LoginReducers';
import MainReducers from './mainreducers';
import GroupsReducers from './groupsreducers';
import WishListReducers from './wishlistreducers';
import InterestedReducers from './interestedreducers';

export default combineReducers({
  user: LoginReducers,
  main: MainReducers,
  groups: GroupsReducers,
  wishlist: WishListReducers,
  interested: InterestedReducers,
  
});
