import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Image
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
  Text,
  View,
  Icon,
  Body,
} from 'native-base';
import { MapView, } from 'expo';
import Swiper from 'react-native-swiper';
import { Actions } from 'react-native-router-flux';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from 'react-native-responsive-dimensions';
import PopupDialog, {
  DialogTitle,
  DialogButton,
  ScaleAnimation,
} from 'react-native-popup-dialog';
import swiperLoading from '../../../assets/images/loading.gif';
import {
  variables,
  // mixins,
  colors,
 } from '../../../styles';

const Slide = props => {
 return (<View style={styles.slide}>
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
 </View>);
};
const scaleAnimation = new ScaleAnimation();

const ASPECT_RATIO = variables.SCREEN_WIDTH / variables.SCREEN_HEIGHT;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
let id = 0;

function randomColor() {
 return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
 export default class OfferDetailScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      imgList: [
        'https://gitlab.pro/yuji/demo/uploads/2d5122a2504e5cbdf01f4fcf85f2594b/Mwb8VWH.jpg',
        'https://gitlab.pro/yuji/demo/uploads/4421f77012d43a0b4e7cfbe1144aac7c/XFVzKhq.jpg',
        'https://gitlab.pro/yuji/demo/uploads/576ef91941b0bda5761dde6914dae9f0/kD3eeHe.jpg'
      ],
      loadQueue: [0, 0, 0],
      region: {
        latitude: 18.551284,
        longitude: 73.774316,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      marker: {
          coordinate: { latitude: 18.551284, longitude: 73.774316 },
          key: id++,
          color: randomColor()
        },
    };
    this.loadHandle = this.loadHandle.bind(this);
  }
  showScaleAnimationDialog = () => {
    this.scaleAnimationDialog.show();
  }
  loadHandle(i) {
    const loadQueue = this.state.loadQueue;
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
    return (
      <Swiper style={swiperStyle}>
      {
        this.state.imgList.map((item, i) => {
          return (
          <Slide
            loadHandle={this.loadHandle}
            loaded={!!this.state.loadQueue[i]}
            uri={item}
            i={i}
            key={i}
          />);
          })
        }
        </Swiper>);
  }

  render() {
     const {
      offerDescriptionStyle,
      dialogContentView,
      offerStyle,
      containerStyle,
      headerStyle,
      titleStyle,
      mapStyle,
     } = styles;
     const { marker } = this.state;
     return (
      <Container style={containerStyle}>
      <Header
        style={headerStyle}
        iosBarStyle='light-content'
      >
        <Left style={{ flexDirection: 'row' }}>
          <Button transparent onPress={Actions.pop}>
            <Icon style={{ color: 'white' }} ios='ios-arrow-back' android="md-arrow-back" />
          </Button>
          <Button transparent style={{ padding: 0 }} onPress={Actions.drawerOpen}>
            <Icon style={{ color: 'white' }} ios='ios-menu' android="md-menu" />
          </Button>
        </Left>
        <Body>
          <Title style={titleStyle}>OfferDetail Screen</Title>
        </Body>
        <Right />
        </Header>
        <Content
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ }}
        >
          <PopupDialog
            width={responsiveWidth(90)}
            height={responsiveHeight(50)}
            dialogStyle={{ marginTop: responsiveHeight(-30) }}
            ref={(popupDialog) => {
              this.scaleAnimationDialog = popupDialog;
            }}
            dialogAnimation={scaleAnimation}
            dialogTitle={<DialogTitle title="Adidas Store, Kothrud" />}
            actions={[
              <DialogButton
                textContainerStyle={{ height: responsiveHeight(5) }}
                text="Close"
                onPress={() => {
                  this.scaleAnimationDialog.dismiss();
                }}
                key="button-1"
              />,
            ]}
          >
          <View style={dialogContentView}>
            <MapView
              showsUserLocation
              provider={this.props.provider}
              style={mapStyle}
              initialRegion={this.state.region}
            >
              <MapView.Marker
                key={marker.key}
                coordinate={marker.coordinate}
                pinColor={marker.color}
              />
            </MapView>
          </View>
          </PopupDialog>
          <View>
            {this.renderSwiper()}
          </View>
          <View style={offerStyle}>
            <View style={{ width: responsiveWidth(65) }}>
            <Text style={{ fontSize: responsiveFontSize(4) }}>BUY 1 GET 1 Free</Text>
            <Text style={{ fontSize: responsiveFontSize(2.5) }}>Adidas Store, Kothrud</Text>
            <Text
              style={{ fontSize: responsiveFontSize(1.7) }}
            >17, Near Krishma Complex, Late GA Kulkarni Path, Kothrud, Pune</Text>
            <Text
              style={{
                paddingTop: responsiveHeight(1),
                fontSize: responsiveFontSize(1.7)
              }}
            >Offer Validity : 7 th July, 2017</Text>
            </View>
            <View style={{ alignItems: 'center' }}>
              <Icon
                style={{
                  fontSize: responsiveFontSize(5),
                  color: 'black'
                }}
                ios='ios-call'
                android="md-call"
              />
              <View style={{ paddingTop: responsiveHeight(2) }}>
              <Button
                style={{
                  height: responsiveHeight(5),
                  width: responsiveWidth(25),
                  justifyContent: 'center',
                  backgroundColor: '#47525E'
                }}
                onPress={this.showScaleAnimationDialog}
              ><Text
                style={{
                  paddingLeft: responsiveWidth(1),
                  paddingRight: responsiveWidth(1),
                  fontSize: responsiveFontSize(1.7) }}
              >Show on Map</Text>
              </Button>
              </View>
            </View>
          </View>
          <View style={{ backgroundColor: '#47525E', height: responsiveHeight(1) }} />
          <View style={offerDescriptionStyle}>
            <Text style={{ fontSize: responsiveFontSize(1.7) }}>
            Get 5% cashback when you pay with Freecharge on Razorpay
            merchants Maximum cashback of Rs 50 Offer is valid once per user
            </Text>
          </View>
      </Content>
      <View
        style={{
          backgroundColor: colors.gray,
          flexDirection: 'row',
          height: responsiveHeight(10)
        }}
      >
      <TouchableOpacity
        onPress={() => { Actions.push('wishlistScreen'); }}
        style={{ flex: 1, alignSelf: 'center' }}
      >
          <Text style={{ alignSelf: 'center' }}>Add to Wish List</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => { Actions.push('interestedScreen'); }}
          style={{ flex: 1, alignSelf: 'center' }}
        >
          <Text style={{ alignSelf: 'center' }}>I am Interested</Text>
        </TouchableOpacity>
      </View>
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
  offerStyle: {
    backgroundColor: colors.lightGray,
    height: responsiveHeight(20),
    flexDirection: 'row',
    paddingLeft: responsiveWidth(5),
    paddingRight: responsiveWidth(5),
    paddingTop: responsiveHeight(1)
  },
  offerDescriptionStyle: {
    height: responsiveHeight(30),
    backgroundColor: colors.lightGray,
    paddingLeft: responsiveWidth(5),
    paddingRight: responsiveWidth(5),
    paddingTop: responsiveHeight(1)
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
  },
  dialogContentView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapStyle: {
    ...StyleSheet.absoluteFillObject,
  },
});
