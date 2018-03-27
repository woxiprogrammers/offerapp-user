import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import {
  variables,
  // mixins,
  // colors,
 } from '../../styles';

export default class DrawerComponent extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignSelf: 'center', paddingTop: variables.SCREEN_HEIGHT / 2 }}>
        <Text style={{ alignSelf: 'center' }}>Hello, Tejas</Text>
        <TouchableOpacity onPress={() => { Actions.drawerClose(); Actions.mainScreen(); }}>
          <Text style={{ alignSelf: 'center' }}>Main Screen</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { Actions.drawerClose(); Actions.categoryScreen(); }}>
          <Text style={{ alignSelf: 'center' }}>Category Screen</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { Actions.drawerClose(); Actions.groupListingScreen(); }}>
          <Text style={{ alignSelf: 'center' }}>Group Listing Screen</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { Actions.drawerClose(); Actions.wishlistScreen(); }}>
          <Text style={{ alignSelf: 'center' }}>Wishlist Screen</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { Actions.drawerClose(); Actions.interestedScreen(); }}>
          <Text style={{ alignSelf: 'center' }}>I am Interested Screen</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { Actions.drawerClose(); Actions.loginScreen(); }}>
          <Text style={{ paddingTop: 25, alignSelf: 'center' }}>Log Out</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
