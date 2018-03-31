import React from 'react';
import {
  StyleSheet,
  Slider,
  TouchableOpacity,
  TouchableWithoutFeedback
} from 'react-native';
import {
  Container,
  Content,
  ListItem,
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

export default class FilterScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { distance: 1, typeSelected: 'all' };
  }
  setType(text) {
    this.setState({ typeSelected: text });
  }
  render() {
    const {
      filterButtonStyle,
      containerStyle,
      offerTypeStyle,
      headerStyle,
      sliderStyle,
      titleStyle
    } = styles;
    const { typeSelected } = this.state;
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
          <Title style={titleStyle}>Filter Screen</Title>
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
        <View style={sliderStyle}>
          <View
            style={{
              flexDirection: 'row' }}
          >
            <Left>
              <Text>Offer Distance</Text>
            </Left>
            <Right>
              <Text>{this.state.distance} Km</Text>
            </Right>
          </View>
          <Slider
           step={1}
           minimumValue={1}
           maximumValue={5}
           value={this.state.distance}
           onSlidingComplete={(val) => { this.setState({ distance: val }); }}
          />
          <View
            style={{
              paddingLeft: responsiveWidth(2.5),
              paddingRight: responsiveWidth(2.5),
              flexDirection: 'row' }}
          >
          <Left>
            <Text style={{ color: 'gray' }}>1</Text>
          </Left>
          <Body>
            <Text style={{ color: 'gray' }}>3</Text>
          </Body>
          <Right>
            <Text style={{ color: 'gray' }}>5</Text>
          </Right>
          </View>
        </View>
        <View style={offerTypeStyle}>
        <Text>Offer Type</Text>
          <List>
          <TouchableWithoutFeedback onPress={() => { this.setType('all'); }}>
            <ListItem>
              <Body>
                <Text>All</Text>
              </Body>
              <Right>
                <Radio selected={typeSelected === 'all'} />
              </Right>
            </ListItem>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => { this.setType('buyGet'); }}>
            <ListItem>
              <Body>
                <Text>BUY X GET Y</Text>
              </Body>
              <Right>
                <Radio selected={typeSelected === 'buyGet'} />
              </Right>
            </ListItem>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => { this.setType('flat'); }}>
            <ListItem>
              <Body>
                <Text>Flat %</Text>
              </Body>
              <Right>
                <Radio selected={typeSelected === 'flat'} />
              </Right>
            </ListItem>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => { this.setType('upto'); }}>
            <ListItem>
              <Body>
                <Text>Upto %</Text>
              </Body>
              <Right>
                <Radio selected={typeSelected === 'upto'} />
              </Right>
            </ListItem>
          </TouchableWithoutFeedback>
          </List>
        </View>
        </Content>
        <View style={filterButtonStyle}>
        <TouchableOpacity
          onPress={() => { Actions.pop(); }}
          style={{ flex: 1, alignSelf: 'center' }}
        >
            <Text style={{ alignSelf: 'center' }}>Filter</Text>
          </TouchableOpacity>
        </View>
    </Container>
     );
   }
 }
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  containerStyle: {
    backgroundColor: colors.white,
    marginTop: 20
  },
  headerStyle: {
    paddingTop: 0,
    backgroundColor: colors.headerColor,
    borderBottomColor: colors.headerColor
  },
  offerTypeStyle: {
    paddingTop: responsiveHeight(5)
  },
  sliderStyle: {

  },
  filterButtonStyle: {
    flexDirection: 'row',
    height: responsiveHeight(10),
    backgroundColor: colors.lightGray
  },
  titleStyle: {
    fontWeight: 'bold',
    color: colors.white,
    textAlign: 'center',
    fontSize: responsiveFontSize(3),
    width: variables.SCREEN_WIDTH * 0.6
  },
});
