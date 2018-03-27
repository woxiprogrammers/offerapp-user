import { combineReducers } from 'redux';
import TopOffersReducers from './TopOffersReducers';
import SwipperReducers from './SwipperReducers';
import LocationReducers from './LocationReducers';

export default combineReducers({
  topoffers: TopOffersReducers,
  swiper: SwipperReducers,
  location: LocationReducers
});
