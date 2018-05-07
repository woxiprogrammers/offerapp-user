import React, { Component } from 'react';
import {
  CardItem,
  Right,
  Text,
  Left,
  View,
  Card
} from 'native-base';
import { Actions } from 'react-native-router-flux';
import { TouchableOpacity, StyleSheet } from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from 'react-native-responsive-dimensions';
import {
  normalize,
  colors
 } from '../../styles';

 export default class MapOfferCard extends Component {
   render() {
     const {
       cardBodyStyle,
       cardStyle,
     } = styles;
     const {
       offerId,
       offerName,
       sellerInfo,
       offerAddress,
       offerDistance,
       // offerExpiry
    } = this.props.offerDetails;
     return (
        <TouchableOpacity
          onPress={() => { Actions.push('offerDetailScreen', { getOffer: offerId }); }}
          style={{
            backgroundColor: '#1E2D3E',
            height: responsiveHeight(16.5),
            marginTop: responsiveHeight(-1) }}
        >
        <Card style={cardStyle}>
          <CardItem cardBody style={cardBodyStyle}>
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
                  marginTop: responsiveHeight(0.1),
                  alignSelf: 'flex-start',
                  fontSize: responsiveFontSize(2) }}
              >{sellerInfo}</Text>
              <Text
                style={{
                  marginLeft: normalize.normalize(7),
                  marginTop: responsiveHeight(0.3),
                  alignSelf: 'flex-start',
                  fontSize: responsiveFontSize(1.5),
                  width: responsiveWidth(75),
                  textAlign: 'left' }}
              >{offerAddress}</Text>
              </Left>
              <View>
                <Right>
                  <Text
                    style={{
                      marginRight: normalize.normalize(7),
                      marginTop: responsiveHeight(0),
                      alignSelf: 'flex-end',
                      fontSize: responsiveFontSize(2) }}
                  >{offerDistance} Km</Text>
                </Right>
              </View>
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
    width: responsiveWidth(100)
  },
  cardBodyStyle: {
    backgroundColor: colors.white,
    paddingRight: 0,
    paddingLeft: 0,
    paddingTop: 5,
    height: responsiveHeight(15),
  },
});
