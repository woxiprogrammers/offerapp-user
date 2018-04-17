import React from 'react';
import { StyleSheet, ImageBackground } from 'react-native';
import {
  Container,
  Content,
  Header,
  Button,
  Right,
  Input,
  Title,
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
  //variables,
  colors
} from '../../../styles';
import backgroundImage from '../../../assets/images/BackgroundImage.png';


export default class OtpVerifyScreen extends React.Component {
  render() {
    const {
      backgroundImageStyle,
      containerStyle,
      verifyOtpStyle,
      itemViewStyle,
      contentStyle,
      headerStyle,
      titleStyle,
      itemStyle,
      formStyle,
      textStyle,
      editStyle
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
                <Icon
                style={{ color: colors.white }}
                ios='ios-arrow-back'
                android="md-arrow-back"
                />
              </Button>
            </Left>
            <Body>
              <Title style={titleStyle}>Sign Up-Step 2</Title>
            </Body>
            <Right style={{ marginLeft: -(responsiveWidth(25)) }} />
          </Header>
          <Content contentContainerStyle={contentStyle}>
            <View>
              <Text style={textStyle}>Enter the OTP sent to</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={textStyle}> XXXXXXXXXX</Text>
              <Button transparent style={editStyle} >
                  <Icon
                    style={{ color: colors.darkGrayTransparent }}
                    ios='ios-create-outline' android="md-create"
                  />
              </Button>
            </View>
            <View>
              <Form style={formStyle}>
                <View style={itemViewStyle}>
                  <Item stackedLabel style={itemStyle} >
                    {/*<Label> Enter OTP</Label>*/}
                    <Input />
                  </Item>
                </View>
              </Form>
            </View>
            <View>
              <Button style={verifyOtpStyle} onPress={Actions.signUpFillUpScreen}>
                <Text>VERIFY OTP</Text>
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
  flex: 1
},
headerStyle: {
  backgroundColor: colors.headerColor,
  borderBottomColor: colors.headerColor,
  paddingTop: 0
},
editStyle: {
  marginTop: 25
},
titleStyle: {
  fontSize: responsiveFontSize(3),
  width: responsiveWidth(100),
  justifyContent: 'center',
  fontWeight: 'bold',
  color: colors.white,
  textAlign: 'center'
},
contentStyle: {
  backgroundColor: colors.lightGrayTransparent,
  alignItems: 'center',
  flex: 1,
},
textStyle: {
  fontSize: responsiveHeight(3.5),
  marginTop: responsiveHeight(5),
  color: colors.darkGray,
  textAlign: 'center',
},
verifyOtpStyle: {
  backgroundColor: colors.headerColor,
  marginTop: responsiveHeight(10),
},
backgroundImageStyle: {
  height: responsiveHeight(100),
  width: responsiveWidth(100)
},
formStyle: {
  backgroundColor: colors.lightGrayTransparent,
  marginTop: responsiveHeight(10),
  width: responsiveWidth(50),
  alignItems: 'center',
  paddingBottom: responsiveHeight(2)
},
itemViewStyle: {
  height: responsiveHeight(10),
  width: responsiveWidth(40),
  alignItems: 'center',
  flexDirection: 'row',
  marginTop: 9,
},
itemStyle: {
  marginTop: responsiveHeight(-3.5),
  alignSelf: 'center',
  flex: 1,
}

});
