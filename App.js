import React from 'react';
import { Provider } from 'react-redux';
import Router from './Router';
import store from './src/store';


export default class App extends React.Component {
  render() {
    // console.disableYellowBox = true;
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}
