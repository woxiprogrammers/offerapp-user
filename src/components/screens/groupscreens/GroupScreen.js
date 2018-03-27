import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  ScrollView
} from 'react-native';
import {
  Container,
  Content,
  Header,
  Button,
  Right,
  Title,
  Left,
  View,
  Icon,
  Body,
  Text,
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
} from '../../../styles';
import GroupOfferCard from '../../modules/GroupOfferCard';

export default class GroupScreen extends React.Component {
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
          <Button transparent onPress={Actions.groupListingScreen}>
            <Icon style={{ color: 'white' }} ios='ios-arrow-back' android="md-arrow-back" />
          </Button>
          <Button transparent style={{ padding: 0 }} onPress={Actions.drawerOpen}>
            <Icon style={{ color: 'white' }} ios='ios-menu' android="md-menu" />
          </Button>
        </Left>
        <Body>
          <Title style={titleStyle}>Group List Screen</Title>
        </Body>
        <Right />
        </Header>
        <Content
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingTop: responsiveHeight(1),
            paddingLeft: responsiveWidth(2.5) }}
        >
          <GroupOfferCard />
          <GroupOfferCard />
          <GroupOfferCard />
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
