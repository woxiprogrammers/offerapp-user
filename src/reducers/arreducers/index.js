import { combineReducers } from 'redux';
import AROffersReducers from './AROffersReducers';
import ARReducers from './ARReducers';
import ARListingReducers from './ARListingReducers';

export default combineReducers({
  aroffers: AROffersReducers,
  arreducers: ARReducers,
  arlisting: ARListingReducers,
});
