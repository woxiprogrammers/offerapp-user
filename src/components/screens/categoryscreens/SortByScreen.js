import React from 'react';
import {
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity
} from 'react-native';
import {
  Container,
  ListItem,
  Content,
  Header,
  Button,
  Right,
  Radio,
  Title,
  Left,
  List,
  Text,
  View,
  Icon,
  Body,
} from 'native-base';
import { Actions } from 'react-native-router-flux';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from 'react-native-responsive-dimensions';
import {
  variables,
  // mixins,
  colors,
} from '../../../styles';

export default class SortByScreen extends React.Component {
  constructor(props) {
   super(props);
   this.state = { sortSelected: 'nearestFirst' };
  }
  setSort(text) {
    this.setState({ sortSelected: text });
  }
  render() {
    const {
      sortByButtonStyle,
      containerStyle,
      sortByStyle,
      headerStyle,
      titleStyle
    } = styles;
    const { sortSelected } = this.state;
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
          contentContainerStyle={{
            paddingTop: responsiveHeight(1),
            paddingLeft: responsiveWidth(2.5),
            paddingRight: responsiveWidth(2.5) }}
        >
        <View style={sortByStyle}>
        <Text>Sort By</Text>
          <List>
          <TouchableWithoutFeedback onPress={() => { this.setSort('nearestFirst'); }}>
            <ListItem>
              <Body>
                <Text>Nearest First</Text>
              </Body>
              <Right>
                <Radio selected={sortSelected === 'nearestFirst'} />
              </Right>
            </ListItem>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => { this.setSort('latestFirst'); }}>
            <ListItem>
              <Body>
                <Text>Latest First</Text>
              </Body>
              <Right>
                <Radio selected={sortSelected === 'latestFirst'} />
              </Right>
            </ListItem>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => { this.setSort('expiringSoon'); }}>
            <ListItem>
              <Body>
                <Text>Expiring Soon</Text>
              </Body>
              <Right>
                <Radio selected={sortSelected === 'expiringSoon'} />
              </Right>
            </ListItem>
          </TouchableWithoutFeedback>
          </List>
        </View>
        </Content>
        <View style={sortByButtonStyle}>
          <TouchableOpacity
            onPress={() => { Actions.popTo('categoryScreen', { initialPage: 0 }); }}
            style={{ flex: 1, alignSelf: 'center' }}
          >
            <Text style={{ alignSelf: 'center' }}>Sort By</Text>
          </TouchableOpacity>
        </View>
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
  sortByStyle: {
  },
  sortByButtonStyle: {
    flexDirection: 'row',
    height: responsiveHeight(10),
    backgroundColor: colors.lightGray
  },
});
