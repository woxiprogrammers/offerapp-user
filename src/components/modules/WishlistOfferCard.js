import React from 'react';
import {
  Text,
  View,
} from 'native-base';
import {
  TouchableOpacity,
  //StyleSheet
} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  // responsiveFontSize
} from 'react-native-responsive-dimensions';
import OfferCard from './OfferCard';

export default class WishlistOfferCard extends React.Component {
  render() {
    // const {} = styles;
    return (
      <View>
        <OfferCard />
        <View
          style={{
            width: responsiveWidth(95),
            flexDirection: 'row',
            height: responsiveHeight(8)
          }}
        >
          <TouchableOpacity
            style={{
              height: responsiveHeight(8),
              paddingTop: responsiveHeight(2),
              backgroundColor: '#D9E1F0',
              width: responsiveWidth(47.5),
            }}
          >
            <Text style={{ alignSelf: 'center' }}>Remove</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              height: responsiveHeight(8),
              paddingTop: responsiveHeight(2),
              backgroundColor: '#D0D8E6',
              width: responsiveWidth(47.5),
            }}
          >
            <Text style={{ alignSelf: 'center' }}>I am Interested</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

// const styles = StyleSheet.create({
// });
