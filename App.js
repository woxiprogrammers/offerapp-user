import React from 'react';
import { Provider } from 'react-redux';
import { Root } from 'native-base';
import Router from './Router';
import store from './src/store';

export default class App extends React.Component {
  render() {
    // console.disableYellowBox = true;
    return (
      <Root>
        <Provider store={store}>
          <Router />
        </Provider>
      </Root>
    );
  }
}
