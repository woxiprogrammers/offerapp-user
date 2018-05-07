import React, { Component } from 'react';
import {
  CardItem,
  Text,
  Left,
  Card
} from 'native-base';
import AHImage from 'react-native-auto-height-image';
import { Actions } from 'react-native-router-flux';
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

 export default class GroupOfferCard extends Component {
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
        onPress={() => { Actions.push('offerDetailScreen', { getOffer: offerId }); }}
        style={{ marginBottom: responsiveHeight(-0.5) }}
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
    width: responsiveWidth(95),
    marginRight: 10,
    marginLeft: 0,
    flex: 1,
  },
  cardHeaderStyle: {
    backgroundColor: colors.smallOfferCardHeader,
    height: responsiveHeight(10),
    paddingRight: 0,
    paddingLeft: 0,
    paddingTop: 5,
  },
  cardBodyStyle: {
    paddingRight: 0,
    paddingLeft: 0,
    flex: 1,
  },
});
