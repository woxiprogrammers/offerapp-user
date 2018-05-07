import React from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import {
  Gyroscope,
  Camera,
  Permissions,
  Location
} from 'expo';
import {
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity
} from 'react-native';
import {
  Container,
  // Content,
  Header,
  // Spinner,
  Button,
  Right,
  Title,
  Text,
  Left,
  View,
  Icon,
  Body,
} from 'native-base';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from 'react-native-responsive-dimensions';
import ARObject from '../../modules/ARObject';
import {
  addARObject,
  clearARObjects,
  updateGyroData,
  updateX,
  getAROffers
} from '../../../actions';
import { mixins, variables, colors } from '../../../styles';

const {
  height,
  width
} = Dimensions.get('window');


class ARScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      userLocation: {},
      initialBearing: null,
      bearing: null,
      watchHeading: null,
      watchPosition: null,
      hasCameraPermission: null,
      type: Camera.Constants.Type.back,
    };
    this.autoBind('handleARStart', 'calculateAngleDegress');
  }
  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });

    this.getLocationAsync()
      .then(async (resp) => {
        if (resp.location) {
          const { latitude, longitude } = this.state.userLocation;
          const coords = { latitude, longitude };
          const {
            token,
            distance,
            typeSelected
          } = this.props;
          const page = 1;
          this.props.getAROffers({
            token,
            distance,
            typeSelected,
            coords,
            page
          });
          const initBearing = await Location.getHeadingAsync();
          await this.setState({ initialBearing: initBearing.trueHeading });
          await this.setState({ bearing: initBearing.trueHeading });
          const watchHeading = await Location.watchHeadingAsync(({ trueHeading }) => {
            const { bearing } = this.state;
            const difference = bearing - trueHeading;
            if (difference >= 180 || difference <= -180) {
              const newDifference = difference >= 180 ? difference - 360 : difference + 360;
              this.props.updateX(newDifference);
            } else if (difference >= 0.8 || difference <= -0.8) {
              this.props.updateX(difference);
            }
            this.setState({
              bearing: trueHeading
            });
            if (!this.props.arOffersLoading && !this.state.loaded) {
              this.handleARStart();
            }
          });
          this.setState({ watchHeading });
        }
      });
  }
  componentDidMount() {
    this.props.clearARObjects();
    Gyroscope.removeAllListeners();
    Gyroscope.setUpdateInterval(50);
    Gyroscope.addListener((result) => {
      this.props.updateGyroData(result);
    });
  }
  componentWillUnmount() {
    const { watchHeading, watchPosition } = this.state;
    Gyroscope.removeAllListeners();
    this.props.clearARObjects();
    watchHeading.remove();
    watchPosition.remove();
  }
  getLocationAsync = async () => {
    let location = null;
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        message: 'Permission to access location was denied',
      });
    } else {
      location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });
      const watchPosition = await Location.watchPositionAsync({
        enableHighAccuracy: true,
        timeInterval: 1000 }, (coords) => {
          const { userLocation, loaded } = this.state;
          if (userLocation.accuracy > coords.accuracy && loaded === true) {
          this.setState({ userLocation: coords });
          this.handleARStart();
          }
      });
      this.setState({ watchPosition });
      this.setState({ userLocation: location.coords });
    }
    return {
      location
    };
  };
  handleARStart() {
      this.props.clearARObjects();
      const { initialBearing, userLocation } = this.state;
      const { arOffers } = this.props;

      arOffers.map((offer, i) => {
            const xDisplacementDegrees = this.calculateAngleDegress(userLocation, offer);
            const xDeviation = ((180 + xDisplacementDegrees) - Math.round(initialBearing)) / 10;
            // console.log(`initialBearing : ${initialBearing}`);
            // console.log(`xDisplacementDegrees: ${xDisplacementDegrees}`);
            console.log(`xDeviation ${i} : ${xDeviation}`);
            const startingPosY = (height / 2);
            const startingPosX = (width / 2) + (xDeviation * width);
            const offerCount = offer.offerCount;
            const sellerAddressId = offer.sellerAddressId;
            const sellerInfo = offer.sellerInfo;
            return this.props.addARObject({
                    startingPosX,
                    startingPosY,
                    offerCount,
                    sellerAddressId,
                    sellerInfo });
      });
      this.setState({ loaded: true });
  }
  calculateAngleDegress(userLocation, offerLocation) {
    // console.log('userLocation: ');
    // console.log(userLocation);
    // console.log('Longitude::');
    // console.log((userLocation.longitude - offerLocation.longitude));
    // console.log('Latitude::');
    // console.log((userLocation.latitude - offerLocation.latitude));

    return Math.atan2(
      (userLocation.longitude - offerLocation.longitude),
      (userLocation.latitude - offerLocation.latitude)) * (180 / Math.PI);
  }
  autoBind(...methods) {
      methods.forEach(method => {
        this[method] = this[method].bind(this);
        return this[method];
      });
  }
  renderAR = () => {
    const { bearing } = this.state;
    const { arOffersLoading } = this.props;
    if (!arOffersLoading) {
      return (
        <Camera style={styles.arView} type={this.state.type}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Text
            style={{
              color: 'rgba(226, 229, 239, 0.3)'
            }}
          >───────{ Math.round(bearing) }───────</Text>
        </View>
        <View style={styles.arDisplay}>
        {
          this.props.arObjects.map((arObj, i) => {
            return (
                <ARObject
                  key={`arObject-${i}`}
                  index={i}
                  startingPosX={arObj.startingPosX}
                  startingPosY={arObj.startingPosY}
                  offerCount={arObj.offerCount}
                  sellerAddressId={arObj.sellerAddressId}
                  sellerInfo={arObj.sellerInfo}
                />
            );
          })
        }
        </View>
        </Camera>
      );
    }
      return (
        <Camera style={styles.arView} type={this.state.type}>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
          <ActivityIndicator size='large' color='white' />
          </View>
        </Camera>
      );
  }
  render() {
    const {
      // dialogContentView,
      containerStyle,
      headerStyle,
      titleStyle
    } = styles;
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return (<Container style={containerStyle}>
      <Header
        style={headerStyle}
        iosBarStyle='light-content'
      >
        <Left style={{ flexDirection: 'row' }}>
          <Button transparent onPress={() => { Actions.popTo('mainScreen'); }}>
            <Icon style={{ color: 'white' }} ios='ios-arrow-back' android="md-arrow-back" />
          </Button>
          <Button transparent style={{ padding: 0 }} onPress={Actions.drawerOpen}>
            <Icon style={{ color: 'white' }} ios='ios-menu' android="md-menu" />
          </Button>
        </Left>
        <Body>
          <Title style={titleStyle}>AR Screen</Title>
        </Body>
        <Right />
        </Header>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
        <Text>Camera Null</Text>
        </View>
        <View style={{ flexDirection: 'row', height: responsiveHeight(8) }}>
          <TouchableOpacity
            onPress={() => { Actions.push('arFilterScreen', { }); }}
            style={{ flex: 1, alignSelf: 'center' }}
          >
            <Text style={{ alignSelf: 'center' }}>Filter</Text>
          </TouchableOpacity>
        </View>
      </Container>);
    } else if (hasCameraPermission === false) {
      return (<Container style={containerStyle}>
      <Header
        style={headerStyle}
        iosBarStyle='light-content'
      >
        <Left style={{ flexDirection: 'row' }}>
          <Button transparent onPress={() => { Actions.popTo('mainScreen'); }}>
            <Icon style={{ color: 'white' }} ios='ios-arrow-back' android="md-arrow-back" />
          </Button>
          <Button transparent style={{ padding: 0 }} onPress={Actions.drawerOpen}>
            <Icon style={{ color: 'white' }} ios='ios-menu' android="md-menu" />
          </Button>
        </Left>
        <Body>
          <Title style={titleStyle}>AR Screen</Title>
        </Body>
        <Right />
        </Header>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
        <Text>No Permission to Camera</Text>
        </View>
        <View style={{ flexDirection: 'row', height: responsiveHeight(8) }}>
          <TouchableOpacity
            onPress={() => { Actions.push('arFilterScreen', { }); }}
            style={{ flex: 1, alignSelf: 'center' }}
          >
            <Text style={{ alignSelf: 'center' }}>Filter</Text>
          </TouchableOpacity>
        </View>
      </Container>);
    }
    return (
      <Container style={containerStyle}>
      <Header
        style={headerStyle}
        iosBarStyle='light-content'
      >
        <Left style={{ flexDirection: 'row' }}>
          <Button transparent onPress={() => { Actions.popTo('mainScreen'); }}>
            <Icon style={{ color: 'white' }} ios='ios-arrow-back' android="md-arrow-back" />
          </Button>
          <Button transparent style={{ padding: 0 }} onPress={Actions.drawerOpen}>
            <Icon style={{ color: 'white' }} ios='ios-menu' android="md-menu" />
          </Button>
        </Left>
        <Body>
          <Title style={titleStyle}>AR Screen</Title>
        </Body>
        <Right />
        </Header>
        {this.renderAR()}
        <View style={{ flexDirection: 'row', height: responsiveHeight(8) }}>
          <TouchableOpacity
            onPress={() => { Actions.push('arFilterScreen', { }); }}
            style={{ flex: 1, alignSelf: 'center' }}
          >
            <Text style={{ alignSelf: 'center' }}>Filter</Text>
          </TouchableOpacity>
        </View>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
    root: {
        ...mixins.defaultPage,
        ...mixins.column
    },
    arDisplay: {
        position: 'absolute',
        top: 0,
        left: 0,
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0)',
    },
    containerStyle: {
      backgroundColor: colors.white,
      marginTop: 20
    },
    headerStyle: {
      paddingTop: 0,
      backgroundColor: colors.headerColor,
      borderBottomColor: colors.headerColor
    },
    titleStyle: {
      fontWeight: 'bold',
      color: colors.white,
      textAlign: 'center',
      fontSize: responsiveFontSize(3),
      width: responsiveWidth(60)
    },
    arView: {
        flex: 1,
        width: variables.SCREEN_WIDTH
    },

});

function mapStateToProps({ ar, user }) {
  const { aroffers, arreducers } = ar;
  const { token } = user;
    return {
        ...arreducers,
        ...aroffers,
        token
    };
}

function mapDispatchToProps(dispatch) {
    return {
        addARObject: (arObj) => { return dispatch(addARObject(arObj)); },
        clearARObjects: () => { return dispatch(clearARObjects()); },
        updateGyroData: (data) => { return dispatch(updateGyroData(data)); },
        updateX: (difference) => { return dispatch(updateX(difference)); },
        getAROffers: ({
          token,
          distance,
          typeSelected,
          coords,
          page
        }) => {
          return dispatch(getAROffers({
          token,
          distance,
          typeSelected,
          coords,
          page
        }));
      }
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ARScreen);
