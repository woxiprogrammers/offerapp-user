import React from 'react';
import { Text, View, Dimensions } from 'react-native';
import {
  Camera,
  Permissions,
  Location,
  Gyroscope
} from 'expo';
import {
  Button
} from 'native-base';
import { connect } from 'react-redux';
import { arHandle, updateGyroData, updateX, getARViewCategory } from '../../actions';

const { height, width } = Dimensions.get('window');

class ARTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      userLocation: {},
      initialBearing: null,
      bearing: null,
      hasCameraPermission: null,
      type: Camera.Constants.Type.back,
    };
  }
  async componentWillMount() {
    console.log('Mounting AR Tab');
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
    this.getLocationAsync()
      .then(async (resp) => {
        if (resp.location) {
          const { latitude, longitude } = this.state.userLocation;
          const coords = { latitude, longitude };
          const {
            token,
            categorySelected,
            distance,
            typeSelected
          } = this.props;
          const page = 1;
          this.props.getARViewCategory({
            token,
            categorySelected,
            distance,
            typeSelected,
            coords,
            page
          });
          Location.watchHeadingAsync(({ trueHeading }) => {
            const { bearing } = this.state;
            const difference = bearing - trueHeading;
            this.setState({
              bearing: trueHeading
            });
            // console.log('watchHeadingAsync');
            if (difference >= 180 || difference <= -180) {
              const newDifference = difference >= 180 ? difference - 360 : difference + 360;
              this.props.updateX(newDifference);
            } else if (difference >= 0.8 || difference <= -0.8) {
              this.props.updateX(difference);
            }
            // if (!this.props.arViewCategoryOffersLoading && !this.state.loaded) {
            //   this.handleARStart();
            // }
          });
        }
      });
  }
  componentDidMount() {
    console.log('=============================++');
    // console.log(this.props);
    // console.log('=============================!!');
    // console.log(this.state);
    // console.log('=============================++');
    // console.log('componentDidMount');
  }
  componentWillUnmount() {
    Gyroscope.removeAllListeners();
    // this.props.clearARObjects();
  }
  getLocationAsync = async () => {
    let location = null;
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        message: 'Permission to access location was denied',
      });
    } else {
      console.log('getLocationAsync');
      location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });
      const initBearing = await Location.getHeadingAsync();
      await this.setState({ initialBearing: initBearing.trueHeading });
      await this.setState({ bearing: initBearing.trueHeading });
      await this.setState({ userLocation: location.coords });
      console.log('initiaBearing : ');
      console.log(this.state.initiaBearing);
      console.log('bearing : ');
      console.log(this.state.bearing);
      console.log('userLocation : ');
      console.log(this.state.userLocation);
      Location.watchPositionAsync({
        enableHighAccuracy: true,
        timeInterval: 1000 }, (coords) => {
          // console.log('watchPositionAsync');
          const { userLocation, loaded } = this.state;
          if (userLocation.accuracy > coords.accuracy && loaded === true) {
          this.setState({ userLocation: coords });
          // this.handleARStart();
          }
      });
    }
    return {
      location
    };
  };
  ARButton = () => {
    const { arOn } = this.props;
    if (arOn) {
      return (
        <Button
          full
          onPress={() => {
            this.props.arHandle(!arOn);
            this.ARStop();
          }}
        >
        <Text>Stop AR</Text>
        </Button>
      );
    }
    return (
      <Button
        full
        onPress={() => {
          this.props.arHandle(!arOn);
          this.ARStart();
        }}
      >
        <Text>Start AR</Text>
      </Button>
    );
  }
  ARStart = () => {
    Gyroscope.removeAllListeners();
    Gyroscope.setUpdateInterval(1000);
    Gyroscope.addListener((result) => {
      this.props.updateGyroData(result);
    });
  }
  ARStop = () => {
    Gyroscope.removeAllListeners();
  }
  autoBind(...methods) {
      methods.forEach(method => {
        this[method] = this[method].bind(this);
        return this[method];
      });
  }

  render() {
    const {
      hasCameraPermission,
      bearing
    } = this.state;
    if (hasCameraPermission === null) {
      return <Text>Camera Null</Text>;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    }
      // console.log('Camera!!');
      return (
          <Camera style={{ height, width, flex: 1 }} type={this.state.type}>
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
              >-----{ Math.round(bearing) }-----</Text>
            </View>
            <View
              style={{
                flex: 1,
                backgroundColor: 'rgba(226, 229, 239, 0.3)',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Text>AR</Text>
            </View>
            <View
              style={{
                backgroundColor: 'rgba(226, 229, 239, 0.3)',
              }}
            >{this.ARButton()}
            </View>
          </Camera>
      );
  }
}
function mapStateToProps({ main, categories, user }) {
    const { location } = main;
    const { latitude, longitude } = location;
    const coords = { latitude, longitude };
    const { category, arview, arreducers } = categories;
    const { token } = user;
    return {
        ...arreducers,
        ...arview,
        ...category,
        coords,
        token
    };
}
function mapDispatchToProps(dispatch) {
    return {
      updateGyroData: (data) => { return dispatch(updateGyroData(data)); },
      arHandle: (arOn) => { return dispatch(arHandle(arOn)); },
      updateX: (difference) => { return dispatch(updateX(difference)); },
      getARViewCategory: (
        token,
        categorySelected,
        distance,
        typeSelected,
        page
        ) => {
        return dispatch(getARViewCategory(
          token,
          categorySelected,
          distance,
          typeSelected,
          page
          ));
      },
    };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ARTab);
