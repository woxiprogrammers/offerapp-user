import React, { Component } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
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
  Left,
  View,
  Icon,
  Body,
  Text,
} from 'native-base';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from 'react-native-responsive-dimensions';
import {
  colors,
} from '../../../styles';
import OfferCard from '../../modules/OfferCard';
import { getGroupOffers, leaveGroup } from '../../../actions';

class GroupScreen extends Component {
  constructor(props) {
    super(props);
    this.autoBind(
      'onEndReached',
      'onRefresh',
      'renderRow',
      'renderLeaveGroup'
    );
  }
  componentWillMount() {
    const {
      token,
      userId,
      groupId
    } = this.props;
    console.log('Mounting GroupScreen');
    this.props.getGroupOffers(token, 1, userId, groupId);
  }
  onEndReached() {
    const {
      pagination,
      token,
      userId,
      groupId
    } = this.props;
    const { page, perPage, pageCount, totalCount } = pagination;
    const lastPage = totalCount <= ((page - 1) * perPage) + pageCount;
    if (!pagination.groupOffersLoading && !lastPage) {
      this.props.getGroupOffers(token, page + 1, userId, groupId);
    }
  }
  onRefresh() {
    const {
      token,
      userId,
      groupId
    } = this.props;
    this.props.getGroupOffers(token, 1, userId, groupId);
  }

  autoBind(...methods) {
      methods.forEach(method => {
        this[method] = this[method].bind(this);
        return this[method];
      });
  }
  keyExtractor = (item, index) => { return index; };
  leaveGroupPressed() {
    const { token, userId, groupId } = this.props;
    this.props.leaveGroup({ token, userId, groupId });
  }
  renderRow(offerDetails) {
    // console.log('Rendering Row');
    // console.log(offerDetails);
    const { item } = offerDetails;
    const { pagination } = this.props;
    if (pagination.groupOffersLoading) {
      return (
        <LoadingIndicator loading={pagination.groupOffersLoading} />);
    }
      return (
        <OfferCard offerDetails={item} />
      );
  }
  renderLeaveGroup() {
    if (this.props.leaveGroupLoading) {
      return (
        <View style={styles.loadingStyle}>
          <Spinner color="black" />
        </View>);
    }
    return (
      <TouchableOpacity
        onPress={() => { this.leaveGroupPressed(); }}
        style={{ flex: 1, alignSelf: 'center' }}
      >
          <Text style={{ alignSelf: 'center' }}>Leave Group</Text>
      </TouchableOpacity>
    );
  }
  render() {
    const {
      leaveGroupStyle,
      containerStyle,
      headerStyle,
      titleStyle
    } = styles;
    const { groupOffers } = this.props;
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
          <Title style={titleStyle}>Group List Screen</Title>
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
          automaticallyAdjustContentInsets={false}
          data={groupOffers}
          refreshing={false}
          renderItem={this.renderRow}
          keyExtractor={this.keyExtractor}
          onRefresh={() => { return this.onRefresh(); }}
          onEndReached={() => { return this.onEndReached(); }}
        />
      </Content>
      <View style={leaveGroupStyle}>
      {this.renderLeaveGroup()}
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
  leaveGroupStyle: {
    flexDirection: 'row',
    height: responsiveHeight(10),
    backgroundColor: colors.lightGray
  },
  loadingStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

function mapStateToProps({ groups, user }) {
    const { group } = groups;
    const { token } = user;
    return {
        ...group,
        token
    };
}
function mapDispatchToProps(dispatch) {
    return {
        getGroupOffers: (token, page, userId, groupId) => {
          return dispatch(getGroupOffers(token, page, userId, groupId));
        },
        leaveGroup: (token, userId, groupId) => {
          return dispatch(leaveGroup(token, userId, groupId));
        },
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GroupScreen);
