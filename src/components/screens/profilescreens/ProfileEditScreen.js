import React from 'react';
import { StyleSheet, ImageBackground, TouchableOpacity, Platform } from 'react-native';
import {
  Thumbnail,
  Container,
  Content,
  Header,
  Spinner,
  Button,
  Right,
  Input,
  Title,
  Label,
  Form,
  Item,
  Text,
  Left,
  View,
  Icon,
  Body,
  Toast
} from 'native-base';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from 'react-native-responsive-dimensions';
import { ImagePicker, Permissions } from 'expo';
import * as EmailValidator from 'email-validator';
import {
  //variables,
  // mixins,
  colors,
} from '../../../styles';
import backgroundImage from '../../../assets/images/BackgroundImage.png';
import {
  profileValueChanged,
  peProfilePicUpload,
  profileEdit,
} from '../../../actions';

class ProfileEditScreen extends React.Component {
  async componentWillMount() {
    const {
      profilePic,
      firstName,
      lastName,
      email,
      mobileNo,
    } = this.props;
    this.props.profileValueChanged({ prop: 'peProfilePic', value: profilePic });
    this.props.profileValueChanged({ prop: 'peFirstName', value: firstName });
    this.props.profileValueChanged({ prop: 'peLastName', value: lastName });
    this.props.profileValueChanged({ prop: 'peEmail', value: email });
    this.props.profileValueChanged({ prop: 'peMobileVerify', value: mobileNo });
    this.props.profileValueChanged({ prop: 'pecmMobileVerify', value: '' });
    const cameraPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    this.setState({ cameraPermission: cameraPermission.status });
  }
  pickImage = async () => {
    const { token } = this.props;
    const { status } = await Permissions.getAsync(Permissions.CAMERA_ROLL);
    this.setState({ hasRollPermission: status === 'granted' });
    if (this.state.hasRollPermission) {
      const response = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [1, 1],
        base64: true
      });
      if (!response.cancelled) {
          // const { token } = this.props;
          console.log('Loading Image !');
          await this.props.profileValueChanged({ prop: 'peProfilePicResult', value: response.uri });
          await this.props.profileValueChanged({ prop: 'peProfilePic', value: response.uri });
          this.props.peProfilePicUpload({ peProfilePicResult: response, token });

          // this.props.profileValueChanged({ prop: 'pro', value: response.base64 });
          // this.props.profilePicUpload({ profilePicBase64: response.base64, token });
        }
    } else {
      Toast.show({
                text: 'Camera Roll Permission Denied',
                buttonText: 'Okay',
                duration: 3000
              });
    }
  }
  DonePressed() {
    const { token } = this.props;
    const {
      peFirstName,
      peLastName,
      peEmail,
      peProfilePicName
    } = this.props;
    const EmailValid = EmailValidator.validate(peEmail);
    if (EmailValid) {
      this.props.profileEdit({
        peFirstName,
        peLastName,
        peEmail,
        peProfilePicName,
        token
      });
    } else {
      Toast.show({
                text: 'Enter Correct Email !',
                buttonText: 'Okay',
                duration: 3000
              });
    }
  }
  renderDone() {
    if (this.props.peLoading) {
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
      viewFirstNameStyle,
      viewLastNameStyle,
      containerStyle,
      viewItemStyle,
      contentStyle,
      headerStyle,
      labelStyle,
      inputStyle,
      formStyle,
      titleStyle,
      // errorStyle
    } = styles;
    const {
      peProfilePic,
      peFirstName,
      peLastName,
      peEmail
    } = this.props;
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
              <Button transparent onPress={() => { Actions.popTo('mainScreen'); }}>
                <Icon style={{ color: 'white' }} ios='ios-arrow-back' android="md-arrow-back" />
              </Button>
              <Button transparent onPress={Actions.drawerOpen}>
                <Icon style={{ color: 'white' }} ios='ios-menu' android="md-menu" />
              </Button>
            </Left>
            <Body>
              <Title style={titleStyle}>Profile Edit</Title>
            </Body>
            <Right>
              {this.renderDone()}
            </Right>
          </Header>
        <Content contentContainerStyle={contentStyle}>
          <View style={{ marginTop: responsiveHeight(5) }}>
            <TouchableOpacity
              style={{ alignSelf: 'center' }}
              transparent
              onPress={this.pickImage.bind(this)}
            >
              <Thumbnail
                large
                source={{ uri: peProfilePic }}
              />
            </TouchableOpacity>
          </View>
          <View>
            <Form style={formStyle}>
              <View style={{ flexDirection: 'row' }}>
                <View style={viewFirstNameStyle}>
                  <Item stackedLabel>
                    <Label>First Name</Label>
                    <Input
                      style={inputStyle}
                      onChangeText={
                          value => {
                            this.props.profileValueChanged({
                            prop: 'peFirstName', value
                          });
                        }
                      }
                      value={peFirstName}
                    />
                  </Item>
                </View>
                <View style={viewLastNameStyle}>
                  <Item stackedLabel>
                    <Label>Last Name</Label>
                    <Input
                    style={inputStyle}
                      onChangeText={
                          value => {
                            this.props.profileValueChanged({
                            prop: 'peLastName', value
                          });
                        }
                      }
                      value={peLastName}
                    />
                  </Item>
                </View>
              </View>
              <View style={viewEmailItemStyle}>
                <Item stackedLabel >
                  <Label>Email Address</Label>
                  <Input
                  style={inputStyle}
                    keyboardType='email-address'
                    onChangeText={
                        value => {
                          this.props.profileValueChanged({
                          prop: 'peEmail', value
                        });
                      }
                    }
                    value={peEmail}
                  />
                </Item>
              </View>
              <Button
                transparent
                onPress={() => { Actions.changeMobileGetOtpScreen(); }}
              >
              <View style={viewItemStyle}>

                  <Text>Change Mobile Number</Text>

              </View>
              </Button>
              <Button
                transparent
                onPress={() => { Actions.changePasswordOtpVerifyScreen(); }}
              >
              <View style={viewItemStyle}>

                  <Text>Change Password</Text>

              </View>
              </Button>
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
  marginTop: responsiveHeight(5),
  flex: 1,
},
inputStyle: {
  ...Platform.select({
        ios: {
          height: responsiveHeight(5),
          paddingBottom: responsiveHeight(3)
        },
        android: {

          paddingTop: responsiveHeight(1)
        },
      }),
},
viewEmailItemStyle: {
  backgroundColor: 'white',
  width: responsiveWidth(100),
  height: responsiveHeight(12),
  justifyContent: 'center',
  marginTop: responsiveHeight(2),
  paddingBottom: responsiveHeight(2),
  paddingLeft: responsiveWidth(2)
},
errorStyle: {
  backgroundColor: 'white',
  width: responsiveWidth(100),
  height: responsiveHeight(6),
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: responsiveHeight(2),
  paddingLeft: responsiveWidth(2)
},
viewItemStyle: {
  backgroundColor: 'white',
  width: responsiveWidth(100),
  height: responsiveHeight(7),
  marginTop: responsiveHeight(2),
  paddingLeft: responsiveWidth(2),
  alignItems: 'center',
  flexDirection: 'row',
},
viewFirstNameStyle: {
  marginRight: responsiveWidth(3),
  height: responsiveHeight(12),
  backgroundColor: 'white',
  flex: 1,
  paddingBottom: responsiveHeight(2),
  paddingLeft: responsiveWidth(2)

},
viewLastNameStyle: {
  height: responsiveHeight(12),
  backgroundColor: 'white',
  flex: 1,
  paddingBottom: responsiveHeight(2),
  paddingLeft: responsiveWidth(2)

}
});

function mapStateToProps({ user, profile }) {
    const { profileedit } = profile;
    const { userData, token } = user;
    return {
        ...userData,
        token,
        ...profileedit
    };
}

function mapDispatchToProps(dispatch) {
    return {
        peProfilePicUpload: ({ peProfilePicResult, token }) => {
          return dispatch(peProfilePicUpload({ peProfilePicResult, token }));
        },
        profileValueChanged: ({ prop, value }) => {
          return dispatch(profileValueChanged({ prop, value }));
        },
        profileEdit: ({
          peFirstName,
          peLastName,
          peEmail,
          peProfilePicName,
          token
        }) => {
          return dispatch(profileEdit({
            peFirstName,
            peLastName,
            peEmail,
            peProfilePicName,
            token
          }));
        }
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProfileEditScreen);
