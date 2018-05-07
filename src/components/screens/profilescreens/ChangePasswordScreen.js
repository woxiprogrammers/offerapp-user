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
  Title,
  Label,
  Form,
  Item,
  Left,
  View,
  Icon,
  Body,
  Toast
} from 'native-base';
import { Actions } from 'react-native-router-flux';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from 'react-native-responsive-dimensions';
import { connect } from 'react-redux';
import {
  //variables,
  // mixins,
  colors,
} from '../../../styles';
import backgroundImage from '../../../assets/images/BackgroundImage.png';
import {
  passwordValueChanged,
  changePassword
} from '../../../actions';

class ChangePasswordScreen extends React.Component {
  onChangePassword(text) {
    this.props.passwordValueChanged(text);
  }
  DonePressed() {
    const { token } = this.props;
    const {
      password
    } = this.props;
    const empty = password === '';
    if (!empty) {
      this.props.changePassword({ password, token });
    } else {
      Toast.show({
                text: 'Enter Correct Password !',
                buttonText: 'Okay',
                duration: 3000
              });
    }
  }
  renderDone() {
    if (this.props.changePasswordLoading) {
      return <Spinner color="white" />;
    }
    return (
      <Button
        transparent
        onPress={() => { this.DonePressed(); }}
      >
        <Icon
        style={{
          color: 'white',
          fontSize: responsiveFontSize(5) }}
          ios='ios-checkmark'
          android="md-checkmark"
        />
      </Button>
    );
  }
  render() {
    const {
      backgroundImageStyle,
      viewEmailItemStyle,
      containerStyle,
      contentStyle,
      headerStyle,
      formStyle,
      titleStyle
    } = styles;
    const { password } = this.props;
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
              <Button transparent onPress={() => { Actions.popTo('profileEditScreen'); }}>
                <Icon style={{ color: 'white' }} ios='ios-arrow-back' android="md-arrow-back" />
              </Button>
            </Left>
            <Body>
              <Title style={titleStyle}>Change Password</Title>
            </Body>
            <Right>
              {this.renderDone()}
            </Right>
          </Header>
        <Content contentContainerStyle={contentStyle}>
          <View >
            <Form style={formStyle}>
              <View style={viewEmailItemStyle}>
                <Item stackedLabel>
                  <Label>Password</Label>
                  <Input
                    secureTextEntry
                    onChangeText={this.onChangePassword.bind(this)}
                    value={password}
                  />
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
    fontSize: responsiveFontSize(3),
    width: responsiveWidth(60),
    justifyContent: 'center',
    color: colors.white,
    fontWeight: 'bold',
    textAlign: 'center'
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
}
});

function mapStateToProps({ user, profile }) {
    const { changepassword } = profile;
    const { token } = user;
    return {
        token,
        ...changepassword
    };
}

function mapDispatchToProps(dispatch) {
    return {
        passwordValueChanged: (text) => {
          return dispatch(passwordValueChanged(text));
        },
        changePassword: ({ password, token }) => {
          return dispatch(changePassword({ password, token }));
        },
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ChangePasswordScreen);
