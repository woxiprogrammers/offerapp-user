import React from 'react';
import {
  TouchableWithoutFeedback,
  StyleSheet  
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
import { Location } from 'expo';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from 'react-native-responsive-dimensions';
import {
  colors,
} from '../../../styles';
import { getLocation, searchLocation, setLocation } from '../../../actions';

const GEOLOCATION_OPTIONS = { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 };

class ChangeLocationScreen extends React.Component {

  onSearchTextChange(text) {
    const token = this.props.token;
    this.props.searchLocation(token, text);
  }
  renderList() {
    const { token } = this.props;
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
            <TouchableWithoutFeedback
              onPress={
                async () => {
                  await this.props.setLocation(token, item);
                  Actions.push('mainScreen', { fromChangeLocation: true });
              }}
            >
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
    const { token, locationName } = this.props;
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
        <TouchableWithoutFeedback
          onPress={
            async() => {
              const location = await Location.getCurrentPositionAsync(GEOLOCATION_OPTIONS);
              const latitude = location.coords.latitude;
              const longitude = location.coords.longitude;
              const coords = { latitude, longitude };
              await this.props.getLocation(token, coords);
              await this.props.setLocation(token, locationName);
              Actions.push('mainScreen', { fromChangeLocation: true });
          }}
        >
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
        </TouchableWithoutFeedback>
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
    width: responsiveWidth(60)
  },
});

function mapStateToProps({ main, user }) {
    const { location } = main;
    const { token } = user;
    return {
        ...location,
        token
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getLocation: (token, coords) => {
          return dispatch(getLocation(token, coords));
        },
        searchLocation: (token, text) => { return dispatch(searchLocation(token, text)); },
        setLocation: (token, text) => { return dispatch(setLocation(token, text)); },
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ChangeLocationScreen);
