import React, { Component } from 'react';
import {
  StyleSheet,
  FlatList,
  ScrollView
} from 'react-native';
import {
  Container,
  Spinner,
  View,
  Icon,
  Text
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
      'renderLoading',
      'renderMapOffers'
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
  onEndReached() {
    const {
      token,
      categorySelected,
      distance,
      typeSelected,
      coords,
      pagination
    } = this.props;
    const { perPage, pageCount, totalCount } = pagination;
    let { page } = pagination;
    const lastPage = totalCount <= ((page - 1) * perPage) + pageCount;
    if (!pagination.mapViewCategoryOffersLoading && !lastPage) {
      page += 1;
      this.props.getMapViewCategory({
        token,
        categorySelected,
        distance,
        typeSelected,
        coords,
        page
      });
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
  randomColor = () => {
   return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }
  autoBind(...methods) {
      methods.forEach(method => {
        this[method] = this[method].bind(this);
        return this[method];
      });
  }
  keyExtractor = (item, index) => { return index.toString(); };
  renderLoading() {
    const { pagination } = this.props;
    if (pagination.mapViewCategoryOffersLoading) {
      return (
        <LoadingIndicator loading={pagination.mapViewCategoryOffersLoading} />
      );
    }
  }
  renderRow(offerDetails) {
    const { item } = offerDetails;
    return (
      <View>
        <MapOfferCard offerDetails={item} />
      </View>
    );
  }
  renderMapOffers() {
    const { whiteStyle, mapOffersErrorStyle } = styles;
    const { mapViewCategoryOffers, pagination } = this.props;
    if (pagination.mapViewCategoryOffersLoading) {
      return (
        <View
          showsVerticalScrollIndicator={false}
          style={{
            backgroundColor: '#1E2D3E',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <View
            style={{
              width: responsiveWidth(100),
              backgroundColor: '#1E2D3E',
              height: responsiveHeight(1),
              alignItems: 'center',
              justifyContent: 'center'
            }}
          />
          {this.renderLoading()}
        </View>
      );
    }
    if (mapViewCategoryOffers.length === 0) {
      return (
        <View style={mapOffersErrorStyle}>
          <Icon style={whiteStyle}active name='ionitron' />
          <Text style={whiteStyle}>Sorry! No Offers to Show </Text>
        </View>);
    }
    return (<ScrollView
      showsVerticalScrollIndicator={false}
      style={{
        backgroundColor: '#1E2D3E',
        flex: 1, }}
    >
      <View
        style={{
          width: responsiveWidth(100),
          backgroundColor: '#1E2D3E',
          height: responsiveHeight(1) }}
      />
      <FlatList
        style={{ flex: 1 }}
        data={mapViewCategoryOffers}
        refreshing={false}
        scrollEnabled={false}
        renderItem={this.renderRow}
        keyExtractor={this.keyExtractor}
        onRefresh={() => { return this.onRefresh(); }}
        onEndReached={() => { return this.onEndReached(); }}
      />
      {this.renderLoading()}
    </ScrollView>);
  }
  render() {
    const {
      containerStyle,
      mapStyle
    } = styles;
    return (
      <Container style={containerStyle}>
        <View style={{ backgroundColor: 'white', flex: 1 }} >
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
                    pinColor={this.randomColor()}
                    onPress={() => {
                      Actions.push('offerDetailScreen', { offerId: marker.offerId });
                    }}
                  />
                );
              })}
            </MapView>
          </View>
            {this.renderMapOffers()}
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
       color='white'
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
  mapOffersErrorStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1E2D3E',
  },
  whiteStyle: {
    color: colors.white
  },
  loadingStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
