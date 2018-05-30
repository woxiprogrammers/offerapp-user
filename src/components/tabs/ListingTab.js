import React, { Component } from 'react';
import {
  StyleSheet,
  FlatList
} from 'react-native';
import {
  Container,
  Content,
  Spinner,
  View,
  Icon,
  Text
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
      'renderLoading',
      'renderListOffers'
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
    const page = 1;
    this.props.getListViewCategory({
      token,
      categorySelected,
      sortSelected,
      distance,
      typeSelected,
      coords,
      page
    });
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
    const { perPage, pageCount, totalCount } = pagination;
    let { page } = pagination;
    const lastPage = totalCount <= ((page - 1) * perPage) + pageCount;
    if (!pagination.listingViewCategoryOffersLoading && !lastPage) {
      page += 1;
      this.props.getListViewCategory({
        token,
        categorySelected,
        sortSelected,
        distance,
        typeSelected,
        coords,
        page
      });
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
    const page = 1;
    this.props.getListViewCategory({
      token,
      categorySelected,
      sortSelected,
      distance,
      typeSelected,
      coords,
      page
    });
  }
  autoBind(...methods) {
      methods.forEach(method => {
        this[method] = this[method].bind(this);
        return this[method];
      });
  }
  keyExtractor = (item, index) => { return index.toString(); };
  renderLoading() {
    const { pagination } = this.props;
    if (pagination.listingViewCategoryOffersLoading) {
      return (
        <LoadingIndicator loading={pagination.listingViewCategoryOffersLoading} />
      );
    }
  }
  renderRow(offerDetails) {
    const { item } = offerDetails;
    return (
      <View>
        <OfferCard offerDetails={item} />
      </View>
    );
  }
  renderListOffers() {
    const { blackStyle, listOffersErrorStyle } = styles;
    const { listingViewCategoryOffers, pagination } = this.props;
    if (pagination.listingViewCategoryOffersLoading) {
      return (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center' }}
        >
         {this.renderLoading()}
        </View>
      );
    } else if (listingViewCategoryOffers.length === 0) {
      return (
        <View style={listOffersErrorStyle}>
          <Icon style={blackStyle}active name='ionitron' />
          <Text style={blackStyle}>Sorry! No Offers to Show </Text>
        </View>);
    }
    return (
      <View
        style={{ flex: 1 }}
      >
        <FlatList
          style={{ flex: 1 }}
          data={listingViewCategoryOffers}
          refreshing={false}
          renderItem={this.renderRow}
          keyExtractor={this.keyExtractor}
          onRefresh={() => { return this.onRefresh(); }}
          onEndReached={() => { return this.onEndReached(); }}
        />
        {this.renderLoading()}
      </View>);
  }
  render() {
    const {
      containerStyle
    } = styles;
    return (
      <Container style={containerStyle}>
        <Content
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingTop: responsiveHeight(1),
            paddingLeft: responsiveWidth(2.5),
            flex: 1
          }}
        >
          {this.renderListOffers()}
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
  listOffersErrorStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  blackStyle: {
    color: colors.black
  },
  loadingStyle: {
    flex: 1,
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
        getListViewCategory: ({
          token,
          categorySelected,
          sortSelected,
          distance,
          typeSelected,
          coords,
          page
        }) => {
          return dispatch(getListViewCategory({
            token,
            categorySelected,
            sortSelected,
            distance,
            typeSelected,
            coords,
            page
          }));
        },
    };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ListingTab);
