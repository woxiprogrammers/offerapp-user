import React from 'react';
import { ImageBackground } from 'react-native';
import Expo from 'expo';
import {
  Container,
  Content,
  Spinner,
  View,
  Text,
} from 'native-base';
import Roboto from 'native-base/Fonts/Roboto.ttf';
import RobotoMedium from 'native-base/Fonts/Roboto_medium.ttf';
import Ionicons from '@expo/vector-icons/fonts/Ionicons.ttf';
import {
  responsiveHeight,
  responsiveWidth
} from 'react-native-responsive-dimensions';
import { connect } from 'react-redux';
import backgroundImage from '../../../assets/images/BackgroundImage.png';
import { checkLoggedIn } from '../../../actions';

class WelcomeScreen extends React.Component {
  async componentWillMount() {
    await Expo.Font.loadAsync({
      Roboto,
      Roboto_medium: RobotoMedium,
      Ionicons,
    });
    await this.props.checkLoggedIn();
}
  render() {
    const {
      backgroundImageStyle,
      containerStyle,
      textStyle,
      welcomeStyle
      } = styles;
        return (
          <View>
          <ImageBackground
            style={backgroundImageStyle}
            source={backgroundImage}
          >
          <Container style={containerStyle}>
            <Content style={{ paddingTop: 0 }}>
              <View style={welcomeStyle} >
                <Text style={textStyle}>Offer App</Text>
                <Spinner color="white" />
              </View>
            </Content>
          </Container>
          </ImageBackground>
          </View>
        );
  }
}
const styles = {
 welcomeStyle: {
   height: responsiveHeight(100),
   width: responsiveWidth(100),
    paddingTop: 0,
    // backgroundColor: '#f93450',
    // borderBottomColor: '#f93450',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
 },
 textStyle: {
   fontWeight: 'bold',
   color: 'white',
   textAlign: 'center',
   fontSize: 50,
   alignSelf: 'center',
 },
 containerStyle: {
   backgroundColor: 'rgba(0, 0, 0, 0)'
 },
 backgroundImageStyle: {
   height: responsiveHeight(100),
   width: responsiveWidth(100)
 }
};

export default connect(null, { checkLoggedIn })(WelcomeScreen);
