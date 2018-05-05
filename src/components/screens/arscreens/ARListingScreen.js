import React from 'react';
import {
  StyleSheet,
  // TouchableOpacity,
  FlatList
} from 'react-native';
import {
  Container,
  Content,
  Header,
  Spinner,
  Button,
  Right,
  // Title,
  // Item,
  // Label,
  // Text,
  Left,
  View,
  Icon,
  Body,
} from 'native-base';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import MarqueeText from 'react-native-marquee';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from 'react-native-responsive-dimensions';
import {
  colors,
} from '../../../styles';
import OfferCard from '../../modules/OfferCard';
import { getARListingOffers } from '../../../actions';

class ARListingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.autoBind(
      'onEndReached',
      'renderRow'
    );
  }
  componentWillMount() {
    const {
      token,
      sellerAddressId
    } = this.props;
    console.log('Mounting ARListingScreen');
    const page = 1;
    this.props.getARListingOffers({
        token,
        sellerAddressId,
        page
      });
  }
  onEndReached() {
    const {
      pagination,
      token,
      sellerAddressId
    } = this.props;
    const { perPage, pageCount, totalCount } = pagination;
    let { page } = pagination;
    const lastPage = totalCount <= ((page - 1) * perPage) + pageCount;
    if (!pagination.interestedOffersLoading && !lastPage) {
      page += 1;
      this.props.getARListingOffers({
          token,
          sellerAddressId,
          page
        });
    }
  }
  autoBind(...methods) {
      methods.forEach(method => {
        this[method] = this[method].bind(this);
        return this[method];
      });
  }
  keyExtractor = (item, index) => { return index.toString(); };
  renderRow(offerDetails) {
    console.log('Rendering Row');
    // console.log(offerDetails);
    // console.log(offerDetails);
    const { item } = offerDetails;
    const { pagination } = this.props;
    const loading = pagination.arListingOffersLoading;
    if (loading) {
      return (
        <LoadingIndicator loading={loading} />);
    }
      return (
        <OfferCard offerDetails={item} />
      );
  }
  render() {
    const {
      containerStyle,
      headerStyle,
      titleStyle
    } = styles;
    const { sellerInfo, arListingOffers } = this.props;
    return (
      <Container style={containerStyle}>
      <Header
        style={headerStyle}
        iosBarStyle='light-content'
      >
        <Left style={{ flexDirection: 'row' }}>
          <Button transparent onPress={() => { Actions.pop(); }}>
            <Icon style={{ color: 'white' }} ios='ios-arrow-back' android="md-arrow-back" />
          </Button>
          <Button transparent style={{ padding: 0 }} onPress={Actions.drawerOpen}>
            <Icon style={{ color: 'white' }} ios='ios-menu' android="md-menu" />
          </Button>
        </Left>
        <Body>
          <MarqueeText
            style={titleStyle}
            duration={4000}
            marqueeOnStart
            loop
            marqueeDelay={1000}
            marqueeResetDelay={1000}
          >{sellerInfo}</MarqueeText>
        </Body>
        <Right />
        </Header>
        <Content
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingTop: responsiveHeight(1),
            paddingLeft: responsiveWidth(2.5) }}
        >
        <FlatList
          style={{ flex: 1 }}
          automaticallyAdjustContentInsets={false}
          data={arListingOffers}
          renderItem={this.renderRow}
          keyExtractor={this.keyExtractor}
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
    width: responsiveWidth(50),
    marginLeft: responsiveWidth(5)
  },
  loadingStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
function mapStateToProps({ ar, user }) {
    const { token } = user;
    const { arlisting } = ar;
    return {
        ...arlisting,
        token
    };
}
function mapDispatchToProps(dispatch) {
    return {
        getARListingOffers: ({ token, sellerAddressId, page }) => {
          return dispatch(getARListingOffers({ token, sellerAddressId, page }));
        },
    };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ARListingScreen);
