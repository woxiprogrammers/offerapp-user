import React from 'react';
import { StyleSheet, ImageBackground } from 'react-native';
import {
  Thumbnail,
  Container,
  CheckBox,
  Spinner,
  Content,
  Header,
  Button,
  Right,
  Title,
  Input,
  Label,
  Form,
  Item,
  Left,
  View,
  Icon,
  Body,
  Text,
} from 'native-base';
import _ from 'lodash';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from 'react-native-responsive-dimensions';
import {
  //variables,
  // mixins,
  colors,
} from '../../../styles';
import backgroundImage from '../../../assets/images/BackgroundImage.png';
import {
  valueChanged,
  signUpUser
} from '../../../actions';

class SignUpFillUpScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isChecked: false
    };
  }
  componentWillMount() {
    _.each(this.props, (value, prop) => {
      this.props.valueChanged({ prop, value });
    });
  }
  onButtonPress() {
    const {
      suFirstName,
      suLastName,
      suEmail,
      suPassword,
      mobileVerify
    } = this.props;
    this.props.signUpUser({
      suFirstName,
      suLastName,
      suEmail,
      suPassword,
      mobileVerify
    });
  }
  renderSignUpButton() {
    const { signUpButtonStyle, signUpButtonTextStyle } = styles;
    const { suLoading, suError } = this.props;
    const { isChecked } = this.state;
    if (suLoading) {
      return (<Button style={signUpButtonStyle}>
               <Spinner color='white' />
              </Button>);
    } else if (suError) {
      return (<Button style={signUpButtonStyle}>
               <Text style={signUpButtonTextStyle}>
                 Sign Up Failed
               </Text>
              </Button>);
   } else if (!isChecked) {
     return (
       <Button style={signUpButtonStyle}>
         <Text style={signUpButtonTextStyle}>Please Accept</Text>
       </Button>
     );
   }
   return (
     <Button style={signUpButtonStyle} onPress={this.onButtonPress.bind(this)}>
       <Text style={signUpButtonTextStyle}>Sign Up</Text>
     </Button>
     );
  }
  render() {
    const {
      backgroundImageStyle,
      viewFirstNameStyle,
      viewLastNameStyle,
      containerStyle,
      viewItemStyle,
      contentStyle,
      headerStyle,
      acceptStyle,
      formStyle,
      titleStyle
    } = styles;
    const {
      suFirstName,
      suLastName,
      suEmail,
      suPassword,
    } = this.props;
    const { isChecked } = this.state;
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
            <Button transparent onPress={() => { Actions.popTo('loginScreen'); }}>
              <Icon style={{ color: 'white' }} ios='ios-arrow-back' android="md-arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title style={titleStyle}>Sign Up Screen</Title>
          </Body>
          <Right style={{ marginLeft: -(responsiveWidth(25)) }} />
        </Header>
        <Content contentContainerStyle={contentStyle}>
          <View style={{ marginTop: 20 }}>
            <Thumbnail
              large
              source={{ uri: 'http://s3.amazonaws.com/cdn.roosterteeth.com/default/md/user_profile_male.jpg' }}
            />
          </View>
          <View >
            <Form style={formStyle}>
              <View style={{ flexDirection: 'row' }}>
                <View style={viewFirstNameStyle}>
                  <Item stackedLabel>
                    <Label> First Name</Label>
                    <Input
                      onChangeText={
                          value => {
                            this.props.valueChanged({
                            prop: 'suFirstName', value
                          });
                        }
                      }
                      value={suFirstName}
                    />
                  </Item>
                </View>
                <View style={viewLastNameStyle}>
                  <Item stackedLabel>
                    <Label> Last Name</Label>
                    <Input
                      onChangeText={
                          value => {
                            this.props.valueChanged({
                            prop: 'suLastName', value
                          });
                        }
                      }
                      value={suLastName}
                    />
                  </Item>
                </View>
              </View>
              <View style={viewItemStyle}>
                <Item stackedLabel >
                  <Label> Email Address</Label>
                  <Input
                    onChangeText={
                        value => {
                          this.props.valueChanged({
                          prop: 'suEmail', value
                        });
                      }
                    }
                    value={suEmail}
                  />
                </Item>
              </View>
              <View style={viewItemStyle}>
                <Item stackedLabel >
                  <Label> Password</Label>
                  <Input
                    secureTextEntry
                    onChangeText={
                        value => {
                          this.props.valueChanged({
                          prop: 'suPassword', value
                        });
                      }
                    }
                    value={suPassword}
                  />
                </Item>
              </View>
              <View style={acceptStyle}>
                <CheckBox
                  checked={isChecked}
                  onPress={() => {
                    this.setState({ isChecked: !this.state.isChecked });
                  }}
                />
                <Text>    Accept the terms and conditions</Text>
              </View>
              <View>
              {this.renderSignUpButton()}
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
  thumbnailStyle: {
    backgroundColor: colors.lightGray,
    marginTop: 10
  },
  titleStyle: {
    fontSize: responsiveFontSize(3),
    width: responsiveWidth(100),
    justifyContent: 'center',
    color: colors.white,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  contentStyle: {
    backgroundColor: colors.GrayTransparent,
    alignItems: 'center',
    flex: 1
  },
  textStyle: {
    fontSize: responsiveFontSize(2.5),
    marginTop: responsiveHeight(20),
    color: colors.Gray,
     textAlign: 'center',
  },
  backgroundImageStyle: {
    height: responsiveHeight(100),
    width: responsiveWidth(100)
  },
  signUpButtonStyle: {
    width: responsiveWidth(50),
    marginTop: responsiveHeight(5),
    backgroundColor: colors.headerColor,
    alignItems: 'center',
    justifyContent: 'center'
  },
formStyle: {
  width: responsiveWidth(100),
  alignItems: 'center',
  marginTop: 20,
  flex: 1,
},
viewItemStyle: {
  backgroundColor: '#D4D4D4',
  width: responsiveWidth(100),
  height: responsiveHeight(12),
  justifyContent: 'center',
  marginTop: 10,
  paddingBottom: responsiveHeight(2)
},
viewFirstNameStyle: {
  marginRight: responsiveWidth(3),
  height: responsiveHeight(12),
  backgroundColor: '#D4D4D4',
  flex: 1,
  paddingBottom: responsiveHeight(2)
},
viewLastNameStyle: {
  height: responsiveHeight(12),
  backgroundColor: '#D4D4D4',
  flex: 1,
  paddingBottom: responsiveHeight(2)
},
acceptStyle: {
  marginTop: responsiveHeight(3),
  height: responsiveHeight(5),
  width: responsiveWidth(100),
  backgroundColor: '#D4D4D4',
  flexDirection: 'row',
  alignItems: 'center'
},
signUpButtonTextStyle: {
  fontSize: responsiveFontSize(2.2)
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
        valueChanged: ({ prop, value }) => { return dispatch(valueChanged({ prop, value })); },
        signUpUser: ({
          suFirstName,
          suLastName,
          suEmail,
          suPassword,
          mobileVerify
        }) => {
          return dispatch(signUpUser({
            suFirstName,
            suLastName,
            suEmail,
            suPassword,
            mobileVerify
          }));
        },
    };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SignUpFillUpScreen);
