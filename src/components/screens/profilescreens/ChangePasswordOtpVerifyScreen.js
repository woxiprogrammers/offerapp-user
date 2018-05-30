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
  changePasswordVerifyOtp,
  changePasswordVerifyOtpChanged,
  profileGetOtp
} from '../../../actions';

class ChangePasswordOtpVerifyScreen extends React.Component {
  componentWillMount() {
    const { peMobileVerify } = this.props;
    const fromChangeMobile = false;
    this.props.profileGetOtp({ mobileVerify: peMobileVerify, fromChangeMobile });
  }
  onOtpVerifyChange(text) {
    this.props.changePasswordVerifyOtpChanged(text);
  }
  onButtonPress() {
    const { peMobileVerify, peOtpVerify } = this.props;
    this.props.changePasswordVerifyOtp({ peMobileVerify, peOtpVerify });
  }
  renderGetOtpButton() {
    const { verifyOtpStyle, otpButtonStyle } = styles;
    if (this.props.peOtpVerifyLoading) {
      return (
        <Button style={verifyOtpStyle}>
          <Spinner color='white' />
        </Button>
      );
    } else if (this.props.peOtpVerifyError) {
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
  renderGetOtp() {
    const { peMobileVerifyLoading } = this.props;
    const {
      itemViewStyle,
      itemStyle,
      formStyle,
    } = styles;
    if (peMobileVerifyLoading) {
      return (
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1
          }}
        >
          <Spinner color="white" size='small' />
        </View>
      );
    }
    return (
          <View>
            <Form style={formStyle}>
              <View style={itemViewStyle}>
                <Item stackedLabel style={itemStyle} >
                  <Label style={{ color: '#d2d2d2' }}> Enter OTP</Label>
                  <Input
                  style={{ color: colors.white }}
                    onChangeText={this.onOtpVerifyChange.bind(this)}
                    value={this.props.peOtpVerify}
                  />
                </Item>
              </View>
            </Form>
            <View>
              {this.renderGetOtpButton()}
            </View>
          </View>
        );
  }
  render() {
    const {
      backgroundImageStyle,
      containerStyle,
      contentStyle,
      headerStyle,
      titleStyle,
      textStyle,
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
              <Title style={titleStyle}>Change Password>Step 1</Title>
            </Body>
            <Right />
          </Header>
          <Content contentContainerStyle={contentStyle}>
            <View>
              <Text style={textStyle}>Enter the OTP sent to</Text>
            </View>
            <View style={{ flexDirection: 'column' }}>
              <Text style={textStyle}>{this.props.peMobileVerify}</Text>
            </View>
            {this.renderGetOtp()}
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
titleStyle: {
  fontSize: responsiveFontSize(3),
  width: responsiveWidth(60),
  justifyContent: 'center',
  color: colors.white,
  fontWeight: 'bold',

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
  color: colors.white,
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
  fontSize: responsiveFontSize(2.5)
}
});

function mapStateToProps({ profile }) {
    const { profileedit, changepassword } = profile;
    return {
        ...profileedit,
        ...changepassword
    };
}

function mapDispatchToProps(dispatch) {
    return {
        changePasswordVerifyOtpChanged: (text) => {
          return dispatch(changePasswordVerifyOtpChanged(text));
        },
        changePasswordVerifyOtp: ({ peMobileVerify, peOtpVerify }) => {
          return dispatch(changePasswordVerifyOtp({ peMobileVerify, peOtpVerify }));
        },
        profileGetOtp: ({ mobileVerify, fromChangeMobile }) => {
          return dispatch(profileGetOtp({ mobileVerify, fromChangeMobile }));
        },
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ChangePasswordOtpVerifyScreen);
