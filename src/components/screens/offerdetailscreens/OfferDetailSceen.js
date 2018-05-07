import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  Picker
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
import { connect } from 'react-redux';
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
import { phonecall } from 'react-native-communications';
import swiperLoading from '../../../assets/images/loading.gif';
import { getOfferDetails, addToWishList, addToInterested } from '../../../actions';
import {
  //variables,
  // mixins,
  colors,
 } from '../../../styles';
 import { IMAGEURL } from '../../../constants';

const Slide = props => {
 return (
   <View style={styles.slide}>
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
   </View>);
};
const scaleAnimation = new ScaleAnimation();

const ASPECT_RATIO = responsiveWidth(100) / responsiveHeight(100);
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
let id = 0;

function randomColor() {
 return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
class OfferDetailScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = ({
      selectedTime: '30-mins',
    });
    this.autoBind(
      'loadHandle',
      'renderSwiper',
      'renderMapView',
      'renderWishList',
      'renderInterested'
    );
  }
  async componentWillMount() {
    const {
      token,
      getOffer
    } = this.props;
    await this.props.getOfferDetails({ token, offerId: getOffer });
  }
  showMapDialog = () => {
    this.mapDialog.show();
  }
  showInterestedDialog = () => {
    this.interestedDialog.show();
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
    if (this.props.offerSwiperLoading) {
      return (
        <Spinner
          style={{ height: responsiveHeight(25) }}
          color='black'
        />);
    }
    return (
      <Swiper style={swiperStyle}>
        {
          this.props.imageList.map((item, i) => {
            return (
              <Slide
                loadHandle={this.loadHandle}
                loaded={!!this.props.loadQueue[i]}
                uri={item}
                i={i}
                key={i}
              />
              );
        })}
      </Swiper>);
  }
  renderWishList() {
    const {
      addToWishListLoading,
      addedToWishList,
      token,
      offerId
    } = this.props;
    if (addedToWishList) {
      return (
        <TouchableOpacity
          onPress={() => { Actions.push('wishlistScreen'); }}
          style={{ flex: 1, alignSelf: 'center' }}
        >
          <Text style={{ alignSelf: 'center' }}>Go to Wish List</Text>
        </TouchableOpacity>
      );
    } else if (addToWishListLoading) {
      return (
        <View style={styles.loadingStyle}>
          <Spinner color="black" />
        </View>
      );
    }
      return (
        <TouchableOpacity
          onPress={async () => {
            await this.props.addToWishList({ token, offerId });
            Actions.push('wishlistScreen');
          }}
          style={{ flex: 1, alignSelf: 'center' }}
        >
          <Text style={{ alignSelf: 'center' }}>Add to Wish List</Text>
        </TouchableOpacity>
      );
  }
  renderInterested() {
    const {
      addToInterestedLoading,
      addedToInterested,
    } = this.props;
    if (addedToInterested) {
      return (
        <TouchableOpacity
          onPress={() => { Actions.push('interestedScreen'); }}
          style={{ flex: 1, alignSelf: 'center' }}
        >
          <Text style={{ alignSelf: 'center' }}>Go to Interested</Text>
        </TouchableOpacity>
      );
    } else if (addToInterestedLoading) {
      return (
        <View style={styles.loadingStyle}>
          <Spinner color="black" />
        </View>
      );
    }
      return (
        <TouchableOpacity
          onPress={() => {
            this.showInterestedDialog();
          }}
          style={{ flex: 1, alignSelf: 'center' }}
        >
          <Text style={{ alignSelf: 'center' }}>I am Interested</Text>
        </TouchableOpacity>
      );
  }
  renderInterestedDialog() {
    const {
      dialogInterestedView,
      pickerStyle,
    } = styles;
    const { sendInterestedOfferLoading, reachInTime } = this.props;
    if (sendInterestedOfferLoading) {
      return (<LoadingIndicator loading={sendInterestedOfferLoading} />);
    }
      return (
      <View style={dialogInterestedView}>
          <Text>Time to Reach : </Text>
          <Picker
            style={pickerStyle}
            mode='dropdown'
            selectedValue={this.state.selectedTime}
            onValueChange={(itemValue) => { return this.setState({ selectedTime: itemValue }); }}
          >
            {
            reachInTime.map((item, i) => {
              return (
                <Picker.Item key={i} label={item.name} value={item.slug} />
                );
            })
            }
          </Picker>
        </View>
      );
  }
  renderMapView() {
    if (this.props.offerLoading) {
      return (
        <Spinner
          style={{ height: responsiveHeight(25) }}
          color='black'
        />);
    }
      const { mapStyle } = styles;
      const { offerLatitude, offerLongitude } = this.props;
      const region = {
        latitude: offerLatitude,
        longitude: offerLongitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      };
      const marker = {
        coordinate: { latitude: offerLatitude, longitude: offerLongitude },
        key: id++,
        color: randomColor()
      };
      return (
        <MapView
          showsUserLocation
          provider={this.props.provider}
          style={mapStyle}
          initialRegion={region}
        >
          <MapView.Marker
            key={marker.key}
            coordinate={marker.coordinate}
            pinColor={marker.color}
          />
        </MapView>);
  }
  render() {
     const {
      offerDescriptionStyle,
      containerStyle,
      dialogMapView,
      headerStyle,
      titleStyle,
      offerStyle,
     } = styles;
     const {
       offerDescription,
       sellerAddress,
       sellerNumber,
       offerExpiry,
       sellerInfo,
       offerName,
       offerId,
       token,
    } = this.props;
    const { selectedTime } = this.state;
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
              this.mapDialog = popupDialog;
            }}
            dialogAnimation={scaleAnimation}
            dialogTitle={<DialogTitle title={sellerInfo} />}
            actions={[
              <DialogButton
                textContainerStyle={{
                  height: responsiveHeight(10),
                  paddingTop: responsiveHeight(2.5)
                }}
                text="Close"
                onPress={() => {
                  this.mapDialog.dismiss();
                }}
                key="close"
              />,
            ]}
          >
          <View style={dialogMapView}>
            {this.renderMapView()}
          </View>
          </PopupDialog>
          <PopupDialog
            width={responsiveWidth(90)}
            height={responsiveHeight(50)}
            dialogStyle={{ marginTop: responsiveHeight(-30) }}
            ref={(popupDialog) => {
              this.interestedDialog = popupDialog;
            }}
            dialogAnimation={scaleAnimation}
            dialogTitle={<DialogTitle title={sellerInfo} />}
            actions={[
              <DialogButton
                textContainerStyle={{ height: responsiveHeight(5) }}
                text="Submit"
                onPress={async () => {
                  await this.props.addToInterested({
                    token,
                    offerId,
                    selectedTime });
                  this.interestedDialog.dismiss();
                  Actions.interestedScreen();
                }}
                key="submit"
              />,
            ]}
          >
            {this.renderInterestedDialog()}
          </PopupDialog>
          <View>
            {this.renderSwiper()}
          </View>
          <View style={offerStyle}>
            <View style={{ width: responsiveWidth(65) }}>
            <Text style={{ fontSize: responsiveFontSize(3.8) }}>{offerName}</Text>
            <Text style={{ fontSize: responsiveFontSize(2.5) }}>{sellerInfo}</Text>
            <Text
              style={{ fontSize: responsiveFontSize(1.7) }}
            >{sellerAddress}</Text>
            <Text
              style={{
                paddingTop: responsiveHeight(1),
                fontSize: responsiveFontSize(1.7)
              }}
            >Offer Validity : {offerExpiry}</Text>
            </View>
            <View style={{ alignItems: 'center' }}>
              <TouchableOpacity onPress={() => { return phonecall(sellerNumber, true); }}>
              <Icon
                style={{
                  fontSize: responsiveFontSize(5),
                  color: 'black'
                }}
                ios='ios-call'
                android="md-call"
              />
              </TouchableOpacity>
              <View style={{ paddingTop: responsiveHeight(2) }}>
              <Button
                style={{
                  height: responsiveHeight(5),
                  width: responsiveWidth(25),
                  justifyContent: 'center',
                  backgroundColor: '#47525E'
                }}
                onPress={this.showMapDialog}
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
            {offerDescription}
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
        {this.renderWishList()}
        {this.renderInterested()}
      </View>
    </Container>
     );
   }
 }

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
  offerStyle: {
    backgroundColor: colors.lightGray,
    height: responsiveHeight(20),
    flexDirection: 'row',
    paddingLeft: responsiveWidth(5),
    paddingRight: responsiveWidth(5),
    paddingTop: responsiveHeight(1.5)
  },
  offerDescriptionStyle: {
    height: responsiveHeight(30),
    backgroundColor: colors.lightGray,
    paddingLeft: responsiveWidth(5),
    paddingRight: responsiveWidth(5),
    paddingTop: responsiveHeight(1)
  },
  swiperStyle: {
    height: responsiveHeight(25)
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
  },
  dialogMapView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dialogInterestedView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pickerStyle: {
    //backgroundColor: colors.lightGrayTransparent,
    width: responsiveWidth(30),
      marginTop: 10,
      paddingBottom: 10,
  },
  loadingStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapStyle: {
    ...StyleSheet.absoluteFillObject,
  },
});

function mapStateToProps({ offer, user, drawer }) {
    const { token } = user;
    const { reachInTime } = drawer;
    return {
        ...offer,
        token,
        reachInTime
    };
}
function mapDispatchToProps(dispatch) {
    return {
        getOfferDetails: ({ token, offerId }) => {
          return dispatch(getOfferDetails({ token, offerId }));
        },
        addToWishList: ({ token, offerId }) => {
          return dispatch(addToWishList({ token, offerId }));
        },
        addToInterested: ({
          token,
          offerId,
          selectedTime }) => {
          return dispatch(addToInterested({
            token,
            offerId,
            selectedTime }));
        },
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OfferDetailScreen);
