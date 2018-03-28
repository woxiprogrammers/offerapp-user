import React from 'react';
import {
  StyleSheet,
  // Image,
  TouchableWithoutFeedback
} from 'react-native';
import {
  Container,
  ListItem,
  Header,
  Content,
  Button,
  Right,
  Title,
  Left,
  List,
  // View,
  Icon,
  Body,
  Text,
} from 'native-base';
import { Actions } from 'react-native-router-flux';
import {
  // responsiveHeight,
  // responsiveWidth,
  responsiveFontSize
} from 'react-native-responsive-dimensions';
import {
  // normalize,
  variables,
  // mixins,
  colors,
} from '../../../styles';

export default class GroupListingScreen extends React.Component {

  render() {
    const items = ['Group Adidas', 'Group Puma', 'Group Peter England', 'Group Pizzahut'];
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
            <Title style={titleStyle}>Group List Screen</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <List
          dataArray={items}
            renderRow={(item) => {
              return (
              <TouchableWithoutFeedback onPress={Actions.groupScreen}>
                <ListItem>
                  <Body>
                    <Text>{item}</Text>
                  </Body>
                  <Right style={{ alignItems: 'flex-end' }}>
                    <Icon name="arrow-forward" />
                  </Right>
                </ListItem>
              </TouchableWithoutFeedback>
              );
            }
            }
          />
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
