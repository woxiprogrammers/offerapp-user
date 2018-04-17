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
import { getInterestedOffers } from '../../../actions';

const scaleAnimation = new ScaleAnimation();

class InterestedScreen extends React.Component {
  constructor(props) {
    super(props);
    this.autoBind(
      'onEndReached',
      'onRefresh',
      'renderRow',
      'showScaleAnimationDialog',
      'renderInterestedOptions'
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
      userId,
    } = this.props;
    console.log('Mounting InterestedScreen');
    this.props.getInterestedOffers(token, 1, userId);
  }
  onEndReached() {
    const {
      pagination,
      token,
      userId,
    } = this.props;
    const { page, perPage, pageCount, totalCount } = pagination;
    const lastPage = totalCount <= ((page - 1) * perPage) + pageCount;
    if (!pagination.interestedOffersLoading && !lastPage) {
      this.props.getInterestedOffers(token, page + 1, userId);
    }
  }
  onRefresh() {
    const {
      token,
      userId,
    } = this.props;
    this.props.getInterestedOffers(token, 1, userId);
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
  renderInterestedOptions({ item }) {
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
          <Text style={{ alignSelf: 'center' }}>Offer Id: {item.offerId}</Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            this.setState({ selectedGrabOffer: item });
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
  renderRow(offerDetails) {
    // console.log('Rendering Row');
    // console.log(offerDetails);
    // console.log(offerDetails);
    const { item, index } = offerDetails;
    const { pagination } = this.props;
    if (pagination.interestedOffersLoading) {
      return (
        <LoadingIndicator loading={pagination.interestedOffersLoading} />);
    }
      return (
        <View>
        <OfferCard offerDetails={item} />
        {this.renderInterestedOptions({ item, index })}
        </View>
      );
  }
  renderDialogContent(selectedGrabOffer) {
    const {
      dialogContentView,
    } = styles;
    return (
      <View style={dialogContentView}>
        <Text style={{ fontSize: responsiveFontSize(1.5), paddingBottom: responsiveHeight(3) }}>
          Show this to the Corresponding Vendor to Grab the Offer
        </Text>
        <Item>
          <Label>
            # {selectedGrabOffer.offerExpiry}
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
              textContainerStyle={{ height: responsiveHeight(5) }}
              text="Close"
              onPress={() => {
                this.scaleAnimationDialog.dismiss();
              }}
              key="close"
            />,
          ]}
        >
        {this.renderDialogContent(selectedGrabOffer)}
        </PopupDialog>
        <Content
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingTop: responsiveHeight(1),
            paddingLeft: responsiveWidth(2.5) }}
        >
        <FlatList
          automaticallyAdjustContentInsets={false}
          data={interestedOffers}
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
        getInterestedOffers: (token, page, userId) => {
          return dispatch(getInterestedOffers(token, page, userId));
        },
    };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(InterestedScreen);
