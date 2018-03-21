import React from 'react';
import Expo from 'expo';
import Roboto from 'native-base/Fonts/Roboto.ttf';
import RobotoMedium from 'native-base/Fonts/Roboto_medium.ttf';
import Ionicons from '@expo/vector-icons/fonts/Ionicons.ttf';
import Router from './Router';

export default class App extends React.Component {
  constructor() {
      super();
      this.state = {
        isReady: false
      };
    }
    async componentWillMount() {
      await Expo.Font.loadAsync({
        Roboto,
        Roboto_medium: RobotoMedium,
        Ionicons,
      });
      this.setState({ isReady: true });
  }
  render() {
    if (this.state.isReady) {
      return (
        <Router />
      );
  }
  return null;
  }
}
