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
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from 'react-native-responsive-dimensions';
import {
//  variables,
  colors,
} from '../../../styles';
 import backgroundImage from '../../../assets/images/BackgroundImage.png';

export default class MobileVerifyScreen extends React.Component {
  render() {
    const {
      backgroundImageStyle,
      containerStyle,
      itemViewStyle,
      contentStyle,
      pickerStyle,
      getotpStyle,
      headerStyle,
      titleStyle,
      textStyle,
      itemStyle,
      formStyle,
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
              <Left style={{ marginRight: -(responsiveWidth(30)) }}>
                <Button transparent onPress={Actions.pop}>
                  <Icon style={{ color: 'white' }} ios='ios-arrow-back' android="md-arrow-back" />
                </Button>
              </Left>
              <Body>
                <Title style={titleStyle}>Sign Up-Step 1</Title>
              </Body>
              <Right style={{ marginLeft: -(responsiveWidth(25)) }} />
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
    backgroundColor: colors.transparent,
    marginTop: 20,
  },
  headerStyle: {
    borderBottomColor: colors.headerColor,
    backgroundColor: colors.headerColor,
    paddingTop: 0,
  },
  titleStyle: {
    width: responsiveWidth(100),
    color: colors.white,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: responsiveFontSize(3),
  },
  backgroundImageStyle: {
    height: responsiveHeight(100),
    width: responsiveWidth(100)
  },
  contentStyle: {
    alignItems: 'center',
  },
  textStyle: {
    fontSize: responsiveFontSize(3.3),
    marginTop: responsiveHeight(5),
    textAlign: 'center',
   color: 'white',
   },
  getotpStyle: {
    marginTop: responsiveHeight(10),
    backgroundColor: colors.login,
  },
  pickerStyle: {
    width: responsiveWidth(20),
    paddingBottom: 10,
    marginTop: 10,
  },
  formStyle: {
    backgroundColor: colors.lightGrayTransparent,
    marginTop: responsiveHeight(10),
    width: responsiveWidth(85),
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: responsiveWidth(7.5),
    height: responsiveHeight(30)
  },
  itemViewStyle: {
    width: responsiveWidth(70),
    flexDirection: 'row',
    paddingBottom: 10,
    marginTop: 9,
  },
  itemStyle: {
    marginTop: responsiveHeight(-3.3),
    width: responsiveWidth(50),
    alignSelf: 'center',
  }

});
