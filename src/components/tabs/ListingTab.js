import React, { Component } from 'react';
import {
  StyleSheet,
  FlatList
} from 'react-native';
import {
  Container,
  Content,
  Spinner,
  View
} from 'native-base';
// import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import {
  responsiveHeight,
  responsiveWidth,
  // responsiveFontSize
} from 'react-native-responsive-dimensions';
import {
  // variables,
  // mixins,
  colors,
 } from '../../styles';
import { getListViewCategory } from '../../actions';
import OfferCard from '../modules/OfferCard';

class ListingTab extends Component {
  constructor(props) {
    super(props);
    this.autoBind(
      'onEndReached',
      'onRefresh',
      'renderRow',
    );
  }
  componentWillMount() {
    const {
      token,
      categorySelected,
      sortSelected,
      distance,
      typeSelected,
      coords,
    } = this.props;
    console.log('Mounting Listing Tab');
    this.props.getListViewCategory(
      token,
      categorySelected,
      sortSelected,
      distance,
      typeSelected,
      coords,
      1
    );
  }
  onEndReached() {
    const {
      pagination,
      token,
      categorySelected,
      sortSelected,
      distance,
      typeSelected,
      coords,
    } = this.props;
    const { page, perPage, pageCount, totalCount } = pagination;
    const lastPage = totalCount <= ((page - 1) * perPage) + pageCount;
    if (!pagination.listingViewCategoryOffersLoading && !lastPage) {
      this.props.getListViewCategory(
        token,
        categorySelected,
        sortSelected,
        distance,
        typeSelected,
        coords,
        page + 1
      );
    }
  }
  onRefresh() {
    const {
      token,
      categorySelected,
      sortSelected,
      distance,
      typeSelected,
      coords,
    } = this.props;
    this.props.getListViewCategory(
      token,
      categorySelected,
      sortSelected,
      distance,
      typeSelected,
      coords,
      1
    );
  }
  autoBind(...methods) {
      methods.forEach(method => {
        this[method] = this[method].bind(this);
        return this[method];
      });
  }
  keyExtractor = (item, index) => { return index; };
  renderRow(offerDetails) {
    // console.log('Rendering Row');
    // console.log(offerDetails);
    // console.log(offerDetails);
    const { item } = offerDetails;
    const { pagination } = this.props;
    if (pagination.listingViewCategoryOffersLoading) {
      return (
        <LoadingIndicator loading={pagination.listingViewCategoryOffersLoading} />);
    }
      return (
        <View>
          <OfferCard offerDetails={item} />
        </View>
      );
  }
  render() {
    const {
      containerStyle
    } = styles;
    const { listingViewCategoryOffers } = this.props;
    console.log('======================================================');
    console.log(this.props);
    console.log('======================================================');
    return (
      <Container style={containerStyle}>
        <Content
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingTop: responsiveHeight(1),
            paddingLeft: responsiveWidth(2.5),
          }}
        >
          <FlatList
            automaticallyAdjustContentInsets={false}
            data={listingViewCategoryOffers}
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
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
function mapStateToProps({ main, categories, user }) {
    const { location } = main;
    const { latitude, longitude } = location;
    const coords = { latitude, longitude };
    const { category, listingview } = categories;
    const { token } = user;
    return {
        ...listingview,
        ...category,
        coords,
        token
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getListViewCategory: (
          token,
          categorySelected,
          sortSelected,
          distance,
          typeSelected,
          page
          ) => {
          return dispatch(getListViewCategory(
            token,
            categorySelected,
            sortSelected,
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
)(ListingTab);
