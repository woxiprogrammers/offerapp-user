import React, { Component } from 'react';
import {
  StyleSheet,
  ScrollView
} from 'react-native';
import {
  Container,
  // ListItem,
  // Content,
  // Header,
  // Button,
  // Right,
  // Title,
  // Left,
  // List,
  View,
  // Icon,
  // Body,
  // Text,
} from 'native-base';
import { MapView, Location } from 'expo';
// import { Actions } from 'react-native-router-flux';
import {
  responsiveHeight,
  responsiveWidth,
  // responsiveFontSize
} from 'react-native-responsive-dimensions';
import {
  variables,
  // mixins,
  colors,
 } from '../../styles';
import MapOfferCard from '../modules/MapOfferCard';

const GEOLOCATION_OPTIONS = { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 };
const ASPECT_RATIO = variables.SCREEN_WIDTH / variables.SCREEN_HEIGHT;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
let id = 0;

function randomColor() {
 return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

export default class MapTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      region: null,
      markers: [
        {
          coordinate: { latitude: 18.507461, longitude: 73.805785 },
          key: id++,
          color: randomColor()
        },
        {
          coordinate: { latitude: 18.551284, longitude: 73.774316 },
          key: id++,
          color: randomColor()
        },
         {
          coordinate: { latitude: 18.458852, longitude: 73.855840 },
          key: id++,
          color: randomColor()
        }
      ],
    };
  }
   //this.setState({ location, region });
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
   }

  render() {
    const {
      containerStyle,
      mapStyle
    } = styles;
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
              { this.state.markers.map(marker => {
                return (
                  <MapView.Marker
                    key={marker.key}
                    coordinate={marker.coordinate}
                    pinColor={marker.color}
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
              <ScrollView
                showsVerticalScrollIndicator={false}
                style={{ width: responsiveWidth(100) }}
              >
                <MapOfferCard />
                <MapOfferCard />
                <MapOfferCard />
              </ScrollView>
            </View>
        </View>
      </Container>
    );
  }
}

MapTab.propTypes = {
  provider: MapView.ProviderPropType,
};

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: colors.white,
  },
  mapStyle: {
    ...StyleSheet.absoluteFillObject,
  },
});
