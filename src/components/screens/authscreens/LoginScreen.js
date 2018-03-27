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
import { connect } from 'react-redux';
import {
  //button,
  colors,
  //mixins,
  variables
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
       loginStyle,
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
          <Button style={loginStyle} onPress={Actions.mainScreen}>
            <Text style={textStyle}>LOG IN</Text>
          </Button>
        </View>
        <View style={passwordStyle}>
          <Text style={{ color: 'white', fontSize: variables.SCREEN_HEIGHT / 50 }}>
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
    paddingTop: variables.SCREEN_HEIGHT / 10
   },
   loginStyle: {
    justifyContent: 'center',
    backgroundColor: colors.login,
    width: variables.LOGIN_BUTTON_WIDTH,
    marginTop: variables.SCREEN_HEIGHT / 25

   },
   contentStyle: {
     alignItems: 'center',
   },
   formStyle: {
     width: variables.LOGIN_BUTTON_WIDTH,
     marginTop: variables.SCREEN_HEIGHT / 10,
   },
   itemViewStyle: {
     backgroundColor: colors.lightGrayTransparent,
     marginTop: 10,
     paddingBottom: 10
   },
   signupStyle: {
      justifyContent: 'center',
      backgroundColor: colors.signup,
      width: variables.LOGIN_BUTTON_WIDTH,
      marginTop: variables.SCREEN_HEIGHT / 15
   },
   itemStyle: {
     width: variables.LOGIN_BUTTON_WIDTH * 0.95,
     alignSelf: 'center',
   },
   passwordStyle: {
     marginTop: variables.SCREEN_HEIGHT / 55
   },
   orstyle: {
     justifyContent: 'center',
     flex: 1,
     marginTop: variables.SCREEN_HEIGHT / 75,
     alignItems: 'center'
   },
   headerStyle: {
    color: 'white',
    fontSize: variables.SCREEN_HEIGHT / 15
   },
 textStyle: {
  fontSize: variables.SCREEN_HEIGHT / 45
},
backgroundImageStyle: {
  height: variables.SCREEN_HEIGHT,
  width: variables.SCREEN_WIDTH
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
