import React, { Component } from 'react';
import {
  CardItem,
  Text,
  Left,
  Card
} from 'native-base';
import { TouchableOpacity, StyleSheet } from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from 'react-native-responsive-dimensions';
import { Actions } from 'react-native-router-flux';
import AHImage from 'react-native-auto-height-image';
import {
  normalize,
  colors,
} from '../../styles';
import { IMAGEURL } from '../../constants';

export default class SmallOfferCard extends Component {
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
        onPress={() => {
          console.log('Going to OfferDetail:');
          console.log(offerId);
          Actions.push('offerDetailScreen', { getOffer: offerId });
        }}
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
                  fontSize: responsiveFontSize(2.8) }}
              >{offerName}</Text>
              <Text
                style={{
                  marginLeft: normalize.normalize(7),
                  alignSelf: 'flex-start',
                  fontSize: responsiveFontSize(1.9) }}
              >
                {sellerInfo}
              </Text>
            </Left>
          </CardItem>
          <CardItem cardBody style={cardBodyStyle}>
            <AHImage
              source={{ uri: `${IMAGEURL}${offerPic}` }}
              width={responsiveWidth(45)}
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
    marginRight: responsiveWidth(2.5),
    width: responsiveWidth(45) + responsiveWidth(1) // 15 for right side padding
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
    justifyContent: 'center',
    alignItems: 'center'
  },
});
