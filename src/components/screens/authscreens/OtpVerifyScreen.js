import React from 'react';
import { StyleSheet, ImageBackground } from 'react-native';
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
        <Button style={verifyOtpStyle} onPress={this.onButtonPress.bind(this)}>
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
              <Text style={textStyle}>{this.props.mobileVerify}</Text>
              <Button onPress={Actions.pop} transparent style={editStyle} >
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
                    <Label> Enter OTP</Label>
                    <Input
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
},
otpButtonStyle: {
  fontSize: responsiveFontSize(2.2)
}
});

function mapStateToProps({ user }) {
    return {
        ...user
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
