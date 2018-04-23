import React from 'react';
import {
  TouchableWithoutFeedback,
  TouchableOpacity,
  StyleSheet,
  Platform,
  UIManager,
  FlatList,
  // LayoutAnimation
} from 'react-native';
// import Collapsible from 'react-native-collapsible';
import {
  Container,
  Thumbnail,
  // ListItem,
  Content,
  Spinner,
  Button,
  Right,
  Left,
  // List,
  View,
  Icon,
  Text,
} from 'native-base';
import { connect } from 'react-redux';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from 'react-native-responsive-dimensions';
import { Actions } from 'react-native-router-flux';
import {
  colors
 } from '../../styles';
 import { logoutUser, setCategory, getCategories, updateShowCategory } from '../../actions';
import { IMAGEURL } from '../../constants';

class DrawerComponent extends React.Component {
  constructor(props) {
    super(props);
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
    this.state = {
      subExpand: false,
      categorySelected: null,
      showCategory: null
    };
    this.autoBind(
      'renderArrow',
      'renderRow',
      'toggleExpanded',
      'renderBack',
      'renderCategories'
    );
  }
  componentDidMount() {
    const { token } = this.props;
    this.props.getCategories({ token });
  }
  // componentWillUpdate() {
  //   LayoutAnimation.spring();
  // }
  toggleExpanded = () => {
  this.setState({ subExpand: !this.state.subExpand });
  }
  keyExtractor = (item, index) => { return index + 1; };
  autoBind(...methods) {
      methods.forEach(method => {
        this[method] = this[method].bind(this);
        return this[method];
      });
  }
  renderArrow(category) {
    if (category.subCategory.length !== 0) {
        return (
          <View>
          <Button
            style={{ height: responsiveHeight(4) }}
            onPress={async () => {
              console.log('Right Clicked');
              await this.toggleExpanded();
              await this.props.updateShowCategory(category.subCategory);
            }}
          >
          <Right>
            <Icon
              style={{ color: 'white' }}
              ios='ios-arrow-forward'
              android="md-arrow-forward"
            />
          </Right>
          </Button>
          </View>
        );
      }
    return null;
  }
  renderRow(categories) {
    const { categoryStyle } = styles;
    const category = categories.item;
    if (!this.state.subExpand) {
    return (
      <View style={categoryStyle}>
        <View
          style={{
          flexDirection: 'row',
          }}
        >
          <TouchableWithoutFeedback
            onPress={() => {
              console.log(`Category: ${category.name}`);
              this.props.setCategory(category.id);
              Actions.drawerClose(); Actions.categoryScreen();
            }}
          >
            <Left>
              <Text style={{ color: 'white' }}>{category.name}</Text>
            </Left>
          </TouchableWithoutFeedback>
          {this.renderArrow(category)}
        </View>
      </View>
    );
    }
    return (
      <View style={categoryStyle}>
        <View
          style={{
          flexDirection: 'row',
          }}
        >
          <TouchableWithoutFeedback
            onPress={() => {
              console.log(`Category: ${category.name}`);
              this.props.setCategory(category.id);
              Actions.drawerClose(); Actions.categoryScreen();
            }}
          >
            <Left>
              <Text style={{ color: 'white' }}>{category.name}</Text>
            </Left>
          </TouchableWithoutFeedback>
        </View>
      </View>
    );
  }
  renderBack() {
    if (this.state.subExpand) {
      return (
        <View style={{ paddingTop: responsiveHeight(2) }}>
          <Button
            full
            transparent
            style={{ justifyContent: 'flex-start', height: responsiveHeight(4) }}
            onPress={async () => {
              console.log('Left Clicked');
              await this.toggleExpanded();
              await this.props.updateShowCategory(this.props.categories);
            }}
          >
            <Icon
              style={{ color: 'white' }}
              ios='ios-arrow-back'
              android="md-arrow-back"
            />
            <Text style={{ color: 'white' }}>Back to Categories</Text>
          </Button>
        </View>
      );
    }
  }
  renderCategories() {
    const { categoriesListStyle } = styles;
    const { categoriesLoading, showCategory } = this.props;
    if (categoriesLoading) {
      return (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
        <Spinner color='white' />
        </View>
      );
    }
    return (
      <View style={categoriesListStyle}>
      {this.renderBack()}
      <FlatList
        automaticallyAdjustContentInsets={false}
        data={showCategory}
        refreshing
        renderItem={this.renderRow}
        keyExtractor={this.keyExtractor}
      />
      </View>
    );
  }
  render() {
    const {
      // categoriesListStyle,
      categoriesStyle,
      containerStyle,
      // categoryStyle,
      profileStyle,
      iconStyle
    } = styles;
    const { firstName, profilePic } = this.props;
    return (
      <Container style={containerStyle}>
        <Content>
          <TouchableWithoutFeedback
            onPress={() => { Actions.drawerClose(); Actions.profileEditScreen(); }}
          >
            <View style={profileStyle}>
              <View style={{ flexDirection: 'column', alignSelf: 'center' }}>
                <Text
                  style={{ fontSize: responsiveFontSize(3), color: 'white' }}
                >
                  Hello, {firstName}</Text>
                <Text
                  style={{ fontSize: responsiveFontSize(2), color: 'white' }}
                >
                  Reward Points:1234</Text>
              </View>
              <View style={{ paddingLeft: responsiveWidth(5) }}>
                <Thumbnail
                  large
                  source={{ uri: `${IMAGEURL}${profilePic}` }}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
          <View style={iconStyle}>
            <TouchableWithoutFeedback
              onPress={() => { Actions.drawerClose(); Actions.groupListingScreen(); }}
            >
              <View style={{ flexDirection: 'column', flex: 1, alignItems: 'center' }}>
                <Icon style={{ color: 'white' }} ios='ios-people' android="md-people" />
                  <Text style={{ fontSize: responsiveFontSize(1.8), color: 'white' }}>Groups</Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() => { Actions.drawerClose(); Actions.wishlistScreen(); }}
            >
              <View style={{ flexDirection: 'column', flex: 1, alignItems: 'center' }}>
                <Icon style={{ color: 'white' }} ios='ios-heart' android="md-heart" />
                  <Text
                    style={{ fontSize: responsiveFontSize(1.8), color: 'white' }}
                  >
                  Wish List
                  </Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() => { Actions.drawerClose(); Actions.push('interestedScreen'); }}
            >
              <View style={{ flexDirection: 'column', flex: 1, alignItems: 'center' }}>
                <Icon style={{ color: 'white' }} ios='ios-thumbs-up' android="md-thumbs-up" />
                  <Text
                    style={{ fontSize: responsiveFontSize(1.8), color: 'white' }}
                  >
                    I am interested
                  </Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
          <View style={categoriesStyle}>
            <Text style={{ color: 'white', fontSize: responsiveFontSize(2) }}>Categories</Text>
            {this.renderCategories()}
          </View>
            <View style={{ paddingTop: responsiveHeight(5), paddingLeft: responsiveWidth(5) }}>
            <TouchableOpacity onPress={() => { this.props.logoutUser(); }} >
                <Text style={{ color: 'white' }}>Log Out</Text>
              </TouchableOpacity>
            </View>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: colors.darkGray
  },
  profileStyle: {
    paddingTop: responsiveHeight(6),
    paddingLeft: responsiveWidth(5),
    flexDirection: 'row',
    alignSelf: 'center'
  },
  iconStyle: {
    flexDirection: 'row',
    height: responsiveHeight(10),
    marginTop: responsiveHeight(5)

  },
  categoriesStyle: {
    paddingLeft: responsiveWidth(5),
  },
  categoriesListStyle: {
    paddingRight: responsiveWidth(5)
  },
  categoryStyle: {
    paddingTop: responsiveHeight(2.5)
  }

});
function mapStateToProps({ drawer, user }) {
    const { token, userData } = user;
    return {
        ...drawer,
        ...userData,
        token
    };
}

function mapDispatchToProps(dispatch) {
    return {
        logoutUser: () => {
          return dispatch(logoutUser());
        },
        setCategory: (categorySelected) => {
          return dispatch(setCategory(categorySelected));
        },
        getCategories: ({ token }) => {
          return dispatch(getCategories({ token }));
        },
        updateShowCategory: (category) => {
          return dispatch(updateShowCategory(category));
        }
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DrawerComponent);
