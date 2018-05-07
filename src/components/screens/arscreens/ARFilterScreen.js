import React from 'react';
import {
  StyleSheet,
  Slider,
  TouchableOpacity,
  TouchableWithoutFeedback,
  FlatList
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
  Text,
  View,
  Icon,
  Body,
} from 'native-base';
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
import { updateARFilter, updateAROfferTypes, updateARDistance } from '../../../actions';

class ARFilterScreen extends React.Component {
  setType(text) {
    const typeSelected = text;
    this.props.updateAROfferTypes(typeSelected);
  }
  filterPressed = () => {
    const { distance, typeSelected } = this.props;
    this.props.updateARFilter({ distance, typeSelected });
  }
  keyExtractor = (item, index) => { return index.toString(); };
  renderOfferTypes() {
    const { typeSelected, offerTypes } = this.props;
    return (
      <FlatList
        data={offerTypes}
        keyExtractor={this.keyExtractor}
        extraData={this.props.typeSelected}
        renderItem={(offerItem) => {
          const { name, slug } = offerItem.item;
          return (
            <TouchableWithoutFeedback
              onPress={() => {
              this.setType(slug);
              }}
            >
              <ListItem>
                <Body>
                  <Text>{name}</Text>
                </Body>
                <Right>
                  <Radio selected={typeSelected === slug} />
                </Right>
              </ListItem>
            </TouchableWithoutFeedback>
          );
          }
        }
      />
    );
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
    const { typeSelected, distance } = this.props;
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
              <Text>{distance} Km</Text>
            </Right>
          </View>
          <Slider
           step={1}
           minimumValue={1}
           maximumValue={5}
           value={distance}
           onSlidingComplete={(val) => {
             this.props.updateARDistance(val);
           }}
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
        {this.renderOfferTypes()}
        </View>
        </Content>
        <View style={filterButtonStyle}>
        <TouchableOpacity
          onPress={() => {
            this.filterPressed();
            Actions.push('arScreen', {});
          }}
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
    width: responsiveWidth(60)
  },
});
function mapStateToProps({ drawer, ar }) {
    const { aroffers } = ar;
    const { offerTypes } = drawer;
    return {
      offerTypes,
      ...aroffers
    };
}
function mapDispatchToProps(dispatch) {
    return {
        updateARFilter: ({ distance, typeSelected }) => {
          return dispatch(updateARFilter({ distance, typeSelected }));
        },
        updateAROfferTypes: (typeSelected) => {
          return dispatch(updateAROfferTypes(typeSelected));
        },
        updateARDistance: (distance) => {
          return dispatch(updateARDistance(distance));
        },
    };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ARFilterScreen);
