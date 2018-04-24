import React from 'react';
import { StyleSheet, ImageBackground } from 'react-native';
import {
  Thumbnail,
  Container,
  CheckBox,
  Content,
  Header,
  Button,
  Right,
  Title,
  Input,
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
  //variables,
  // mixins,
  colors,
} from '../../../styles';
import backgroundImage from '../../../assets/images/BackgroundImage.png';

export default class SignUpFillUpScreen extends React.Component {
  render() {
    const {
      backgroundImageStyle,
      viewFirstNameStyle,
      viewLastNameStyle,
      containerStyle,
      viewItemStyle,
      signUpStyle,
      contentStyle,
      headerStyle,
      acceptStyle,
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
          <Left style={{ marginRight: -(responsiveWidth(30)) }}>
            <Button transparent onPress={() => { Actions.popTo('loginScreen'); }}>
              <Icon style={{ color: 'white' }} ios='ios-arrow-back' android="md-arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title style={titleStyle}>Sign Up Screen</Title>
          </Body>
          <Right style={{ marginLeft: -(responsiveWidth(25)) }} />
        </Header>
        <Content contentContainerStyle={contentStyle}>
          <View style={{ marginTop: 20 }}>
            <Thumbnail
              large
              source={{ uri: 'http://s3.amazonaws.com/cdn.roosterteeth.com/default/md/user_profile_male.jpg' }}
            />
          </View>
          <View >
            <Form style={formStyle}>
              <View style={{ flexDirection: 'row' }}>
                <View style={viewFirstNameStyle}>
                  <Item stackedLabel>
                    <Label> First Name</Label>
                    <Input />
                  </Item>
                </View>
                <View style={viewLastNameStyle}>
                  <Item stackedLabel>
                    <Label> Last Name</Label>
                    <Input />
                  </Item>
                </View>
              </View>
              <View style={viewItemStyle}>
                <Item stackedLabel >
                  <Label> Email Address</Label>
                  <Input />
                </Item>
              </View>
              <View style={viewItemStyle}>
                <Item stackedLabel >
                  <Label> Password</Label>
                  <Input />
                </Item>
              </View>
              <View style={acceptStyle}>
                <CheckBox checked={false} />
                <Text>    Accept the terms and conditions</Text>
              </View>
              <View>
                <Button style={signUpStyle}>
                  <Text>Sign Up</Text>
                </Button>
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
  thumbnailStyle: {
    backgroundColor: colors.lightGray,
    marginTop: 10
  },
  titleStyle: {
    fontSize: responsiveFontSize(3),
    width: responsiveWidth(100),
    justifyContent: 'center',
    color: colors.white,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  contentStyle: {
    backgroundColor: colors.GrayTransparent,
    alignItems: 'center',
    flex: 1
  },
  textStyle: {
    fontSize: responsiveFontSize(2.5),
    marginTop: responsiveHeight(20),
    color: colors.Gray,
     textAlign: 'center',
  },
  backgroundImageStyle: {
    height: responsiveHeight(100),
    width: responsiveWidth(100)
  },
  signUpStyle: {
    backgroundColor: colors.headerColor,
    marginTop: responsiveHeight(5)
  },
formStyle: {
  width: responsiveWidth(100),
  alignItems: 'center',
  marginTop: 20,
  flex: 1,
},
viewItemStyle: {
  backgroundColor: '#D4D4D4',
  width: responsiveWidth(100),
  height: responsiveHeight(12),
  justifyContent: 'center',
  marginTop: 10,
  paddingBottom: responsiveHeight(2)
},
viewFirstNameStyle: {
  marginRight: responsiveWidth(3),
  height: responsiveHeight(12),
  backgroundColor: '#D4D4D4',
  flex: 1,
  paddingBottom: responsiveHeight(2)
},
viewLastNameStyle: {
  height: responsiveHeight(12),
  backgroundColor: '#D4D4D4',
  flex: 1,
  paddingBottom: responsiveHeight(2)
},
acceptStyle: {
  marginTop: responsiveHeight(3),
  height: responsiveHeight(5),
  width: responsiveWidth(100),
  backgroundColor: '#D4D4D4',
  flexDirection: 'row',
  alignItems: 'center'
}

});
