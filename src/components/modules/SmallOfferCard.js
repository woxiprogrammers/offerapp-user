import React, { Component } from 'react';
import {
  CardItem,
  // Right,
  // Body,
  Text,
  Left,
  // View,
  Card
} from 'native-base';
import { TouchableOpacity, StyleSheet } from 'react-native';
import {
  // responsiveHeight,
  // responsiveWidth,
  responsiveFontSize
} from 'react-native-responsive-dimensions';
import AHImage from 'react-native-auto-height-image';
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
     const {
       offerId,
       offerPic,
       offerName,
       sellerInfo,
       // offerExpiry
    } = this.props.offerDetails;
     return (
       <TouchableOpacity onPress={() => { console.log(`OfferId Clicked: ${offerId}`); }}>
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
                fontSize: responsiveFontSize(2.8) }}
            >{offerName}</Text>
            <Text
              style={{
                marginLeft: normalize.normalize(7),
                alignSelf: 'flex-start',
                fontSize: responsiveFontSize(1.9) }}
            >{sellerInfo}</Text>
            </Left>
          </CardItem>
          <CardItem cardBody>
            <AHImage
              source={{ uri: offerPic }}
              width={(variables.SCREEN_WIDTH * 0.45)}
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
