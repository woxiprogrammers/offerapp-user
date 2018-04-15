import React from 'react';
import {
  StyleSheet,
  Image,
  ScrollView,
  ListView,
  RefreshControl,
  TouchableOpacity
} from 'react-native';
import {
  Container,
  Content,
  Spinner,
  Header,
  Button,
  Right,
  Title,
  Left,
  View,
  Icon,
  Body,
  Text,
} from 'native-base';
import { connect } from 'react-redux';
import { Location } from 'expo';
import Swiper from 'react-native-swiper';
import { Actions } from 'react-native-router-flux';
import MarqueeText from 'react-native-marquee';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from 'react-native-responsive-dimensions';
import {
  normalize,
  variables,
  // mixins,
  colors,
} from '../../../styles';
import SmallOfferCard from '../../modules/SmallOfferCard';
import swiperLoading from '../../../assets/images/loading.gif';
import { getLocation, getSwipper, getNearbyOffers } from '../../../actions';

const GEOLOCATION_OPTIONS = { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 };

const Slide = props => {
  return (
    <View style={styles.slide}>
      <TouchableOpacity
        onPress={() => { console.log(props.offerId); }}
        style={{ height: responsiveHeight(25) }}
      >
      <Image
        onLoad={props.loadHandle.bind(null, props.i)}
        style={styles.image}
        source={{ uri: props.uri }}
      />
      {
        !props.loaded && <View style={styles.loadingView}>
          <Image style={styles.loadingImage} source={swiperLoading} />
        </View>
      }
      </TouchableOpacity>
  </View>);
};

class MainScreen extends React.Component {

  constructor(props) {
    super(props);
    this.autoBind(
      'loadHandle',
      'renderSwiper',
      'onEndReached',
      'onRefresh',
      'renderRow'
    );
  }
  async componentWillMount() {
    const { token } = this.props;
    if (!this.props.fromChangeLocation) {
    const location = await Location.getCurrentPositionAsync(GEOLOCATION_OPTIONS);
    const latitude = location.coords.latitude;
    const longitude = location.coords.longitude;
    const coords = { latitude, longitude };
    await this.props.getLocation(token, coords);
    }
    const { latitude, longitude } = this.props;
    const locationName = this.props.locationName;
    const userLocation = { locationName, latitude, longitude };
    this.props.getSwipper(token, userLocation);
  }
  onEndReached() {
    const {
      locationName,
      pagination,
      longitude,
      latitude,
      token,
    } = this.props;
    const userLocation = { locationName, latitude, longitude };
    const { page, perPage, pageCount, totalCount } = pagination;
    const lastPage = totalCount <= ((page - 1) * perPage) + pageCount;
    if (!pagination.paginationLoading && !lastPage) {
      this.props.getNearbyOffers(token, page + 1, userLocation);
    }
  }
  onRefresh() {
    const {
      locationName,
      longitude,
      latitude,
      token,
    } = this.props;
    const userLocation = { locationName, latitude, longitude };
    this.props.getNearbyOffers(token, 1, userLocation);
  }

  autoBind(...methods) {
      methods.forEach(method => {
        this[method] = this[method].bind(this);
        return this[method];
      });
  }
  loadHandle(i) {
      const loadQueue = this.props.loadQueue;
      loadQueue[i] = 1;
      this.setState({
        loadQueue
      });
  }
  renderRow(offerDetails) {
    if (offerDetails.type === 'Loading') {
      return (
        <LoadingIndicator loading={offerDetails.loading} />);
    }
      return (
        <SmallOfferCard offerDetails={offerDetails} />
      );
  }
  renderSwiper() {
    const { swiperStyle } = styles;
    if (this.props.locationLoading) {
      return (
        <Spinner
          style={{ height: responsiveHeight(25) }}
          color='black'
        />);
    }
    return (
      <Swiper autoplay style={swiperStyle} >
        {
        this.props.imageList.map((item, i) => {
          return (
            <Slide
              loadHandle={this.loadHandle}
              loaded={!!this.props.loadQueue[i]}
              uri={item}
              i={i}
              offerId={this.props.offerId[i]}
              key={i}
            />
            );
        })}
      </Swiper>);
  }

  render() {
    const {
      containerStyle,
      locationStyle,
      headerStyle,
      // swiperStyle,
      titleStyle
    } = styles;
    const { posts, pagination, ds } = this.props;
    const loading = {
      type: 'Loading',
      loading: pagination.paginationLoading
    };
    const nearbyoffers = ds.cloneWithRows([...posts, loading]);

    return (
      <Container style={containerStyle}>
        <Header
          style={headerStyle}
          iosBarStyle='light-content'
        >
          <Left>
            <Button transparent style={{ padding: 0 }} onPress={Actions.drawerOpen}>
              <Icon style={{ color: 'white' }} ios='ios-menu' android="md-menu" />
            </Button>
          </Left>
          <Body>
            <Title style={titleStyle}>MAIN SCREEN</Title>
          </Body>
          <Right />
        </Header>
        <Content style={{ paddingTop: normalize.normalize(5) }}>
          <View style={{ flex: 1 }}>
            <View style={locationStyle}>
              <View>
                <Text style={{ fontSize: responsiveFontSize(1.5) }}>YOUR LOCATION</Text>
              </View>
              <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                <Icon
                  style={{
                    paddingRight: responsiveWidth(2),
                    color: 'black',
                    fontSize: responsiveFontSize(4) }}
                  ios='ios-pin'
                  android="md-pin"
                />
                <MarqueeText
                  style={{
                    fontSize: responsiveFontSize(3),
                    width: responsiveWidth(65) }}
                  duration={4000}
                  marqueeOnStart
                  loop
                  marqueeDelay={1000}
                  marqueeResetDelay={1000}
                >{this.props.locationName}</MarqueeText>
                <Right>
                  <Button
                    transparent
                    onPress={() => { Actions.push('changeLocationScreen'); }}
                  >
                    <Text
                      style={{
                        alignSelf: 'center',
                        fontSize: responsiveFontSize(1.5),
                        color: colors.headerColor,
                       }}
                    >CHANGE</Text>
                  </Button>
                </Right>
              </View>
            </View>
            <View>
              {this.renderSwiper()}
            </View>
            <View
              style={{
                backgroundColor: '#1C2A3A',
                height: variables.SCREEN_HEIGHT * 0.4,
                marginTop: normalize.normalize(5),
                paddingBottom: normalize.normalize(10) }}
            >
              <View>
                <Text
                  style={{
                    paddingLeft: normalize.normalize(9),
                    paddingTop: normalize.normalize(9),
                    color: colors.white,
                    fontSize: responsiveFontSize(2.5) }}
                >Offers Nearby Me</Text>
              </View>
              <ScrollView
                showsHorizontalScrollIndicator={false}
                horizontal
                style={{ paddingLeft: 10 }}
              >
              <ListView
                horizontal
                enableEmptySections
                automaticallyAdjustContentInsets={false}
                dataSource={nearbyoffers}
                renderRow={row => { return this.renderRow(row); }}
                refreshControl={
                  <RefreshControl
                    refreshing={false}
                    onRefresh={() => { return this.onRefresh(); }}
                  />
                }
                onEndReached={() => { return this.onEndReached(); }}
              />
              </ScrollView>
            </View>
          </View>
        </Content>
      </Container>
    );
  }
}
const LoadingIndicator = ({ loading }) => {
 return (
  loading ? (
    <View style={styles.loadingStyle}>
      <Spinner
        style={{ paddingLeft: responsiveWidth(45), height: responsiveHeight(25) }}
        color='white'
      />
    </View>
  ) : null
);
};
const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: colors.white,
    marginTop: 20
  },
  loadingStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
    width: variables.SCREEN_WIDTH * 0.6
  },
  locationStyle: {
    height: variables.SCREEN_HEIGHT * 0.1,
    backgroundColor: '#EFF2F7',
    paddingLeft: 10,
    paddingTop: normalize.normalize(2)
  },
  swiperStyle: {
    height: variables.SCREEN_HEIGHT * 0.25
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },
  image: {
    width: variables.SCREEN_WIDTH,
    flex: 1,
    backgroundColor: 'transparent'
  },
  loadingView: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,.5)'
  },
  loadingImage: {
    width: 60,
    height: 60
  }
});


function mapStateToProps({ main, user }) {
    const { nearbyoffers, swiper, location } = main;
    const { token } = user;
    return {
        ...nearbyoffers,
        ...swiper,
        ...location,
        token
    };
}


function mapDispatchToProps(dispatch) {
    return {
        getLocation: (token, coords) => {
          return dispatch(getLocation(token, coords));
        },
        getNearbyOffers: (token, page, userLocation) => {
          return dispatch(getNearbyOffers(token, page, userLocation));
        },
        getSwipper: (token, userLocation) => { return dispatch(getSwipper(token, userLocation)); },
    };
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MainScreen);
