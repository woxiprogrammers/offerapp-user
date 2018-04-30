import React from 'react';
import { Scene, Router, Drawer, Stack, Overlay } from 'react-native-router-flux';
import LoginScreen from './src/components/screens/authscreens/LoginScreen';
import ForgotPasswordMobileVerifyScreen from
'./src/components/screens/authscreens/ForgotPasswordMobileVerifyScreen';
import ForgotPasswordVerifyOtpScreen from
'./src/components/screens/authscreens/ForgotPasswordVerifyOtpScreen';
import ForgotPasswordScreen from './src/components/screens/authscreens/ForgotPasswordScreen';
import MobileVerifyScreen from './src/components/screens/authscreens/MobileVerifyScreen';
import OtpVerifyScreen from './src/components/screens/authscreens/OtpVerifyScreen';
import SignUpFillUpScreen from './src/components/screens/authscreens/SignUpFillUpScreen';
import MainScreen from './src/components/screens/mainscreens/MainScreen';
import ChangeLocationScreen from './src/components/screens/mainscreens/ChangeLocationScreen';
import CategoryScreen from './src/components/screens/categoryscreens/CategoryScreen';
import FilterScreen from './src/components/screens/categoryscreens/FilterScreen';
import SortByScreen from './src/components/screens/categoryscreens/SortByScreen';
import GroupListingScreen from './src/components/screens/groupscreens/GroupListingScreen';
import GroupScreen from './src/components/screens/groupscreens/GroupScreen';
import WishlistScreen from './src/components/screens/wishlistscreens/WishlistScreen';
import InterestedScreen from './src/components/screens/interestedscreens/InterestedScreen';
import DrawerComponent from './src/components/drawer/DrawerComponent';
import OfferDetailScreen from './src/components/screens/offerdetailscreens/OfferDetailSceen';
import ProfileEditScreen from './src/components/screens/profilescreens/ProfileEditScreen';
import ChangeMobileGetOtpScreen from
'./src/components/screens/profilescreens/ChangeMobileGetOtpScreen';
import ChangeMobileOtpVerifyScreen from
'./src/components/screens/profilescreens/ChangeMobileOtpVerifyScreen';
import ChangePasswordOtpVerifyScreen from
'./src/components/screens/profilescreens/ChangePasswordOtpVerifyScreen';
import ChangePasswordScreen from './src/components/screens/profilescreens/ChangePasswordScreen';
import ARScreen from './src/components/screens/arscreens/ARScreen';
import ARFilterScreen from './src/components/screens/arscreens/ARFilterScreen';
import ARListingScreen from './src/components/screens/arscreens/ARListingScreen';

class RouterComponent extends React.Component {
  render() {
    return (
      <Router sceneStyle={{ paddingTop: 0 }}>
        <Overlay key="overlay">
          <Scene key="root">
          <Scene key="auth">
            <Scene hideNavBar key="loginScreen" component={LoginScreen} />
            <Scene
              hideNavBar
              key="forgotPasswordMobileVerifyScreen"
              component={ForgotPasswordMobileVerifyScreen}
            />
            <Scene
              hideNavBar
              key="forgotPasswordVerifyOtpScreen"
              component={ForgotPasswordVerifyOtpScreen}
            />
            <Scene
              hideNavBar
              key="forgotPasswordScreen"
              component={ForgotPasswordScreen}
            />
            <Scene hideNavBar key="mobileVerifyScreen" component={MobileVerifyScreen} />
            <Scene hideNavBar key="verifyOtpScreen" component={OtpVerifyScreen} />
            <Scene hideNavBar key="signUpFillUpScreen" component={SignUpFillUpScreen} />
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
                  <Scene hideNavBar key="arScreen" component={ARScreen} />
                  <Scene hideNavBar key="arFilterScreen" component={ARFilterScreen} />
                  <Scene hideNavBar key="arListingSceen" component={ARListingScreen} />
                  <Scene hideNavBar key="changeLocationScreen" component={ChangeLocationScreen} />
                  <Scene hideNavBar key="offerDetailScreen" component={OfferDetailScreen} />
                  <Scene hideNavBar key="categoryScreen" component={CategoryScreen} />
                  <Scene hideNavBar key="filterScreen" component={FilterScreen} />
                  <Scene hideNavBar key="sortByScreen" component={SortByScreen} />
                  <Scene hideNavBar key="groupListingScreen" component={GroupListingScreen} />
                  <Scene hideNavBar key="groupScreen" component={GroupScreen} />
                  <Scene hideNavBar key="wishlistScreen" component={WishlistScreen} />
                  <Scene hideNavBar key="interestedScreen" component={InterestedScreen} />
                  <Scene hideNavBar key="profileEditScreen" component={ProfileEditScreen} />
                  <Scene
                    hideNavBar
                    key="changeMobileGetOtpScreen"
                    component={ChangeMobileGetOtpScreen}
                  />
                  <Scene
                    hideNavBar
                    key="changeMobileOtpVerifyScreen"
                    component={ChangeMobileOtpVerifyScreen}
                  />
                  <Scene
                    hideNavBar
                    key="changePasswordOtpVerifyScreen"
                    component={ChangePasswordOtpVerifyScreen}
                  />
                  <Scene hideNavBar key="changePasswordScreen" component={ChangePasswordScreen} />
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
