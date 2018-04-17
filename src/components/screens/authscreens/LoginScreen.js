import React, { Component } from 'react';
import { StyleSheet, ImageBackground } from 'react-native';
import {
  Container,
  Content,
  Spinner,
  Button,
  Input,
  Label,
  Form,
  Item,
  Text,
  View
} from 'native-base';
import { Actions } from 'react-native-router-flux';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from 'react-native-responsive-dimensions';
import { connect } from 'react-redux';
import {
  colors
} from '../../../styles';
import backgroundImage from '../../../assets/images/BackgroundImage.png';
import {
  userChanged,
  passwordChanged,
  loginUser
} from '../../../actions';

 class LoginScreen extends Component {
   onUserChange(text) {
     this.props.userChanged(text);
   }

   onPasswordChange(text) {
     this.props.passwordChanged(text);
   }

   onButtonPress() {
     const { user, password } = this.props;
     this.props.loginUser({ user, password });
   }
   renderButton() {
     const { loginStyle, textStyle } = styles;
     if (this.props.loginLoading) {
       return (<Button style={loginStyle}>
                <Spinner color='white' />
               </Button>);
     } else if (this.props.error) {
       return (
         <Button style={loginStyle}>
           <Text style={textStyle}>LOG FAILED</Text>
         </Button>);
    }
    return (
      <Button style={loginStyle} onPress={this.onButtonPress.bind(this)}>
        <Text style={textStyle}>LOG IN</Text>
      </Button>);
   }
   render() {
     const {
       backgroundImageStyle,
       containerStyle,
       itemViewStyle,
       passwordStyle,
       contentStyle,
       headerStyle,
       signupStyle,
       // loginStyle,
       textStyle,
       itemStyle,
       formStyle,
       orstyle
     } = styles;

     return (
       <View>
        <ImageBackground
          style={backgroundImageStyle}
          source={backgroundImage}
        >
       <Container style={containerStyle}>
       <View>
         <Text style={headerStyle}>OFFERAPP</Text>
       </View>
        <Content contentContainerStyle={contentStyle}>
          <View style={formStyle}>
            <Form>
              <View style={itemViewStyle}>
                <Item stackedLabel style={itemStyle} >
                  <Label style={textStyle}> UserName</Label>
                  <Input
                    onChangeText={this.onUserChange.bind(this)}
                    value={this.props.user}
                  />
                </Item>
              </View>
              <View style={itemViewStyle}>
                <Item stackedLabel style={itemStyle}>
                  <Label style={textStyle}> Password</Label>
                  <Input
                    secureTextEntry
                    onChangeText={this.onPasswordChange.bind(this)}
                    value={this.props.password}
                  />
                </Item>
              </View>
            </Form>
        </View>
        <View>
          {this.renderButton()}
        </View>
        <View style={passwordStyle}>
          <Text style={{ color: 'white', fontSize: responsiveFontSize(2) }}>
          Forget Password ?</Text>
        </View>
        <View style={orstyle} >
          <Text style={{ color: 'white' }}>
            ─────── OR ───────
            </Text>
        </View>
        <View >
          <Button style={signupStyle} onPress={Actions.mobileVerifyScreen}>
            <Text style={textStyle}>SIGN UP</Text>
          </Button>
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
   loginStyle: {
    justifyContent: 'center',
    backgroundColor: colors.login,
    width: responsiveWidth(85),
    marginTop: responsiveHeight(4)

   },
   contentStyle: {
     alignItems: 'center',
   },
   formStyle: {
     width: responsiveWidth(85),
     marginTop: responsiveHeight(10),
   },
   itemViewStyle: {
     backgroundColor: colors.lightGrayTransparent,
     marginTop: 10,
     paddingBottom: 10
   },
   signupStyle: {
      justifyContent: 'center',
      backgroundColor: colors.signup,
      width: responsiveWidth(85),
      marginTop: responsiveHeight(6.6)
   },
   itemStyle: {
     width: responsiveWidth(80.75),
     alignSelf: 'center',
   },
   passwordStyle: {
     marginTop: responsiveHeight(1.8)
   },
   orstyle: {
     justifyContent: 'center',
     flex: 1,
     marginTop: responsiveHeight(1.3),
     alignItems: 'center'
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

function mapStateToProps({ user }) {
    return {
        ...user
    };
}

function mapDispatchToProps(dispatch) {
    return {
        userChanged: (text) => { return dispatch(userChanged(text)); },
        passwordChanged: (text) => { return dispatch(passwordChanged(text)); },
        loginUser: ({ user, password }) => {
          return dispatch(loginUser({ user, password }));
        },
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginScreen);
