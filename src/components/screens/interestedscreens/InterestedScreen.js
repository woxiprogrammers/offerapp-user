import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  FlatList
} from 'react-native';
import {
  Container,
  Content,
  Header,
  Spinner,
  Button,
  Right,
  Title,
  Item,
  Label,
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
import { getInterestedOffers, getGrabCode } from '../../../actions';

const scaleAnimation = new ScaleAnimation();

class InterestedScreen extends React.Component {
  constructor(props) {
    super(props);
    this.autoBind(
      'onEndReached',
      'onRefresh',
      'renderRow',
      'showScaleAnimationDialog',
      'renderInterestedOptions',
      'renderLoading'
    );
    this.state = ({
      selectedGrabOffer: {
        offerName: ''
      }
    });
  }
  componentWillMount() {
    const {
      token,
    } = this.props;
    const page = 1;
    this.props.getInterestedOffers({ token, page });
  }
  onEndReached() {
    const {
      pagination,
      token,
    } = this.props;
    const { perPage, pageCount, totalCount } = pagination;
    let { page } = pagination;
    const lastPage = totalCount <= ((page - 1) * perPage) + pageCount;
    if (!pagination.interestedOffersLoading && !lastPage) {
      page += 1;
      this.props.getInterestedOffers({ token, page });
    }
  }
  onRefresh() {
    const {
      token,
    } = this.props;
    const page = 1;
    this.props.getInterestedOffers({ token, page });
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
  keyExtractor = (item, index) => { return index.toString(); };
  renderInterestedOptions({ item }) {
    const { token } = this.props;
    const { offerId } = item;
    return (
      <View
        style={{
          width: responsiveWidth(95),
          flexDirection: 'row',
          height: responsiveHeight(8)
        }}
      >
        <View
          style={{
            height: responsiveHeight(8),
            paddingTop: responsiveHeight(2),
            backgroundColor: '#D9E1F0',
            width: responsiveWidth(47.5),
          }}
        >
          <Text style={{ alignSelf: 'center' }}>Offer Id: {offerId}</Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            this.setState({ selectedGrabOffer: item });
            this.props.getGrabCode({ token, offerId });
            this.showScaleAnimationDialog();
          }}
          style={{
            height: responsiveHeight(8),
            paddingTop: responsiveHeight(2),
            backgroundColor: '#D0D8E6',
            width: responsiveWidth(47.5),
          }}
        >
          <Text style={{ alignSelf: 'center' }}>Grab Offer</Text>
        </TouchableOpacity>
      </View>
    );
  }
  renderLoading() {
    const { pagination } = this.props;
    if (pagination.interestedOffersLoading) {
      return (
        <LoadingIndicator loading={pagination.interestedOffersLoading} />
      );
    }
  }
  renderRow(offerDetails) {
    const { item, index } = offerDetails;
    return (
      <View style={{ flex: 1 }}>
        <OfferCard offerDetails={item} />
        {this.renderInterestedOptions({ item, index })}
      </View>
    );
  }
  renderDialogContent() {
    const {
      dialogContentView,
    } = styles;
    const { grabCode, grabCodeLoading } = this.props;
    if (grabCodeLoading) {
      return (
        <View style={dialogContentView}>
          <Spinner color="black" />
        </View>
      );
    }
    return (
      <View style={dialogContentView}>
        <Text style={{ fontSize: responsiveFontSize(1.5), paddingBottom: responsiveHeight(3) }}>
          Show this to the Corresponding Vendor to Grab the Offer
        </Text>
        <Item>
          <Label>
            # {grabCode}
          </Label>
        </Item>
      </View>
    );
  }
  render() {
    const {
      containerStyle,
      headerStyle,
      titleStyle
    } = styles;
    const { interestedOffers } = this.props;
    const { selectedGrabOffer } = this.state;
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
          <Title style={titleStyle}>I am Interested</Title>
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
          dialogTitle={<DialogTitle title={selectedGrabOffer.offerName} />}
          actions={[
            <DialogButton
              textContainerStyle={{
                height: responsiveHeight(10),
                paddingTop: responsiveHeight(2.5)
              }}
              text="Close"
              onPress={() => {
                this.scaleAnimationDialog.dismiss();
              }}
              key="close"
            />
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
          style={{ flex: 1 }}
          data={interestedOffers}
          refreshing={false}
          renderItem={this.renderRow}
          keyExtractor={this.keyExtractor}
          onRefresh={() => { return this.onRefresh(); }}
          onEndReached={() => { return this.onEndReached(); }}
        />
        {this.renderLoading()}
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
    alignItems: 'center',
    justifyContent: 'center',
  },
});
function mapStateToProps({ interested, user }) {
    const { token } = user;
    return {
        ...interested,
        token
    };
}
function mapDispatchToProps(dispatch) {
    return {
        getInterestedOffers: ({ token, page }) => {
          return dispatch(getInterestedOffers({ token, page }));
        },
        getGrabCode: ({ token, offerId }) => {
          return dispatch(getGrabCode({ token, offerId }));
        },
    };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(InterestedScreen);
