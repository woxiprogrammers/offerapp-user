import React, { Component } from 'react';
import {
  CardItem,
  // Right,
  // Body,
  Text,
  Left,
  View,
  Card
} from 'native-base';
import { TouchableOpacity, StyleSheet } from 'react-native';
import {
  // responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from 'react-native-responsive-dimensions';
import {
  normalize,
  variables,
  // mixins,
  colors,
 } from '../../styles';

 export default class SmallOfferCard extends Component {
   render() {
     const {
       cardHeaderStyle,
       cardStyle,
     } = styles;
     return (
       <TouchableOpacity>
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
          <CardItem cardBody>
            <View style={{ backgroundColor: '#C0CCDA' }} />
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
    width: (variables.SCREEN_WIDTH * 0.45) + 15 // 15 for right side padding
  },
  cardHeaderStyle: {
    backgroundColor: colors.smallOfferCardHeader,
    paddingRight: 0,
    paddingLeft: 0,
    paddingTop: 5,
    height: variables.SCREEN_HEIGHT * 0.1
  },
});
