import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Platform,
  UIManager,
  // LayoutAnimation,
  TouchableWithoutFeedback,
} from 'react-native';
import Collapsible from 'react-native-collapsible';
import {
  Container,
  Thumbnail,
  ListItem,
  // Header,
  Content,
  // Spinner,
  Button,
  Right,
  // Title,
  Left,
  List,
  View,
  Icon,
  // Body,
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
  // variables,
  // mixins,
  colors,
 } from '../../styles';
 import { logoutUser } from '../../actions';


class DrawerComponent extends React.Component {
  constructor(props) {
    super(props);
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
    this.state = {
      subCategories: [
        'Men\'s Fashion',
        'Women\'s Fashion',
        'Electronics',
        'Foods',
      ],
      categories: [
        'Men\'s Fashion',
        'Women\'s Fashion',
        'Electronics',
        'Foods',
        'Gym',
        'Sports',
        'Mobile & Accessories',
        'Nightlife',
      ],
      menSubCategory: [
        'Clothing',
        'Footwear',
        'Watches',
        'Specs / Sunglasses',
        'Grooming',
      ],
      womenSubCategory: [
        'Clothing',
        'Footwear',
        'Watches',
        'Specs / Sunglasses',
        'Beauty'
      ],
      electronicsSubCategory: [
        'Refrigerator',
        'TV',
        'AC & Cooler',
        'Laptop & Tablet',
        'Washing Machine'
      ],
      foodSubCategory: [
        'Restaurants',
        'Snack Center'
      ],
      collapsed: true,
      categorySelected: 'none',
      subCategorySelected: 'none'
    };
  }
  // componentWillUpdate() {
  //   LayoutAnimation.spring();
  // }
  toggleExpanded = () => {
  this.setState({ collapsed: !this.state.collapsed });
  }
  renderArrow(category) {
    const { subCategories } = this.state;
    if (
      category === subCategories[0] ||
      category === subCategories[1] ||
      category === subCategories[2] ||
      category === subCategories[3]) {
        return (
          <View>
          <Button
            style={{ height: responsiveHeight(4) }}
            onPress={() => {
              console.log('Right Clicked');
              this.toggleExpanded();
              this.setState({ subCategorySelected: category });
            }}
          >
          <Right>
            <Icon
              style={{ color: 'white' }}
              ios='ios-arrow-down'
              android="md-arrow-dropdown"
            />
          </Right>
          </Button>
          </View>
        );
      }
    return null;
  }
  renderSubCategories(category) {
    const {
      subCategories,
      menSubCategory,
      womenSubCategory,
      electronicsSubCategory,
      foodSubCategory,
      subCategorySelected
    } = this.state;
    let subCategory = null;
    if (subCategorySelected === category) {
      if (subCategorySelected === subCategories[0]) {
        subCategory = menSubCategory;
      } else if (subCategorySelected === subCategories[1]) {
        subCategory = womenSubCategory;
      } else if (subCategorySelected === subCategories[2]) {
        subCategory = electronicsSubCategory;
      } else if (subCategorySelected === subCategories[3]) {
        subCategory = foodSubCategory;
      }
      return (
        <View>
          <Collapsible collapsed={this.state.collapsed} >
          <List
            dataArray={subCategory}
              renderRow={(subcategory) => {
                return (
                  <ListItem>
                    <TouchableWithoutFeedback
                      onPress={() => {
                        console.log('SubCategory: ');
                        console.log(`${subCategorySelected}:${subcategory}`);
                        Actions.drawerClose(); Actions.categoryScreen();
                      }}
                    >
                    <Left>
                      <Text style={{ color: 'white' }}>{subcategory}</Text>
                    </Left>
                    </TouchableWithoutFeedback>
                  </ListItem>
                );
              }
            }
          />
          </Collapsible>
        </View>
      );
    }
  }
  render() {
    const { categories } = this.state;
    const {
      categoriesListStyle,
      categoriesStyle,
      containerStyle,
      profileStyle,
      categoryStyle,
      iconStyle
    } = styles;
    return (
      <Container style={containerStyle}>
        <Content>
        <TouchableWithoutFeedback>
        <View style={profileStyle}>
          <View style={{ flexDirection: 'column', alignSelf: 'center' }}>
            <Text
            style={{ fontSize: responsiveFontSize(3), color: 'white' }}
            >
             Hello, Annu</Text>
            <Text
            style={{ fontSize: responsiveFontSize(2), color: 'white' }}
            >
            Reward Points:1234</Text>
            </View>
            <View style={{ paddingLeft: responsiveWidth(5) }}>
            <Thumbnail
             large
            source={{ uri: 'http://s3.amazonaws.com/cdn.roosterteeth.com/default/md/user_profile_male.jpg' }}
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
              <Text style={{ fontSize: responsiveFontSize(1.8), color: 'white' }}>Wish List</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => { Actions.drawerClose(); Actions.push('interestedScreen'); }}
          >
            <View style={{ flexDirection: 'column', flex: 1, alignItems: 'center' }}>
              <Icon style={{ color: 'white' }} ios='ios-thumbs-up' android="md-thumbs-up" />
              <Text
              style={{ fontSize: responsiveFontSize(1.8), color: 'white' }}
              >I am interested</Text>
            </View>
          </TouchableWithoutFeedback>
          </View>
          <View style={categoriesStyle}>
          <Text style={{ color: 'white', fontSize: responsiveFontSize(2) }}>Categories</Text>
          <View style={categoriesListStyle}>
            <View style={categoryStyle}>
              <View
                style={{
                  flexDirection: 'row',
                }}
              >
                <TouchableWithoutFeedback
                  onPress={() => {
                    console.log(`Category: ${categories[0]}`);
                    Actions.drawerClose(); Actions.categoryScreen();
                  }}
                >
                  <Left>
                    <Text style={{ color: 'white' }}>{categories[0]}</Text>
                  </Left>
                  </TouchableWithoutFeedback>
                  {this.renderArrow(categories[0])}
              </View>
              {this.renderSubCategories(categories[0])}
            </View>
            <View style={categoryStyle}>
              <View
                style={{
                  flexDirection: 'row',
                }}
              >
                <TouchableWithoutFeedback
                  onPress={() => {
                    console.log(`Category: ${categories[1]}`);
                    Actions.drawerClose(); Actions.categoryScreen();
                  }}
                >
                  <Left>
                    <Text style={{ color: 'white' }}>{categories[1]}</Text>
                  </Left>
                  </TouchableWithoutFeedback>
                  {this.renderArrow(categories[1])}
              </View>
              {this.renderSubCategories(categories[1])}
            </View>
            <View style={categoryStyle}>
              <View
                style={{
                  flexDirection: 'row',
                }}
              >
                <TouchableWithoutFeedback
                  onPress={() => {
                    console.log(`Category: ${categories[2]}`);
                    Actions.drawerClose(); Actions.categoryScreen();
                  }}
                >
                  <Left>
                    <Text style={{ color: 'white' }}>{categories[2]}</Text>
                  </Left>
                  </TouchableWithoutFeedback>
                  {this.renderArrow(categories[2])}
              </View>
              {this.renderSubCategories(categories[2])}
            </View>
            <View style={categoryStyle}>
              <View
                style={{
                  flexDirection: 'row',
                }}
              >
                <TouchableWithoutFeedback
                  onPress={() => {
                    console.log(`Category: ${categories[3]}`);
                    Actions.drawerClose(); Actions.categoryScreen();
                  }}
                >
                  <Left>
                    <Text style={{ color: 'white' }}>{categories[3]}</Text>
                  </Left>
                  </TouchableWithoutFeedback>
                  {this.renderArrow(categories[3])}
              </View>
              {this.renderSubCategories(categories[3])}
            </View>
            <View style={categoryStyle}>
              <View
                style={{
                  flexDirection: 'row',
                }}
              >
                <TouchableWithoutFeedback
                  onPress={() => {
                    console.log(`Category: ${categories[4]}`);
                    Actions.drawerClose(); Actions.categoryScreen();
                  }}
                >
                  <Left>
                    <Text style={{ color: 'white' }}>{categories[4]}</Text>
                  </Left>
                  </TouchableWithoutFeedback>
                  {this.renderArrow(categories[4])}
              </View>
              {this.renderSubCategories(categories[4])}
            </View>
            <View style={categoryStyle}>
              <View
                style={{
                  flexDirection: 'row',
                }}
              >
                <TouchableWithoutFeedback
                  onPress={() => {
                    console.log(`Category: ${categories[5]}`);
                    Actions.drawerClose(); Actions.categoryScreen();
                  }}
                >
                  <Left>
                    <Text style={{ color: 'white' }}>{categories[5]}</Text>
                  </Left>
                  </TouchableWithoutFeedback>
                  {this.renderArrow(categories[5])}
              </View>
              {this.renderSubCategories(categories[5])}
            </View>
            <View style={categoryStyle}>
              <View
                style={{
                  flexDirection: 'row',
                }}
              >
                <TouchableWithoutFeedback
                  onPress={() => {
                    console.log(`Category: ${categories[6]}`);
                    Actions.drawerClose(); Actions.categoryScreen();
                  }}
                >
                  <Left>
                    <Text style={{ color: 'white' }}>{categories[6]}</Text>
                  </Left>
                  </TouchableWithoutFeedback>
                  {this.renderArrow(categories[6])}
              </View>
              {this.renderSubCategories(categories[6])}
            </View>
            <View style={categoryStyle}>
              <View
                style={{
                  flexDirection: 'row',
                }}
              >
                <TouchableWithoutFeedback
                  onPress={() => {
                    console.log(`Category: ${categories[7]}`);
                    Actions.drawerClose(); Actions.categoryScreen();
                  }}
                >
                  <Left>
                    <Text style={{ color: 'white' }}>{categories[7]}</Text>
                  </Left>
                  </TouchableWithoutFeedback>
                  {this.renderArrow(categories[7])}
              </View>
              {this.renderSubCategories(categories[7])}
            </View>
          </View>
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
function mapStateToProps({ user }) {
    return {
        ...user
    };
}

function mapDispatchToProps(dispatch) {
    return {
        logoutUser: () => {
          return dispatch(logoutUser());
        },
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DrawerComponent);
