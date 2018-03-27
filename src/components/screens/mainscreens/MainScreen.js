import React from 'react';
import { StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import {
  Container,
  Header,
  Content,
  Spinner,
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
import Swiper from 'react-native-swiper';
import { Actions } from 'react-native-router-flux';
import {
  responsiveHeight,
  // responsiveWidth,
  responsiveFontSize
} from 'react-native-responsive-dimensions';
import {
  normalize,
  variables,
  // mixins,
  colors,
} from '../../../styles';
import SmallOfferCard from '../../modules/SmallOfferCard';
import loading from '../../../assets/images/loading.gif';
import { getLocation, getSwipper } from '../../../actions';

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
          <Image style={styles.loadingImage} source={loading} />
        </View>
      }
      </TouchableOpacity>
  </View>);
};

class MainScreen extends React.Component {

  constructor(props) {
    super(props);
    this.autoBind('loadHandle');
  }
  componentWillMount() {
    this.props.getLocation();
    this.props.getSwipper();
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
  renderSwiper() {
    const { swiperStyle } = styles;
    if (this.props.locationLoading) {
      return (
        <Spinner
          style={{ height: responsiveHeight(25) }}
          color='black'
        />);
    }
    console.log('locationLoading is :');
    console.log(this.props.locationLoading);
    console.log('Image List is :');
    console.log(this.props.imageList);
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
                  style={{ color: 'black', fontSize: responsiveFontSize(4) }}
                  ios='ios-pin'
                  android="md-pin"
                />
                <Text style={{ fontSize: responsiveFontSize(3) }}> {this.props.location}</Text>
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
                >Top 5 Offers</Text>
              </View>
              <ScrollView
                showsHorizontalScrollIndicator={false}
                horizontal
                style={{ paddingLeft: 10 }}
              >
                <SmallOfferCard />
                <SmallOfferCard />
                <SmallOfferCard />
              </ScrollView>
            </View>
          </View>
        </Content>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
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


function mapStateToProps({ main }) {
    const { topoffers, swiper, location } = main;
    return {
        ...topoffers,
        ...swiper,
        ...location
    };
}


function mapDispatchToProps(dispatch) {
    return {
        getLocation: () => { return dispatch(getLocation()); },
        getSwipper: () => { return dispatch(getSwipper()); },
    };
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MainScreen);
