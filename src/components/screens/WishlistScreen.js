import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {
  Container,
  Content,
  Header,
  Button,
  Right,
  Title,
  Text,
  Left,
  View,
  Icon,
  Body,
} from 'native-base';
import { Actions } from 'react-native-router-flux';
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
import WishlistOfferCard from '../modules/WishlistOfferCard';

export default class WishlistScreen extends React.Component {
  renderWishlistFeatures() {
    return (
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
    );
  }
  render() {
    const {
      containerStyle,
      headerStyle,
      titleStyle
    } = styles;
    return (
      <Container style={containerStyle}>
      <Header
        style={headerStyle}
        iosBarStyle='light-content'
      >
        <Left style={{ flexDirection: 'row' }}>
          <Button transparent onPress={Actions.mainScreen}>
            <Icon style={{ color: 'white' }} ios='ios-arrow-back' android="md-arrow-back" />
          </Button>
          <Button transparent style={{ padding: 0 }} onPress={Actions.drawerOpen}>
            <Icon style={{ color: 'white' }} ios='ios-menu' android="md-menu" />
          </Button>
        </Left>
        <Body>
          <Title style={titleStyle}>Wishlist Screen</Title>
        </Body>
        <Right />
        </Header>
        <Content
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingTop: responsiveHeight(1),
            paddingLeft: responsiveWidth(2.5) }}
        >
          <WishlistOfferCard />
          <WishlistOfferCard />
          <WishlistOfferCard />
      </Content>
    </Container>
     );
   }
 }
const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: colors.white,
    marginTop: 20
  },
  headerStyle: {
    paddingTop: 0,
    backgroundColor: colors.headerColor,
    borderBottomColor: colors.headerColor
  },
  titleStyle: {
    fontWeight: 'bold',
    color: colors.white,
    textAlign: 'center',
    fontSize: responsiveFontSize(3),
    width: variables.SCREEN_WIDTH * 0.6
  },
});
