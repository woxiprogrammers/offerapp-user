import React from 'react';
import { StyleSheet, TouchableWithoutFeedback } from 'react-native';
import {
  Container,
  Thumbnail,
  ListItem,
  // Header,
  Content,
  // Spinner,
  // Button,
  Right,
  // Title,
  // Left,
  View,
  List,
  Icon,
  Body,
  Text,
} from 'native-base';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from 'react-native-responsive-dimensions';
import {
  // variables,
  // mixins,
  colors,
 } from '../../styles';


export default class DrawerComponent extends React.Component {
  render() {
    const items = ['Fashion', 'Electronics', 'Food', 'Footwear'];
    const {
      categoriesListStyle,
      categoriesStyle,
      containerStyle,
      profileStyle,
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
          <TouchableWithoutFeedback>
            <View style={{ flexDirection: 'column', flex: 1, alignItems: 'center' }}>
              <Icon style={{ color: 'white' }} ios='ios-people' android="md-people" />
              <Text style={{ fontSize: responsiveFontSize(1.8), color: 'white' }}>Groups</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback>
            <View style={{ flexDirection: 'column', flex: 1, alignItems: 'center' }}>
              <Icon style={{ color: 'white' }} ios='ios-heart' android="md-heart" />
              <Text style={{ fontSize: responsiveFontSize(1.8), color: 'white' }}>Wish List</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback>
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
            <List
            dataArray={items}
              renderRow={(item) => {
                return (
                  <TouchableWithoutFeedback>
                    <ListItem>
                      <Body>
                        <Text style={{ color: 'white' }}>{item}</Text>
                      </Body>
                      <Right>
                        <Icon
                          style={{ color: 'white' }}
                          ios='ios-arrow-down'
                          android="md-arrow-dropdown"
                        />
                      </Right>
                    </ListItem>
                  </TouchableWithoutFeedback>
                );
              }
              }
            />
          </View>
          </View>
          <View style={{ paddingTop: responsiveHeight(5), paddingLeft: responsiveWidth(5) }}>
          <Text style={{ color: 'white' }}>Log Out</Text>
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
    marginLeft: responsiveWidth(-5)
    }

});
