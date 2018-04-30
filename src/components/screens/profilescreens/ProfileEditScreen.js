import React from 'react';
import { StyleSheet, ImageBackground, TouchableWithoutFeedback } from 'react-native';
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
import { ImagePicker } from 'expo';
import * as EmailValidator from 'email-validator';
import {
  //variables,
  // mixins,
  colors,
} from '../../../styles';
import backgroundImage from '../../../assets/images/BackgroundImage.png';
import {
  profileValueChanged,
  profileEdit,
  profilePicUpload
} from '../../../actions';
import { IMAGEURL } from '../../../constants';

class ProfileEditScreen extends React.Component {
  componentWillMount() {
    const {
      firstName,
      lastName,
      email,
      mobileNo,
    } = this.props;
    this.props.profileValueChanged({ prop: 'peFirstName', value: firstName });
    this.props.profileValueChanged({ prop: 'peLastName', value: lastName });
    this.props.profileValueChanged({ prop: 'peEmail', value: email });
    this.props.profileValueChanged({ prop: 'peMobileVerify', value: mobileNo });
    this.props.profileValueChanged({ prop: 'pecmMobileVerify', value: '' });
  }
  pickImage = async () => {
  const response = await ImagePicker.launchImageLibraryAsync({
    allowsEditing: true,
    aspect: [1, 1],
    base64: true
  });
  if (!response.cancelled) {
      const { token } = this.props;
      this.props.profileValueChanged({ prop: 'peProfilePicBase64', value: response.base64 });
      this.props.profilePicUpload({ profilePicBase64: response.base64, token });
    }
  }
  DonePressed() {
    const { token } = this.props;
    const {
      peFirstName,
      peLastName,
      peEmail,
      peProfilePicBase64
    } = this.props;
    const EmailValid = EmailValidator.validate(peEmail);
    if (EmailValid) {
      this.props.profileEdit({
        peFirstName,
        peLastName,
        peEmail,
        peProfilePicBase64,
        token
      });
    } else {
      console.log('Showing Toast !!');
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
      formStyle,
      titleStyle,
      // errorStyle
    } = styles;
    const {
      profilePic,
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
            <Button
              style={{ alignSelf: 'center' }}
              transparent
              onPress={this.pickImage.bind(this)}
            >
              <Thumbnail
                large
                source={{ uri: `${IMAGEURL}${profilePic}` }}
              />
            </Button>
          </View>
          <View>
            <Form style={formStyle}>
              <View style={{ flexDirection: 'row' }}>
                <View style={viewFirstNameStyle}>
                  <Item stackedLabel>
                    <Label>First Name</Label>
                    <Input
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
                <Item>
                  <Label>Change Mobile Number</Label>
                </Item>
              </View>
              </Button>
              <Button
                transparent
                onPress={() => { Actions.changePasswordOtpVerifyScreen(); }}
              >
              <View style={viewItemStyle}>
                <Item >
                  <Label>Change Password</Label>
                </Item>
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
viewEmailItemStyle: {
  backgroundColor: '#D4D4D4',
  width: responsiveWidth(100),
  height: responsiveHeight(12),
  justifyContent: 'center',
  marginTop: 10,
  paddingBottom: responsiveHeight(2),
  paddingLeft: responsiveWidth(2)
},
errorStyle: {
  backgroundColor: '#D4D4D4',
  width: responsiveWidth(100),
  height: responsiveHeight(6),
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: 10,
  paddingLeft: responsiveWidth(2)
},
viewItemStyle: {
  backgroundColor: '#D4D4D4',
  width: responsiveWidth(100),
  height: responsiveHeight(7),
  marginTop: 10,
  paddingLeft: responsiveWidth(2),
  alignItems: 'center',
  flexDirection: 'row'
},
viewFirstNameStyle: {
  marginRight: responsiveWidth(3),
  height: responsiveHeight(12),
  backgroundColor: '#D4D4D4',
  flex: 1,
  paddingBottom: responsiveHeight(2),
  paddingLeft: responsiveWidth(2)

},
viewLastNameStyle: {
  height: responsiveHeight(12),
  backgroundColor: '#D4D4D4',
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
        profileValueChanged: ({ prop, value }) => {
          return dispatch(profileValueChanged({ prop, value }));
        },
        profileEdit: ({
          peFirstName,
          peLastName,
          peEmail,
          peProfilePicBase64,
          token
        }) => {
          return dispatch(profileEdit({
            peFirstName,
            peLastName,
            peEmail,
            peProfilePicBase64,
            token
          }));
        },
        profilePicUpload: ({ profilePicBase64, token }) => {
          return dispatch(profilePicUpload({ profilePicBase64, token }));
        },
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProfileEditScreen);
