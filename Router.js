import React from 'react';
import { Scene, Router, Drawer, Stack, Overlay } from 'react-native-router-flux';
import LoginScreen from './src/components/screens/authscreens/LoginScreen';
import MainScreen from './src/components/screens/mainscreens/MainScreen';
import ChangeLocationScreen from './src/components/screens/mainscreens/ChangeLocationScreen';
import CategoryScreen from './src/components/screens/categoryscreens/CategoryScreen';
import FilterScreen from './src/components/screens/categoryscreens/FilterScreen';
import SortByScreen from './src/components/screens/categoryscreens/SortByScreen';
import GroupListingScreen from './src/components/screens/groupscreens/GroupListingScreen';
import GroupScreen from './src/components/screens/groupscreens/GroupScreen';
import WishlistScreen from './src/components/screens/WishlistScreen';
import InterestedScreen from './src/components/screens/interestedscreens/InterestedScreen';
import DrawerComponent from './src/components/drawer/DrawerComponent';

class RouterComponent extends React.Component {
  render() {
    return (
      <Router sceneStyle={{ paddingTop: 0 }}>
        <Overlay key="overlay">
          <Scene key="root">
          <Scene key="auth">
            <Scene hideNavBar key="loginScreen" component={LoginScreen} />
          </Scene>
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
                  <Scene hideNavBar key="changeLocationScreen" component={ChangeLocationScreen} />
                  <Scene hideNavBar key="categoryScreen" component={CategoryScreen} />
                  <Scene hideNavBar key="filterScreen" component={FilterScreen} />
                  <Scene hideNavBar key="sortByScreen" component={SortByScreen} />
                  <Scene hideNavBar key="groupListingScreen" component={GroupListingScreen} />
                  <Scene hideNavBar key="groupScreen" component={GroupScreen} />
                  <Scene hideNavBar key="wishlistScreen" component={WishlistScreen} />
                  <Scene hideNavBar key="interestedScreen" component={InterestedScreen} />
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
