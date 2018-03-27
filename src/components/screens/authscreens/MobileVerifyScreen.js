import React from 'react';
import { StyleSheet, ImageBackground, Picker } from 'react-native';
import {
  Container,
  Header,
  Content,
  Button,
  Right,
  Title,
  Label,
  Form,
  Item,
  Left,
  View,
  Icon,
  Body,
  Text,

} from 'native-base';
import { Actions } from 'react-native-router-flux';
import {
  variables,
  // mixins,
  colors,
} from '../../../styles';
 import backgroundImage from '../../../assets/images/BackgroundImage.png';

export default class MobileVerifyScreen extends React.Component {
  render() {
    const {
      backgroundImageStyle,
      containerStyle,
      textStyle,
      contentStyle,
      pickerStyle,
      itemStyle,
      formStyle,
      itemViewStyle,
      getotpStyle,
      headerStyle,
      titleStyle
    } = styles;
    return (
      <View>
      <ImageBackground
      style={backgroundImageStyle}
        source={backgroundImage}
      >
      <Container style={containerStyle}>
        <Header
          style={headerStyle}
          iosBarStyle='light-content'
        >
          <Left style={{ marginRight: -(variables.SCREEN_WIDTH / 4) }}>
            <Button transparent>
              <Icon style={{ color: 'white' }} ios='ios-arrow-back' android="md-arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title style={titleStyle}>Sign Up-Step 1</Title>
          </Body>
          <Right style={{ marginLeft: -(variables.SCREEN_WIDTH / 4) }} />
        </Header>
        <Content contentContainerStyle={contentStyle}>
        <View>
          <Text style={textStyle}>Verify your number</Text>
        </View>
        <View>

          <Form style={formStyle}>

            <View style={itemViewStyle}>
            <Picker
             style={pickerStyle}
              mode='dropdown'
              selectedValue={+91}
            >
              <Picker.Item label="+91" value="+91" />
              <Picker.Item label="+92" value="+92" />
              <Picker.Item label="+93" value="+93" />
              <Picker.Item label="+94" value="+94" />
            </Picker>
            <Item floatingLabel style={itemStyle}>
              <Label> Enter your number</Label>
            </Item>
            </View>
          </Form>
      </View>
        <View>
          <Button style={getotpStyle} onPress={Actions.otpVerifyScreen}>
            <Text>GET OTP</Text>
          </Button>
        </View>
        </Content>
      </Container>
      </ImageBackground>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  containerStyle: {
    marginTop: 20,
      backgroundColor: colors.transparent
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
    fontSize: 18,
    width: variables.LOGIN_BUTTON_WIDTH,
  },
  backgroundImageStyle: {
    height: variables.SCREEN_HEIGHT,
    width: variables.SCREEN_WIDTH
  },
  contentStyle: {
    alignItems: 'center',

  },
  textStyle: {
     color: 'white',
     textAlign: 'center',
     fontSize: variables.SCREEN_HEIGHT / 30,
     marginTop: variables.SCREEN_HEIGHT / 20
  },
  getotpStyle: {

     backgroundColor: colors.login,
     marginTop: variables.SCREEN_HEIGHT / 10
  },
  pickerStyle: {
    //backgroundColor: colors.lightGrayTransparent,
    width: variables.SCREEN_WIDTH * 0.3,
      marginTop: 10,
      paddingBottom: 10,
  },
  formStyle: {
    alignItems: 'center',
    width: variables.LOGIN_BUTTON_WIDTH,
     marginTop: variables.SCREEN_HEIGHT / 10,
     flexDirection: 'row',
     backgroundColor: colors.lightGrayTransparent,
  },
  itemViewStyle: {
    //backgroundColor: colors.lightGrayTransparent,
    marginTop: 9,
    paddingBottom: 10,
    width: variables.SCREEN_WIDTH * 0.7,
    flexDirection: 'row',
  },
  itemStyle: {
    width: variables.LOGIN_BUTTON_WIDTH * 0.6,
    alignSelf: 'center',
    marginTop: -variables.SCREEN_HEIGHT / 30
  },

});
