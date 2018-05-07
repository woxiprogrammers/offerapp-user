import React from 'react';
import {
  StyleSheet,
  Image,
  ScrollView,
  FlatList,
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
import { Location, Permissions } from 'expo';
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
  //variables,
  // mixins,
  colors,
} from '../../../styles';
import SmallOfferCard from '../../modules/SmallOfferCard';
import swiperLoading from '../../../assets/images/loading.gif';
import { getLocation, getSwipper, getNearbyOffers } from '../../../actions';
import { IMAGEURL } from '../../../constants';

const GEOLOCATION_OPTIONS = { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 };

const Slide = props => {
  return (
    <View style={styles.slide}>
      <TouchableOpacity
        onPress={() => { Actions.push('offerDetailScreen', { getOffer: props.offerId }); }}
        style={{ height: responsiveHeight(25) }}
      >
      <Image
        onLoad={props.loadHandle.bind(null, props.i)}
        style={styles.image}
        source={{ uri: `${IMAGEURL}${props.uri}` }}
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
      'renderRow'
    );
    this.state = ({
      message: '',
    });
  }
  async componentWillMount() {
    const { token } = this.props;
    if (!this.props.fromChangeLocation) {
      const { status } = await Permissions.askAsync(Permissions.LOCATION);
      if (status !== 'granted') {
        this.setState({
          message: 'Permission to access location was denied',
        });
      } else {
      const location = await Location.getCurrentPositionAsync(GEOLOCATION_OPTIONS);
      const latitude = location.coords.latitude;
      const longitude = location.coords.longitude;
      const coords = { latitude, longitude };
      await this.props.getLocation(token, coords);
    }
    }
    const { latitude, longitude } = this.props;
    const coords = { latitude, longitude };
    this.props.getSwipper({ token, coords });
    const page = 1;
    await this.props.getNearbyOffers({ token, page, coords });
  }
  onEndReached() {
    const {
      pagination,
      longitude,
      latitude,
      token,
    } = this.props;
    const coords = { latitude, longitude };
    const { perPage, pageCount, totalCount } = pagination;
    let { page } = pagination;
    const lastPage = totalCount <= ((page - 1) * perPage) + pageCount;
    if (!pagination.nearByOffersLoading && !lastPage) {
      page += 1;
      this.props.getNearbyOffers({ token, page, coords });
    }
  }

  autoBind(...methods) {
      methods.forEach(method => {
        this[method] = this[method].bind(this);
        return this[method];
      });
  }
  keyExtractor = (item, index) => { return index.toString(); };
  loadHandle(i) {
      const loadQueue = this.props.loadQueue;
      loadQueue[i] = 1;
      this.setState({
        loadQueue
      });
  }
  renderRow(offerDetails) {
    const { item } = offerDetails;
    const { pagination } = this.props;
    const loading = pagination.nearByOffersLoading;
    if (loading) {
      return (
        <LoadingIndicator loading={loading} />);
    }
      return (
        <SmallOfferCard offerDetails={item} />
      );
  }
  renderSwiper() {
    const { swiperStyle, swiperErrorStyle, whiteStyle } = styles;
    const { imageList, swiperError } = this.props;
    if (this.props.swiperLoading) {
      return (
        <Spinner
          style={swiperStyle}
          color='black'
        />);
    } else if (swiperError || imageList.length === 0) {
      return (
        <View style={swiperErrorStyle}>
          <Icon style={whiteStyle}active name='ionitron' />
          <Text style={whiteStyle}>Sorry! No Offers to Show </Text>
        </View>);
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

  renderNearByOffers() {
    const { pagination, nearByOffers } = this.props;
    const { loadingStyle, whiteStyle, nearbyErrorStyle } = styles;
    if (pagination.nearByOffersLoading) {
      return (
        <View style={loadingStyle}>
          <Spinner color='white' />
        </View>
      );
    } else if (nearByOffers.length === 0) {
      return (
        <View style={nearbyErrorStyle}>
          <Icon style={whiteStyle}active name='ionitron' />
          <Text style={whiteStyle}>Sorry! No Offers to Show </Text>
        </View>);
    }
   return (
     <ScrollView
       showsHorizontalScrollIndicator={false}
       horizontal
       style={{ paddingLeft: responsiveWidth(2.5) }}
     >
     <FlatList
       horizontal
       scrollEnabled={false}
       automaticallyAdjustContentInsets={false}
       data={nearByOffers}
       renderItem={this.renderRow}
       keyExtractor={this.keyExtractor}
       onEndReached={() => { return this.onEndReached(); }}
     />
     </ScrollView>
     );
  }
  render() {
    const {
      containerStyle,
      locationStyle,
      headerStyle,
      // swiperStyle,
      titleStyle,
      whiteStyle
    } = styles;
    const { locationName } = this.props;
    let locationNameMain = locationName;
    if (locationNameMain === '') {
      locationNameMain = 'You are Somewhere';
    }
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
          <Right>
            <Button
              onPress={() => { Actions.push('arScreen'); }}
              transparent
            >
              <Icon style={whiteStyle} name="eye" />
            </Button>
          </Right>
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
                >{locationNameMain}</MarqueeText>
                <Right>
                  {/*<Button
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
                  </Button>*/}
                </Right>
              </View>
            </View>
            <View>
              {this.renderSwiper()}
            </View>
            <View
              style={{
                backgroundColor: '#1C2A3A',
                height: responsiveHeight(40),
                marginTop: responsiveHeight(1),
                paddingBottom: responsiveHeight(2) }}
            >
              <View>
                <Text
                  style={{
                    paddingLeft: responsiveWidth(2.5),
                    paddingTop: responsiveHeight(2),
                    color: colors.white,
                    fontSize: responsiveFontSize(2.5) }}
                >Offers Nearby Me</Text>
              </View>
              {this.renderNearByOffers()}
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
    width: responsiveWidth(60)
  },
  locationStyle: {
    height: responsiveHeight(10),
    backgroundColor: '#EFF2F7',
    paddingLeft: 10,
    paddingTop: normalize.normalize(2)
  },
  swiperStyle: {
    height: responsiveHeight(25)
  },
  whiteStyle: {
    color: colors.white
  },
  swiperErrorStyle: {
    backgroundColor: '#1C2A3A',
    height: responsiveHeight(25),
    alignItems: 'center',
    justifyContent: 'center'
  },
  nearbyErrorStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },
  image: {
    width: responsiveWidth(100),
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
        getNearbyOffers: ({ token, page, coords }) => {
          return dispatch(getNearbyOffers({ token, page, coords }));
        },
        getSwipper: ({ token, coords }) => {
          return dispatch(getSwipper({ token, coords }));
        },
    };
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MainScreen);
