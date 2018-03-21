import React from 'react';
import { Scene, Router, Drawer, Stack, Overlay } from 'react-native-router-flux';
import MainScreen from './src/components/screens/MainScreen';
import CategoryScreen from './src/components/screens/CategoryScreen';
import GroupListingScreen from './src/components/screens/GroupListingScreen';
import GroupScreen from './src/components/screens/GroupScreen';
import WishlistScreen from './src/components/screens/WishlistScreen';
import DrawerComponent from './src/components/drawer/DrawerComponent';

class RouterComponent extends React.Component {
  render() {
    console.log('Router Running !!');
    return (
      <Router sceneStyle={{ paddingTop: 0 }}>
        <Overlay key="overlay">
          <Scene key="root">
            <Drawer
              hideNavBar
              key="drawer"
              contentComponent={DrawerComponent}
            >
              <Scene hideNavBar panHandlers={null} key="mainroot">
                <Stack key="mainstack">
                  <Scene
                    initial
                    hideNavBar
                    key="mainScreen"
                    component={MainScreen}
                  />
                  <Scene hideNavBar key="categoryScreen" component={CategoryScreen} />
                  <Scene hideNavBar key="groupListingScreen" component={GroupListingScreen} />
                  <Scene hideNavBar key="groupScreen" component={GroupScreen} />
                  <Scene hideNavBar key="wishlistScreen" component={WishlistScreen} />
                </Stack>
              </Scene>
            </Drawer>
          </Scene>
        </Overlay>
      </Router>
    );
  }
}
export default RouterComponent;
