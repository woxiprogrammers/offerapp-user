import React, { Component } from 'react';
import {
  StyleSheet,
  // Image,
  // ScrollView,
  TouchableOpacity,
  // TouchableWithoutFeedback
 } from 'react-native';
import {
  TabHeading,
  Container,
  Header,
  // Content,
  Button,
  Right,
  Title,
  Left,
  Tabs,
  View,
  Icon,
  Body,
  Text,
  Tab,
} from 'native-base';
import { Actions } from 'react-native-router-flux';
import {
  responsiveHeight,
  // responsiveWidth,
  responsiveFontSize
} from 'react-native-responsive-dimensions';
import {
  variables,
  // mixins,
  colors,
} from '../../../styles';
import ListingTab from '../../tabs/ListingTab';
import MapTab from '../../tabs/MapTab';
import ARTAb from '../../tabs/ARTab';

export default class CategoryScreen extends Component {
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
          hasTabs
        >
          <Left style={{ flexDirection: 'row' }}>
            <Button transparent onPress={Actions.mainScreen}>
              <Icon style={{ color: 'white' }} ios='ios-arrow-back' android="md-arrow-back" />
            </Button>
            <Button transparent onPress={Actions.drawerOpen}>
              <Icon style={{ color: 'white' }} ios='ios-menu' android="md-menu" />
            </Button>
          </Left>
          <Body>
            <Title style={titleStyle}>Category Screen</Title>
          </Body>
          <Right>
            <Button transparent>
            <Icon style={{ color: 'white' }} ios='ios-pin' android="md-pin" />
            </Button>
          </Right>
        </Header>
        <View style={{ flex: 1 }}>
          <Tabs initialPage={1} locked>
            <Tab
              heading={
                <TabHeading style={{ backgroundColor: '#EFF2F7' }}>
                  <Icon name="list" />
                    <Text>Listing</Text>
                </TabHeading>}
            >
              <ListingTab />
            </Tab>
            <Tab
              heading={
                <TabHeading style={{ backgroundColor: '#EFF2F7' }}>
                  <Icon name="map" />
                    <Text>Map</Text>
                </TabHeading>}
            >
              <MapTab />
            </Tab>
            <Tab
              heading={
                <TabHeading style={{ backgroundColor: '#EFF2F7' }}>
                  <Icon name="eye" />
                    <Text>AR</Text>
                </TabHeading>}
            >
                <ARTAb />
            </Tab>
          </Tabs>
        </View>
        <View style={{ flexDirection: 'row', height: responsiveHeight(7) }}>
        <TouchableOpacity
          onPress={() => { Actions.push('sortByScreen'); }}
          style={{ flex: 1, alignSelf: 'center' }}
        >
            <Text style={{ alignSelf: 'center' }}>Sort By</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => { Actions.push('filterScreen'); }}
            style={{ flex: 1, alignSelf: 'center' }}
          >
            <Text style={{ alignSelf: 'center' }}>Filter</Text>
          </TouchableOpacity>
        </View>
       </Container>
     );
   }
 }
 const styles = StyleSheet.create({
   containerStyle: {
     backgroundColor: colors.black,
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
