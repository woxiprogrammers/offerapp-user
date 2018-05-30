import React from 'react';
import { StyleSheet, ImageBackground } from 'react-native';
import {
  Container,
  Header,
  Content,
  Spinner,
  Button,
  Right,
  Title,
  Label,
  Input,
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
//  variables,
  colors,
} from '../../../styles';
 import backgroundImage from '../../../assets/images/BackgroundImage.png';
 import {
   profileGetOtp,
   changeMobileMobileVerifyChanged
 } from '../../../actions';

class ChangeMobileGetOtpScreen extends React.Component {
  onMobileVerifyChange(text) {
    this.props.changeMobileMobileVerifyChanged(text);
  }
  onButtonPress() {
    const { pecmMobileVerify } = this.props;
    const fromChangeMobile = true;
    this.props.profileGetOtp({ mobileVerify: pecmMobileVerify, fromChangeMobile });
  }
  renderGetOtpButton() {
    const { getotpStyle, otpButtonStyle } = styles;
    if (this.props.peMobileVerifyLoading) {
      return (
        <Button style={getotpStyle}>
          <Spinner color='white' />
        </Button>
      );
    } else if (this.props.peMobileVerifyError) {
      return (
        <Button style={getotpStyle}>
          <Text style={otpButtonStyle}>OTP NOT SENT</Text>
        </Button>);
   }
   return (
     <Button style={getotpStyle} onPress={this.onButtonPress.bind(this)}>
       <Text style={otpButtonStyle}>GET OTP</Text>
     </Button>);
  }
  render() {
    const {
      backgroundImageStyle,
      containerStyle,
      itemViewStyle,
      contentStyle,
      // pickerStyle,
      headerStyle,
      labelStyle,
      titleStyle,
      textStyle,
      itemStyle,
      formStyle,
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
                  <Icon style={{ color: 'white' }} ios='ios-arrow-back' android="md-arrow-back" />
                </Button>
              </Left>
              <Body>
                <Title style={titleStyle}>Change Mobile</Title>
              </Body>
              <Right style={{ marginLeft: -(responsiveWidth(25)) }} />
            </Header>
            <Content contentContainerStyle={contentStyle}>
              <View>
                <Text style={textStyle}>Enter new number</Text>
              </View>
              <View>
                <Form style={formStyle}>
                  <View style={itemViewStyle}>
                    <Item stackedLabel style={itemStyle}>
                      <Label style={labelStyle}> Enter your number</Label>
                      <Input
                      style={{ color: 'white' }}
                        onChangeText={this.onMobileVerifyChange.bind(this)}
                        value={this.props.pecmMobileVerify}
                        keyboardType='numeric'
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
    backgroundColor: colors.transparent,
    marginTop: 20,
  },
  headerStyle: {
    borderBottomColor: colors.headerColor,
    backgroundColor: colors.headerColor,
    paddingTop: 0,
  },
  titleStyle: {
    width: responsiveWidth(100),
    color: colors.white,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: responsiveFontSize(3),
  },
  backgroundImageStyle: {
    height: responsiveHeight(100),
    width: responsiveWidth(100)
  },
  contentStyle: {
    alignItems: 'center',
  },
  labelStyle: {
    color: '#d2d2d2',
    alignSelf: 'center',
    justifyContent: 'center'
   },
  textStyle: {
    fontSize: responsiveFontSize(3.3),
    marginTop: responsiveHeight(5),
    textAlign: 'center',
    color: 'white',
   },
  getotpStyle: {
    width: responsiveWidth(50),
    marginTop: responsiveHeight(10),
    backgroundColor: colors.login,
    alignItems: 'center',
    justifyContent: 'center'
  },
  pickerStyle: {
    width: responsiveWidth(20),
    paddingBottom: 10,
    marginTop: 10,
  },
  formStyle: {
    backgroundColor: colors.lightGrayTransparent,
    marginTop: responsiveHeight(10),
    width: responsiveWidth(85),
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: responsiveWidth(7.5),
    height: responsiveHeight(30)
  },
  itemViewStyle: {
    width: responsiveWidth(70),
    flexDirection: 'row',
    paddingBottom: 10,
    marginTop: 9,
    justifyContent: 'center',
  },
  itemStyle: {
    marginTop: responsiveHeight(-3.3),
    width: responsiveWidth(50),
    alignSelf: 'center',
  },
  otpButtonStyle: {
    fontSize: responsiveFontSize(2.5)
  }

});

function mapStateToProps({ profile }) {
    const { profileedit } = profile;
    return {
        ...profileedit
    };
}

function mapDispatchToProps(dispatch) {
    return {
        changeMobileMobileVerifyChanged: (text) => {
          return dispatch(changeMobileMobileVerifyChanged(text));
        },
        profileGetOtp: ({ mobileVerify, fromChangeMobile }) => {
          return dispatch(profileGetOtp({ mobileVerify, fromChangeMobile }));
        },
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ChangeMobileGetOtpScreen);
