import React from 'react';
import {
  CardItem,
  Button,
  Right,
  // Body,
  Icon,
  Text,
  Left,
  View,
  Card
} from 'native-base';
import {
  TouchableOpacity,
  //StyleSheet
} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from 'react-native-responsive-dimensions';
import {
  variables,
  // mixins,
  colors,
} from '../../styles';
import GroupOfferCard from './GroupOfferCard';

export default class InterestedOfferCard extends React.Component {
  render() {
    // const {} = styles;
    return (
      <View>
        <GroupOfferCard />
        <View
          style={{
            width: responsiveWidth(95),
            flexDirection: 'row',
            height: responsiveHeight(8)
          }}
        >
          <View
            style={{
              height: responsiveHeight(8),
              paddingTop: responsiveHeight(2),
              backgroundColor: '#D9E1F0',
              width: responsiveWidth(47.5),
            }}
          >
            <Text style={{ alignSelf: 'center' }}>Offer Id: #abc123</Text>
          </View>
          <TouchableOpacity
            style={{
              height: responsiveHeight(8),
              paddingTop: responsiveHeight(2),
              backgroundColor: '#D0D8E6',
              width: responsiveWidth(47.5),
            }}
          >
            <Text style={{ alignSelf: 'center' }}>Grab Offer</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

// const styles = StyleSheet.create({
// });
