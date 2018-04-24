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
   getOtp,
   mobileVerifyChanged
 } from '../../../actions';

class MobileVerifyScreen extends React.Component {
  onMobileVerifyChange(text) {
    this.props.mobileVerifyChanged(text);
  }
  onButtonPress() {
    const { mobileVerify } = this.props;
    this.props.getOtp({ mobileVerify });
  }
  renderGetOtpButton() {
    const { getotpStyle, otpButtonStyle } = styles;
    if (this.props.mobileVerifyLoading) {
      return (
        <Button style={getotpStyle} onPress={this.onButtonPress.bind(this)}>
          <Spinner color='white' />
        </Button>
      );
    } else if (this.props.mobileVerifyError) {
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
                <Title style={titleStyle}>Sign Up-Step 1</Title>
              </Body>
              <Right style={{ marginLeft: -(responsiveWidth(25)) }} />
            </Header>
            <Content contentContainerStyle={contentStyle}>
              <View>
                <Text style={textStyle}>Verify your number</Text>
              </View>
              <View>
                <Form style={formStyle}>
                  <View style={itemViewStyle}>
                    <Item >
                      <Label> +91</Label>
                    </Item>
                    <Item floatingLabel style={itemStyle}>
                      <Label> Enter your number</Label>
                      <Input
                        onChangeText={this.onMobileVerifyChange.bind(this)}
                        value={this.props.mobileVerify}
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
        mobileVerifyChanged: (text) => { return dispatch(mobileVerifyChanged(text)); },
        getOtp: ({ mobileVerify }) => {
          return dispatch(getOtp({ mobileVerify }));
        },
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MobileVerifyScreen);
