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
  Label,
  Form,
  Item,
  Left,
  View,
  Icon,
  Body
} from 'native-base';
import { Actions } from 'react-native-router-flux';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from 'react-native-responsive-dimensions';
import {
  //variables,
  // mixins,
  colors,
} from '../../../styles';
import backgroundImage from '../../../assets/images/BackgroundImage.png';

export default class ChangePasswordScreen extends React.Component {
  render() {
    const {
      backgroundImageStyle,
      viewEmailItemStyle,
      containerStyle,
      contentStyle,
      headerStyle,
      formStyle,
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
            <Left style={{ flexDirection: 'row' }}>
              <Button transparent onPress={() => { Actions.pop(); }}>
                <Icon style={{ color: 'white' }} ios='ios-arrow-back' android="md-arrow-back" />
              </Button>
            </Left>
            <Body>
              <Title style={titleStyle}>Change Password</Title>
            </Body>
            <Right style={{ marginLeft: -(responsiveWidth(25)) }}>
              <Button transparent>
                <Icon
                  style={{ color: 'white' }}
                  ios='ios-checkmark-outline'
                  android="md-checkmark"
                />
              </Button>
            </Right>
          </Header>
        <Content contentContainerStyle={contentStyle}>
          <View >
            <Form style={formStyle}>
              <View style={viewEmailItemStyle}>
                <Item stackedLabel >
                  <Label>Password</Label>
                  <Input />
                </Item>
              </View>
             </Form>
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
    backgroundColor: colors.lightGrayTransparent,
    marginTop: 20,
    flex: 1
  },
  headerStyle: {
    borderBottomColor: colors.headerColor,
    backgroundColor: colors.headerColor,
    paddingTop: 0
  },

  titleStyle: {
    fontWeight: 'bold',
    color: colors.white,
    textAlign: 'center',
    fontSize: responsiveFontSize(3),
    width: responsiveWidth(60)
  },
  contentStyle: {
    backgroundColor: colors.GrayTransparent,
    alignItems: 'center',
    flex: 1
  },
  backgroundImageStyle: {
    height: responsiveHeight(100),
    width: responsiveWidth(100)
  },

formStyle: {
  width: responsiveWidth(100),
  alignItems: 'center',
  marginTop: 20,
  flex: 1,
},
viewEmailItemStyle: {
  backgroundColor: '#D4D4D4',
  width: responsiveWidth(100),
  height: responsiveHeight(12),
  justifyContent: 'center',
  marginTop: 10,
  paddingBottom: responsiveHeight(2),
  paddingLeft: responsiveWidth(2)
}


});
