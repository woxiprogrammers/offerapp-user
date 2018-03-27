import React from 'react';
import {
  StyleSheet,
} from 'react-native';
import {
  Container,
  Content,
  Header,
  Button,
  Right,
  Title,
  Left,
  Text,
  // View,
  Icon,
  Body,
} from 'native-base';
import { Actions } from 'react-native-router-flux';
import {
  // responsiveHeight,
  // responsiveWidth,
  responsiveFontSize
} from 'react-native-responsive-dimensions';
import {
  variables,
  // mixins,
  colors,
} from '../../../styles';

export default class SortByScreen extends React.Component {
  render() {
    const {
      containerStyle,
      headerStyle,
      titleStyle
    } = styles;
    return (
      <Container style={containerStyle}>
      <Header
        style={headerStyle}
        iosBarStyle='light-content'
      >
        <Left style={{ flexDirection: 'row' }}>
          <Button transparent onPress={Actions.pop}>
            <Icon style={{ color: 'white' }} ios='ios-arrow-back' android="md-arrow-back" />
          </Button>
          <Button transparent style={{ padding: 0 }} onPress={Actions.drawerOpen}>
            <Icon style={{ color: 'white' }} ios='ios-menu' android="md-menu" />
          </Button>
        </Left>
        <Body>
          <Title style={titleStyle}>Sort By Screen</Title>
        </Body>
        <Right />
        </Header>
        <Content
          showsVerticalScrollIndicator={false}
        >
        <Text>Hey Tejas</Text>
        </Content>
    </Container>
     );
   }
 }
const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: colors.white,
    marginTop: 20
  },
  headerStyle: {
    paddingTop: 0,
    backgroundColor: colors.headerColor,
    borderBottomColor: colors.headerColor
  },
  titleStyle: {
    fontWeight: 'bold',
    color: colors.white,
    textAlign: 'center',
    fontSize: responsiveFontSize(3),
    width: variables.SCREEN_WIDTH * 0.6
  },
});
