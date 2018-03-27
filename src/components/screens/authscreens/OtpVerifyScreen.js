import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Container,
  Content,
  Header,
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

export default class OtpVerifyScreen extends React.Component {
  render() {
    const {
      containerStyle,
      verifyOtpStyle,
      itemViewStyle,
      contentStyle,
      headerStyle,
      itemStyle,
      formStyle,
      textStyle,
      titleStyle,
      editStyle
    } = styles;
    return (

      <Container style={containerStyle}>
        <Header
          style={headerStyle}
          iosBarStyle='light-content'
        >
          <Left style={{ marginRight: -(variables.SCREEN_WIDTH / 4) }}>
            <Button transparent>
              <Icon style={{ color: colors.white }} ios='ios-arrow-back' android="md-arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title style={titleStyle}>Sign Up-Step 2</Title>
          </Body>
          <Right style={{ marginLeft: -(variables.SCREEN_WIDTH / 4) }} />
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
            <Item floatingLabel style={itemStyle} >
              <Label style={textStyle}> Enter OTP</Label>
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
    );
  }
}
const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    marginTop: 20,
    backgroundColor: colors.grayTransparent
  },
  headerStyle: {
    paddingTop: 0,
    backgroundColor: colors.headerColor,
    borderBottomColor: colors.headerColor
  },
  editStyle: {
    marginTop: 25
  },
  titleStyle: {
    fontWeight: 'bold',
    color: colors.white,
    textAlign: 'center',
    fontSize: 18,
    width: variables.LOGIN_BUTTON_WIDTH,
  },
  contentStyle: {
    alignItems: 'center',
    backgroundColor: colors.lightGrayTransparent
  },
  textStyle: {
    color: colors.darkGray,
     textAlign: 'center',
     fontSize: variables.SCREEN_HEIGHT / 30,
     marginTop: variables.SCREEN_HEIGHT / 20
  },
  verifyOtpStyle: {
    backgroundColor: colors.darkGrayMoreTransparent,
    marginTop: variables.SCREEN_HEIGHT / 10
  },

  formStyle: {
    alignItems: 'center',
    //width: variables.LOGIN_BUTTON_WIDTH,
    marginTop: variables.SCREEN_HEIGHT / 10,
    //flexDirection: 'row',
     backgroundColor: colors.lightGrayTransparent,
  },
  itemViewStyle: {
    //backgroundColor: colors.lightGrayTransparent,
    marginTop: 9,
    alignItems: 'center',
    paddingBottom: 10,
    width: variables.SCREEN_WIDTH * 0.7,
    flexDirection: 'row',
  },
  itemStyle: {
    width: variables.LOGIN_BUTTON_WIDTH * 0.6,
    alignSelf: 'center',
    flex: 1,
    marginTop: -variables.SCREEN_HEIGHT / 30
  },

});
