import React, { Component } from 'react';
import {
  CardItem,
  Right,
  Text,
  Left,
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
  colors,
 } from '../../styles';

 export default class OfferCard extends Component {
   render() {
     const {
       cardHeaderStyle,
       cardBodyStyle,
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
       <TouchableOpacity
        onPress={() => { console.log(`OfferId: ${offerId}`); }}
       >
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
            >{offerName}</Text>
            <Text
              style={{
                marginLeft: normalize.normalize(7),
                alignSelf: 'flex-start',
                fontSize: responsiveFontSize(2) }}
            >{sellerInfo}</Text>
            </Left>
            <Right />
          </CardItem>
          <CardItem cardBody style={cardBodyStyle}>
            <AHImage
              source={{ uri: offerPic }}
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
    width: responsiveWidth(95)
  },
  cardHeaderStyle: {
    backgroundColor: colors.smallOfferCardHeader,
    paddingRight: 0,
    paddingLeft: 0,
    paddingTop: 5,
    height: responsiveHeight(10)
  },
  cardBodyStyle: {
    flex: 1,
    paddingRight: 0,
    paddingLeft: 0,
  },
});
