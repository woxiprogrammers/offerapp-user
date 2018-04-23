import { combineReducers } from 'redux';
import LoginReducers from './LoginReducers';
import MainReducers from './mainreducers';
import GroupsReducers from './groupsreducers';
import WishListReducers from './wishlistreducers';
import InterestedReducers from './interestedreducers';
import OfferReducers from './OfferReducers';
import CategoriesReducers from './categoryreducers';
import ARReducers from './arreducers';
import DrawerReducers from './DrawerReducers';

export default combineReducers({
  ar: ARReducers,
  drawer: DrawerReducers,
  user: LoginReducers,
  main: MainReducers,
  groups: GroupsReducers,
  wishlist: WishListReducers,
  interested: InterestedReducers,
  offer: OfferReducers,
  categories: CategoriesReducers
});
