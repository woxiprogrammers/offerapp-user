import { combineReducers } from 'redux';
import AROffersReducers from './AROffersReducers';
import ARReducers from './ARReducers';

export default combineReducers({
  aroffers: AROffersReducers,
  arreducers: ARReducers
});
