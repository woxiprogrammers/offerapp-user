import React, { Component } from 'react';
import {
  StyleSheet,
  // Image,
  // TouchableHighlight
} from 'react-native';
import {
  Container,
  Content,
  // Header,
  // Button,
  // Right,
  // Title,
  // Left,
  // View,
  // Icon,
  // Body,
  // Text,
} from 'native-base';
// import { Actions } from 'react-native-router-flux';
import {
  responsiveHeight,
  responsiveWidth,
  // responsiveFontSize
} from 'react-native-responsive-dimensions';
import {
  // variables,
  // mixins,
  colors,
 } from '../../styles';
import ListingOfferCard from '../modules/ListingOfferCard';


export default class ListingTab extends Component {

  render() {
    const {
      containerStyle
    } = styles;
    return (
      <Container style={containerStyle}>
        <Content
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingTop: responsiveHeight(1),
            paddingLeft: responsiveWidth(2.5),
          }}
        >
            <ListingOfferCard />
            <ListingOfferCard />
        </Content>
       </Container>
     );
   }
 }
const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: colors.white,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
