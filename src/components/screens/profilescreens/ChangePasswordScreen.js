import React from 'react';
import { StyleSheet, ImageBackground } from 'react-native';
import {
  Container,
  Content,
  Button,
  Input,
  Header,
  Right,
  Label,
  Title,
  Body,
  Form,
  Item,
  Icon,
  Left,
  View
} from 'native-base';
//import { Actions } from 'react-native-router-flux';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from 'react-native-responsive-dimensions';
//import { connect } from 'react-redux';
import {
  colors
} from '../../../styles';
import backgroundImage from '../../../assets/images/BackgroundImage.png';

export default class ChangePasswordScreen extends React.Component {
  render() {
    const {
      backgroundImageStyle,
      containerStyle,
      itemViewStyle,
      contentStyle,
      headerStyle,
      titleStyle,
      textStyle,
      itemStyle,
      formStyle
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
              <Button transparent>
                <Icon style={{ color: 'white' }} ios='ios-arrow-back' android="md-arrow-back" />
              </Button>
            </Left>
            <Body>
              <Title style={titleStyle}>Change Password</Title>
            </Body>
            <Right style={{ marginLeft: -(responsiveWidth(25)) }}>
              <Button transparent>
                <Icon style={{ color: 'white' }} ios='ios-checkmark' android="md-checkmark" />
              </Button>
            </Right>
          </Header>
              <Content contentContainerStyle={contentStyle}>
                <View style={formStyle}>
                  <Form>
                    <View style={itemViewStyle}>
                      <Item stackedLabel style={itemStyle} >
                        <Label style={textStyle}> Password</Label>
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
    alignItems: 'center',
    alignSelf: 'center',
    flex: 1,
    paddingTop: responsiveHeight(10)
   },
   contentStyle: {
     alignItems: 'center',
   },
   formStyle: {
     width: responsiveWidth(85),
     marginTop: responsiveHeight(10),
   },
   titleStyle: {
     width: responsiveWidth(100),
     color: colors.white,
     textAlign: 'center',
     fontWeight: 'bold',
     fontSize: responsiveFontSize(3),
   },
   itemViewStyle: {
     backgroundColor: colors.lightGrayTransparent,
     marginTop: 10,
     paddingBottom: 10
   },
   itemStyle: {
     width: responsiveWidth(80.75),
     alignSelf: 'center',
   },
   headerStyle: {
    color: 'white',
    fontSize: responsiveFontSize(6.6)
   },
 textStyle: {
  fontSize: responsiveFontSize(2.2)
},
backgroundImageStyle: {
  height: responsiveHeight(100),
  width: responsiveWidth(100)
}
});
