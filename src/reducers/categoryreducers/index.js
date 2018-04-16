import { combineReducers } from 'redux';
import CategoryReducers from './CategoryReducers';
// import MapViewReducers from './MapViewReducers';
import ListingViewReducers from './ListingViewReducers';
// import ARViewReducers from './ARViewReducers';

export default combineReducers({
  category: CategoryReducers,
  // mapview: MapViewReducers,
  listingview: ListingViewReducers,
  // arview: ARViewReducers
});
