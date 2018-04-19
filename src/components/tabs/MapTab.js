import React, { Component } from 'react';
import {
  StyleSheet,
  FlatList
} from 'react-native';
import {
  Container,
  Spinner,
  View
} from 'native-base';
import { MapView, Location } from 'expo';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import {
  responsiveHeight,
  responsiveWidth,
  // responsiveFontSize
} from 'react-native-responsive-dimensions';
import {
//  variables,
  // mixins,
  colors,
} from '../../styles';
import { getMapViewCategory } from '../../actions';
import MapOfferCard from '../modules/MapOfferCard';

const GEOLOCATION_OPTIONS = { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 };
const ASPECT_RATIO = responsiveWidth(100) / responsiveHeight(100);
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
// let id = 0;
//
function randomColor() {
 return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

class MapTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      region: null,
    };
    this.autoBind(
      'onEndReached',
      'onRefresh',
      'renderRow',
    );
  }
  async componentWillMount() {
    // Location.watchPositionAsync(GEOLOCATION_OPTIONS, this.locationChanged);
    const location = await Location.getCurrentPositionAsync(GEOLOCATION_OPTIONS);
    const region = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    };
    this.setState({ region });
    console.log(JSON.stringify(location));

    const {
      token,
      categorySelected,
      distance,
      typeSelected,
      coords,
      pagination
    } = this.props;
    const { page } = pagination;
    console.log('Mounting Map Tab');
    this.props.getMapViewCategory({
      token,
      categorySelected,
      distance,
      typeSelected,
      coords,
      page
    });
  }
  onEndReached() {
    const {
      token,
      categorySelected,
      distance,
      typeSelected,
      coords,
      pagination
    } = this.props;
    const { page, perPage, pageCount, totalCount } = pagination;
    const lastPage = totalCount <= ((page - 1) * perPage) + pageCount;
    if (!pagination.mapViewCategoryOffersLoading && !lastPage) {
      this.props.getMapViewCategory(
        token,
        categorySelected,
        distance,
        typeSelected,
        coords,
        page + 1
      );
    }
  }
  onRefresh() {
    const {
      token,
      categorySelected,
      distance,
      typeSelected,
      coords,
    } = this.props;
    const page = 1;
    this.props.getMapViewCategory({
      token,
      categorySelected,
      distance,
      typeSelected,
      coords,
      page
    });
  }
  autoBind(...methods) {
      methods.forEach(method => {
        this[method] = this[method].bind(this);
        return this[method];
      });
  }
  keyExtractor = (item, index) => { return index; };
  renderRow(offerDetails) {
    // console.log('Rendering Row');
    // console.log(offerDetails);
    // console.log(offerDetails);
    const { item } = offerDetails;
    const { pagination } = this.props;
    if (pagination.mapViewCategoryOffersLoading) {
      return (
        <LoadingIndicator loading={pagination.mapViewCategoryOffersLoading} />);
    }
      return (
        <View>
          <MapOfferCard offerDetails={item} />
        </View>
      );
  }
  render() {
    const {
      containerStyle,
      mapStyle
    } = styles;
    const { mapViewCategoryOffers } = this.props;
    return (
      <Container style={containerStyle}>
        <View style={{ backgroundColor: 'black', flex: 1 }} >
          <View style={{ flex: 1 }} >
            <MapView
              showsUserLocation
              provider={this.props.provider}
              style={mapStyle}
              initialRegion={this.state.region}
            >
              { this.props.markers.map(marker => {
                return (
                  <MapView.Marker
                    key={marker.key}
                    coordinate={marker.coordinate}
                    pinColor={randomColor()}
                    onPress={() => {
                      Actions.push('offerDetailScreen', { offerId: marker.offerId });
                    }}
                  />
                );
              })}
            </MapView>
          </View>
            <View
              style={{
                backgroundColor: '#1E2D3E',
                alignItems: 'center',
                flex: 1, }}
            >
              <View
                style={{
                  width: responsiveWidth(100),
                  backgroundColor: '#1E2D3E',
                  height: responsiveHeight(1) }}
              />
              <FlatList
                automaticallyAdjustContentInsets={false}
                data={mapViewCategoryOffers}
                refreshing={false}
                renderItem={this.renderRow}
                keyExtractor={this.keyExtractor}
                onRefresh={() => { return this.onRefresh(); }}
                onEndReached={() => { return this.onEndReached(); }}
              />
            </View>
        </View>
      </Container>
    );
  }
}

MapTab.propTypes = {
  provider: MapView.ProviderPropType,
};
const LoadingIndicator = ({ loading }) => {
 return (
   loading ? (
     <View style={styles.loadingStyle}>
       <Spinner
       // style={{ height: responsiveHeight(25) }}
       color='black'
       />
     </View>
   ) : null
 );
};
const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: colors.white,
  },
  mapStyle: {
    ...StyleSheet.absoluteFillObject,
  },
});
function mapStateToProps({ main, categories, user }) {
    const { location } = main;
    const { latitude, longitude } = location;
    const coords = { latitude, longitude };
    const { category, mapview } = categories;
    const { token } = user;
    return {
        ...mapview,
        ...category,
        coords,
        token
    };
}
function mapDispatchToProps(dispatch) {
    return {
      getMapViewCategory: ({
        token,
        categorySelected,
        distance,
        typeSelected,
        coords,
        page
      }) => {
      return dispatch(getMapViewCategory({
        token,
        categorySelected,
        distance,
        typeSelected,
        coords,
        page
      }));
    },
    };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MapTab);
