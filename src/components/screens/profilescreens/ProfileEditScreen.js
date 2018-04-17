import React from 'react';
import { StyleSheet, ImageBackground, TouchableWithoutFeedback } from 'react-native';
import {
  Thumbnail,
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

export default class ProfileEditScreen extends React.Component {
  render() {
    const {
      backgroundImageStyle,
      viewEmailItemStyle,
      viewFirstNameStyle,
      viewLastNameStyle,
      containerStyle,
      viewItemStyle,
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
              <Button transparent onPress={() => { Actions.popTo('mainScreen'); }}>
                <Icon style={{ color: 'white' }} ios='ios-arrow-back' android="md-arrow-back" />
              </Button>
              <Button transparent onPress={Actions.drawerOpen}>
                <Icon style={{ color: 'white' }} ios='ios-menu' android="md-menu" />
              </Button>
            </Left>
            <Body>
              <Title style={titleStyle}>Profile Edit</Title>
            </Body>
            <Right>
              <Button transparent>
                <Icon
                style={{
                  color: 'white',
                  fontSize: responsiveFontSize(5) }}
                 ios='ios-checkmark'
                  android="md-checkmark"
                />
              </Button>
            </Right>
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
                    <Label>First Name</Label>
                    <Input />
                  </Item>
                </View>
                <View style={viewLastNameStyle}>
                  <Item stackedLabel>
                    <Label>Last Name</Label>
                    <Input />
                  </Item>
                </View>
              </View>
              <View style={viewEmailItemStyle}>
                <Item stackedLabel >
                  <Label>Email Address</Label>
                  <Input />
                </Item>
              </View>
              <View style={viewItemStyle}>
                <Item>
                  <Label>Change Mobile Number</Label>
                </Item>
              </View>
              <TouchableWithoutFeedback onPress={() => { Actions.changePasswordScreen(); }} >
              <View style={viewItemStyle}>
                <Item >
                  <Label>Change Password</Label>
                </Item>
              </View>
              </TouchableWithoutFeedback>
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
},
viewItemStyle: {
  backgroundColor: '#D4D4D4',
  width: responsiveWidth(100),
  height: responsiveHeight(7),
  marginTop: 10,
  paddingLeft: responsiveWidth(2),
  alignItems: 'center',
  flexDirection: 'row'
},
viewFirstNameStyle: {
  marginRight: responsiveWidth(3),
  height: responsiveHeight(12),
  backgroundColor: '#D4D4D4',
  flex: 1,
  paddingBottom: responsiveHeight(2),
  paddingLeft: responsiveWidth(2)

},
viewLastNameStyle: {
  height: responsiveHeight(12),
  backgroundColor: '#D4D4D4',
  flex: 1,
  paddingBottom: responsiveHeight(2),
  paddingLeft: responsiveWidth(2)

}

});
