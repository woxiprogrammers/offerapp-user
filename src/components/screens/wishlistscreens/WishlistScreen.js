import React from 'react';
import {
  TouchableOpacity,
  LayoutAnimation,
  StyleSheet,
  FlatList,
  UIManager,
  Platform,
  Picker
} from 'react-native';
import {
  Container,
  Content,
  Header,
  Spinner,
  Button,
  Right,
  Title,
  Text,
  Left,
  View,
  Icon,
  Body,
} from 'native-base';
import { connect } from 'react-redux';
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
import {
  colors,
} from '../../../styles';
import OfferCard from '../../modules/OfferCard';
import { getWishListOffers, removeWislistOffer, sendInterestedOffer } from '../../../actions';

const scaleAnimation = new ScaleAnimation();

class WishlistScreen extends React.Component {
  constructor(props) {
    super(props);
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
    this.autoBind(
      'onEndReached',
      'onRefresh',
      'renderRow',
      'refreshFlatlist',
      'showScaleAnimationDialog',
      'renderInterested',
      'renderDialogContent',
      'renderWishlistOptions'
    );
    this.state = ({
      removeWislistOffer: null,
      selectedInterestedOffer: {
        offerName: ''
      },
      selectedTime: '30 min.'
    });
  }
  componentWillMount() {
    const {
      token
    } = this.props;
    console.log('Mounting WishlistScreen');
    const page = 1;
    this.props.getWishListOffers({ token, page });
  }
  componentWillUpdate() {
    LayoutAnimation.easeInEaseOut();
  }
  onEndReached() {
    const {
      pagination,
      token
    } = this.props;
    const { perPage, pageCount, totalCount } = pagination;
    let { page } = pagination;
    const lastPage = totalCount <= ((page - 1) * perPage) + pageCount;
    if (!pagination.wishListOffersLoading && !lastPage) {
      page += 1;
      this.props.getWishListOffers({ token, page });
    }
  }

  onRefresh() {
    const {
      token
    } = this.props;
    const page = 1;
    this.props.getWishListOffers({ token, page });
  }
  showScaleAnimationDialog = () => {
    this.scaleAnimationDialog.show();
  }
  autoBind(...methods) {
      methods.forEach(method => {
        this[method] = this[method].bind(this);
        return this[method];
      });
  }
  keyExtractor = (item, index) => { return index; };
  refreshFlatlist = (removeWislistOfferIndex) => {
    console.log('Refreshing');
    this.setState(() => {
      return {
        removeWislistOffer: removeWislistOfferIndex
      };
    });
  }
  renderWishlistOptions({ item, index }) {
    const {
      token,
      // userId,
    } = this.props;
    // console.log('In WishList Options : ');
    // console.log(item);
    // console.log('Index is : ');
    // console.log(index);
    const { offerId } = item;
    return (
      <View
        style={{
          width: responsiveWidth(95),
          flexDirection: 'row',
          height: responsiveHeight(8)
        }}
      >
        <TouchableOpacity
          onPress={() => {
            console.log(`Index Remove: ${index} and Offer: ${offerId} `);
            this.props.removeWislistOffer({ index, token, offerId });
            // console.log('=======================================================');
            // console.log(this.props.wishListOffers);
            // console.log('=======================================================');
            this.refreshFlatlist(index);
          }}
          style={{
            height: responsiveHeight(8),
            paddingTop: responsiveHeight(2),
            backgroundColor: '#D9E1F0',
            width: responsiveWidth(47.5),
          }}
        >
          <Text style={{ alignSelf: 'center' }}>Remove</Text>
        </TouchableOpacity>
        {this.renderInterested(item)}
      </View>
    );
  }
  renderInterested(item) {
    const {
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
    }
      return (
        <TouchableOpacity
          onPress={() => {
            this.setState({ selectedInterestedOffer: item });
            this.showScaleAnimationDialog();
          }}
          style={{
            height: responsiveHeight(8),
            paddingTop: responsiveHeight(2),
            backgroundColor: '#D0D8E6',
            width: responsiveWidth(47.5),
          }}
        >
          <Text style={{ alignSelf: 'center' }}>I am Interested</Text>
        </TouchableOpacity>
      );
  }
  renderRow(offerDetails) {
    // console.log('Rendering Row');
    // console.log(offerDetails.item);
    const { item, index } = offerDetails;
    const { pagination } = this.props;
    if (pagination.wishListOffersLoading) {
      return (
        <LoadingIndicator loading={pagination.wishListOffersLoading} />);
    }
      return (
        <View>
        <OfferCard offerDetails={item} />
        {this.renderWishlistOptions({ item, index })}
        </View>
      );
  }
  renderDialogContent() {
    const {
      dialogContentView,
      pickerStyle,
    } = styles;
    const { sendInterestedOfferLoading } = this.props;
    if (sendInterestedOfferLoading) {
      return (<LoadingIndicator loading={sendInterestedOfferLoading} />);
    }
      return (
        <View style={dialogContentView}>
          <Text>Time to Reach : </Text>
          <Picker
            style={pickerStyle}
            mode='dropdown'
            selectedValue={this.state.selectedTime}
            onValueChange={(itemValue) => { return this.setState({ selectedTime: itemValue }); }}
          >
            <Picker.Item label="30 min." value="30-mins" />
            <Picker.Item label="1 hr." value="1-hour" />
            <Picker.Item label="2 hrs." value="2-hour" />
          </Picker>
        </View>
      );
  }
  render() {
    const {
      // dialogContentView,
      containerStyle,
      headerStyle,
      titleStyle
    } = styles;
    const { wishListOffers, token } = this.props;
    const { selectedInterestedOffer, selectedTime } = this.state;
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
          <Title style={titleStyle}>Wishlist Screen</Title>
        </Body>
        <Right />
        </Header>
        <PopupDialog
          width={responsiveWidth(90)}
          height={responsiveHeight(50)}
          ref={(popupDialog) => {
            this.scaleAnimationDialog = popupDialog;
          }}
          dialogAnimation={scaleAnimation}
          dialogTitle={<DialogTitle title={selectedInterestedOffer.offerName} />}
          actions={[
            <DialogButton
              textContainerStyle={{ height: responsiveHeight(5) }}
              text="Submit"
              onPress={async () => {
                await this.props.sendInterestedOffer(
                  token,
                  selectedInterestedOffer.offerId,
                  12345,
                  selectedTime);
                this.scaleAnimationDialog.dismiss();
                Actions.interestedScreen();
              }}
              key="submit"
            />,
          ]}
        >
        {this.renderDialogContent()}
        </PopupDialog>
        <Content
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingTop: responsiveHeight(1),
            paddingLeft: responsiveWidth(2.5) }}
        >
          <FlatList
            automaticallyAdjustContentInsets={false}
            data={wishListOffers}
            refreshing={false}
            renderItem={this.renderRow}
            keyExtractor={this.keyExtractor}
            onRefresh={() => { return this.onRefresh(); }}
            onEndReached={() => { return this.onEndReached(); }}
          />
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
  loadingStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dialogContentView: {
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
});
function mapStateToProps({ wishlist, user, interested }) {
    const { token } = user;
    const { sendInterestedOfferLoading } = interested;
    return {
        ...wishlist,
        token,
        sendInterestedOfferLoading
    };
}
function mapDispatchToProps(dispatch) {
    return {
        getWishListOffers: ({ token, page }) => {
          return dispatch(getWishListOffers({ token, page }));
        },
        removeWislistOffer: ({ index, token, offerId }) => {
          return dispatch(removeWislistOffer({ index, token, offerId }));
        },
        sendInterestedOffer: (token, offerId, userId, selectedTime) => {
          return dispatch(sendInterestedOffer(token, offerId, userId, selectedTime));
        },
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WishlistScreen);
