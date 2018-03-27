import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Thumbnail,
  Container,
  CheckBox,
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
import {
  variables,
  // mixins,
  colors,
} from '../../../styles';

export default class SignUpFillUpScreen extends React.Component {
  render() {
    const {
      containerStyle,
      thumbnailStyle,
      verifyOtpStyle,
      itemViewStyle,
      contentStyle,
      headerStyle,
      itemStyle,
      formStyle,
      textStyle,
      titleStyle
    } = styles;

    return (
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
            <Title style={titleStyle}>Sign Up Screen</Title>
          </Body>
          <Right style={{ marginLeft: -(variables.SCREEN_WIDTH / 4) }} />
        </Header>
        <Content contentContainerStyle={contentStyle}>
        <View>
           <Thumbnail
           circle
           style={thumbnailStyle}
           // source={person}
           />
           </View>
           <View>
           <Form style={formStyle}>
             <View style={itemViewStyle}>
               <Item stackedLabel style={itemStyle} >
               <View>
                 <Label style={textStyle}> First Name</Label>
                 <Label style={textStyle}> Last Name</Label>
                 </View>
               </Item>
             </View>
             <View style={itemViewStyle}>
               <Item stackedLabel style={itemStyle} >
                 <Label style={textStyle}> Email Address</Label>
               </Item>
             </View>
             <View style={itemViewStyle}>
               <Item stackedLabel style={itemStyle} >
                 <Label style={textStyle}> Password</Label>
               </Item>
             </View>
             <View style={{ flexDirection: 'column' }}>
             <CheckBox checked={false} />
             <Text>Accept the terms and conditions</Text>
             </View>
           </Form>
        </View>
        </Content>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  containerStyle: {
    marginTop: 20,
      backgroundColor: colors.grayTransparent
  },
  headerStyle: {
    paddingTop: 0,
    backgroundColor: colors.headerColor,
    borderBottomColor: colors.headerColor
  },
  thumbnailStyle: {
    backgroundColor: colors.lightGray,
    marginTop: 10
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
    width: variables.LOGIN_BUTTON_WIDTH,
     marginTop: variables.SCREEN_HEIGHT / 10,
     //flexDirection: 'row',
     backgroundColor: colors.lightGrayTransparent,
  },
  itemViewStyle: {
    //backgroundColor: colors.lightGrayTransparent,
    //marginTop: 9,
    paddingBottom: 10,
    width: variables.SCREEN_WIDTH * 0.7,
    //flexDirection: 'row',
  },
  itemStyle: {
    width: variables.LOGIN_BUTTON_WIDTH * 0.6,
    alignSelf: 'center',
    marginTop: -variables.SCREEN_HEIGHT / 30
  },

});
