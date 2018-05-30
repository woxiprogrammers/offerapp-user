import React from 'react';
import { StyleSheet, ImageBackground, TouchableOpacity, Platform } from 'react-native';
import {
  Container,
  Content,
  Spinner,
  Header,
  Button,
  Right,
  Input,
  Label,
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
import { connect } from 'react-redux';
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
import {
  verifyOtp,
  otpVerifyChanged
} from '../../../actions';

class OtpVerifyScreen extends React.Component {
  onOtpVerifyChange(text) {
    this.props.otpVerifyChanged(text);
  }
  onButtonPress() {
    const { mobileVerify, otpVerify } = this.props;
    this.props.verifyOtp({ mobileVerify, otpVerify });
  }
  renderGetOtpButton() {
    const { verifyOtpStyle, otpButtonStyle } = styles;
    if (this.props.otpVerifyLoading) {
      return (
        <Button style={verifyOtpStyle}>
          <Spinner color='white' />
        </Button>
      );
    } else if (this.props.otpVerifyError) {
      return (
        <Button style={verifyOtpStyle}>
          <Text style={otpButtonStyle}>WRONG OTP</Text>
        </Button>);
   }
   return (
     <Button style={verifyOtpStyle} onPress={this.onButtonPress.bind(this)}>
       <Text style={otpButtonStyle}>VERIFY OTP</Text>
     </Button>);
  }
  render() {
    const {
      backgroundImageStyle,
      containerStyle,
      itemViewStyle,
      contentStyle,
      headerStyle,
      titleStyle,
      inputStyle,
      itemStyle,
      formStyle,
      textStyle,
      iconStyle,
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
            <Left>
              <Button transparent onPress={Actions.pop}>
                <Icon
                style={{ color: colors.white }}
                ios='ios-arrow-back'
                android="md-arrow-back"
                />
              </Button>
            </Left>
            <Body>
              <Title style={titleStyle}>Sign Up>Step 2</Title>
            </Body>
            <Right />
          </Header>
          <Content contentContainerStyle={contentStyle}>
            <View>
              <Text
                style={{ color: 'white',
                 fontSize: responsiveFontSize(3),
                 paddingTop: responsiveHeight(10) }}
              >Enter the OTP sent to</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={textStyle}>{this.props.mobileVerify}</Text>
              <TouchableOpacity onPress={Actions.pop} transparent style={editStyle} >
                  <Icon
                    style={iconStyle}
                    ios='ios-create-outline' android="md-create"
                  />
              </TouchableOpacity>
            </View>
            <View>
              <Form style={formStyle}>
                <View style={itemViewStyle}>
                  <Item stackedLabel style={itemStyle} >
                    <Label style={{ color: '#d2d2d2' }}> Enter OTP</Label>
                    <Input
                    style={inputStyle}
                      onChangeText={this.onOtpVerifyChange.bind(this)}
                      value={this.props.otpVerify}
                    />
                  </Item>
                </View>
              </Form>
            </View>
            <View>
              {this.renderGetOtpButton()}
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
  flex: 1,

  },
  iconStyle: {
    color: colors.white,
    ...Platform.select({
          ios: {
            paddingLeft: responsiveWidth(5),
          },
          android: {
            paddingLeft: responsiveWidth(5),
            paddingTop: responsiveHeight(1)
          },
        }),
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
  width: responsiveWidth(60),
  justifyContent: 'center',
  color: colors.white,
  textAlign: 'center',
  fontWeight: 'bold',
},
contentStyle: {
  backgroundColor: colors.lightGrayTransparent,
  alignItems: 'center',
  flex: 1,
},
textStyle: {
  fontSize: responsiveHeight(3.5),
  marginTop: responsiveHeight(5),
  color: colors.white,
  textAlign: 'center',
},
inputStyle: {
 color: 'white',
justifyContent: 'center',

},
verifyOtpStyle: {
  width: responsiveWidth(50),
  marginTop: responsiveHeight(10),
  backgroundColor: colors.headerColor,
  alignItems: 'center',
  justifyContent: 'center'
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
  padding: responsiveHeight(2),
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
},
otpButtonStyle: {
  fontSize: responsiveFontSize(2.5)
}
});

function mapStateToProps({ auth }) {
    const { signup } = auth;
    return {
        ...signup
    };
}

function mapDispatchToProps(dispatch) {
    return {
        otpVerifyChanged: (text) => { return dispatch(otpVerifyChanged(text)); },
        verifyOtp: ({ mobileVerify, otpVerify }) => {
          return dispatch(verifyOtp({ mobileVerify, otpVerify }));
        },
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OtpVerifyScreen);
