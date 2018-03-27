import React from 'react';
import {
  StyleSheet,
  TouchableWithoutFeedback
} from 'react-native';
import {
  Container,
  ListItem,
  Content,
  Spinner,
  Header,
  Button,
  Right,
  Input,
  Title,
  Left,
  Text,
  List,
  View,
  Item,
  Icon,
  Body,
} from 'native-base';
import { connect } from 'react-redux';
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
import { searchLocation } from '../../../actions';

class ChangeLocationScreen extends React.Component {

  onSearchTextChange(text) {
    this.props.searchLocation(text);
  }
  renderList() {
    if (this.props.searchLocationLoading) {
      return (
        <Spinner
          style={{ height: responsiveHeight(25) }}
          color='black'
        />);
    }
    return (
      <List
      dataArray={this.props.suggestedLocation}
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
      />);
   }
  render() {
    console.log(this.props);
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
            <Input
              onChangeText={this.onSearchTextChange.bind(this)}
              style={{ paddingLeft: responsiveWidth(3) }} placeholder="Search"
            />
          </Item>
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
        <View>
          {this.renderList()}
        </View>
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

function mapStateToProps({ main }) {
    const { location } = main;
    return {
        ...location
    };
}

function mapDispatchToProps(dispatch) {
    return {
        searchLocation: (text) => { return dispatch(searchLocation(text)); },
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ChangeLocationScreen);
