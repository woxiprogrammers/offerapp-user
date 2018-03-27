import React, { Component } from 'react';
import {
  CardItem,
  // Button,
  // Right,
  // Body,
  // Icon,
  Text,
  Left,
  // View,
  Card
} from 'native-base';
import AHImage from 'react-native-auto-height-image';
import { TouchableOpacity, StyleSheet } from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from 'react-native-responsive-dimensions';
import {
  normalize,
  variables,
  // mixins,
  colors,
 } from '../../styles';

 export default class GroupOfferCard extends Component {
   render() {
     const {
       cardHeaderStyle,
       cardBodyStyle,
       cardStyle,
     } = styles;
     return (
       <TouchableOpacity style={{ marginBottom: responsiveHeight(-0.5) }}>
        <Card style={cardStyle}>
          <CardItem style={cardHeaderStyle}>
          <Left
            style={{
              alignSelf: 'flex-start',
              flexDirection: 'column',
              alignItems: 'flex-start',
             }}
          >
            <Text
              style={{
                marginLeft: normalize.normalize(7),
                alignSelf: 'flex-start',
                fontSize: responsiveFontSize(3) }}
            >Buy 2 Get 1 Free</Text>
            <Text
              style={{
                marginLeft: normalize.normalize(7),
                alignSelf: 'flex-start',
                fontSize: responsiveFontSize(2) }}
            >Adidas, Kothrud</Text>
            </Left>
          </CardItem>
          <CardItem cardBody style={cardBodyStyle}>
            <AHImage
              source={{ uri: 'http://offers.droom.in/wp-content/uploads/2016/08/offer-page.jpg' }}
              width={responsiveWidth(95)}
            />
          </CardItem>
        </Card>
       </TouchableOpacity>
     );
   }
}

const styles = StyleSheet.create({
  cardStyle: {
    flex: 1,
    marginLeft: 0,
    marginRight: 10,
    width: (variables.SCREEN_WIDTH * 0.95)
  },
  cardHeaderStyle: {
    backgroundColor: colors.smallOfferCardHeader,
    paddingRight: 0,
    paddingLeft: 0,
    paddingTop: 5,
    height: variables.SCREEN_HEIGHT * 0.1
  },
  cardBodyStyle: {
    flex: 1,
    paddingRight: 0,
    paddingLeft: 0,
  },
});
