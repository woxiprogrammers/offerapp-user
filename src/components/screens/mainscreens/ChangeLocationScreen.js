import React from 'react';
import {
  StyleSheet,
  TouchableWithoutFeedback
} from 'react-native';
import {
  Container,
  ListItem,
  Content,
  Header,
  Button,
  Right,
  Input,
  Title,
  Left,
  Text,
  List,
  // View,
  Item,
  Icon,
  Body,
} from 'native-base';
import { Actions } from 'react-native-router-flux';
import {
  // responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from 'react-native-responsive-dimensions';
import {
  variables,
  // mixins,
  colors,
} from '../../../styles';

export default class WishlistScreen extends React.Component {
  render() {
    const items = ['Mumbai', 'Pune', 'Chennai', 'Goa'];
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
          <Title style={titleStyle}>Change Location</Title>
        </Body>
        <Right />
        </Header>
        <Content
          showsVerticalScrollIndicator={false}
        >
        <Header searchBar rounded style={{ paddingTop: 0 }}>
          <Item>
            <Input style={{ paddingLeft: responsiveWidth(3) }} placeholder="Search" />
          </Item>
          <Button transparent>
            <Icon name="ios-search" />
          </Button>
        </Header>
        <ListItem>
          <Body>
            <Text>My Location</Text>
          </Body>
          <Right>
          <Icon
            style={{ color: 'black' }}
            ios='ios-locate'
            android="md-locate"
          />
          </Right>
        </ListItem>
        <List
        dataArray={items}
          renderRow={(item) => {
            return (
              <TouchableWithoutFeedback onPress={Actions.mainScreen}>
                <ListItem>
                  <Body>
                    <Text>{item}</Text>
                  </Body>
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
