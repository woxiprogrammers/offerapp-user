import { combineReducers } from 'redux';
import NearbyOffersReducers from './NearbyOffersReducers';
import SwipperReducers from './SwipperReducers';
import LocationReducers from './LocationReducers';

export default combineReducers({
  nearbyoffers: NearbyOffersReducers,
  swiper: SwipperReducers,
  location: LocationReducers,
});
