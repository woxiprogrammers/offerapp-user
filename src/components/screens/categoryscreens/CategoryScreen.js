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
  responsiveWidth,
  responsiveFontSize
} from 'react-native-responsive-dimensions';
import {
  //variables,
  // mixins,
  colors,
} from '../../../styles';
import ListingTab from '../../tabs/ListingTab';
import MapTab from '../../tabs/MapTab';

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
            <Button transparent onPress={() => { Actions.popTo('mainScreen'); }}>
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
            {/*<Button transparent>
              <Icon style={{ color: 'white' }} ios='ios-pin' android="md-pin" />
            </Button>**/}
          </Right>
        </Header>
        <View style={{ flex: 1 }}>
          <Tabs
          initialPage={0}
          locked
          tabBarUnderlineStyle={{
            backgroundColor: 'white', height: responsiveHeight(0.3)
          }}
          >
            <Tab
              heading={
                <TabHeading style={{ backgroundColor: '#3b5998' }}>
                  <Icon style={{ color: '#fafafa' }} name="list" />
                    <Text style={{ color: '#fafafa' }}>Listing</Text>
                </TabHeading>}
            >
              <ListingTab />
              <View
              style={{ flexDirection: 'row',
              height: responsiveHeight(8),
               backgroundColor: colors.lightGray }}
              >
              <TouchableOpacity
                onPress={() => { Actions.push('sortByScreen'); }}
                style={{ flex: 1, alignSelf: 'center' }}
              >
                  <Text style={{ alignSelf: 'center', color: '#000000' }}>Sort By</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => { Actions.push('filterScreen', { initialPage: 0 }); }}
                  style={{ flex: 1, alignSelf: 'center' }}
                >
                  <Text style={{ alignSelf: 'center', color: '#000000' }}>Filter</Text>
                </TouchableOpacity>
              </View>
            </Tab>
            <Tab
              heading={
                <TabHeading style={{ backgroundColor: '#3b5998' }}>
                  <Icon style={{ color: '#fafafa' }} name="map" />
                    <Text style={{ color: '#fafafa' }}>Map</Text>
                </TabHeading>}
            >
              <MapTab />
              <View style={{ flexDirection: 'row', height: responsiveHeight(8) }}>
                <TouchableOpacity
                  onPress={() => { Actions.push('filterScreen', { initialPage: 1 }); }}
                  style={{ flex: 1, alignSelf: 'center' }}
                >
                  <Text style={{ alignSelf: 'center' }}>Filter</Text>
                </TouchableOpacity>
              </View>
            </Tab>
          </Tabs>
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
     width: responsiveWidth(60)
   },
 });
