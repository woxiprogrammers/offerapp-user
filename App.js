  import React from 'react';
import Expo from 'expo';
import Roboto from 'native-base/Fonts/Roboto.ttf';
import RobotoMedium from 'native-base/Fonts/Roboto_medium.ttf';
import Ionicons from '@expo/vector-icons/fonts/Ionicons.ttf';
import { Provider } from 'react-redux';
import Router from './Router';
import store from './src/store';

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
    // console.disableYellowBox = true;
    if (this.state.isReady) {
      return (
        <Provider store={store}>
          <Router />
        </Provider>
      );
  }
  return null;
  }
}
