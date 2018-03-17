import React from 'react';
import { StyleSheet, Image, ScrollView } from 'react-native';
import {
  Container,
  Header,
  Content,
  Button,
  Right,
  Title,
  Left,
  View,
  Icon,
  Body,
  Text,
} from 'native-base';
import Swiper from 'react-native-swiper';
import {
  variables,
  // mixins,
  colors,
 } from '../../styles';
import SmallOfferCard from '../modules/SmallOfferCard';
import loading from '../../assets/images/loading.gif';

const Slide = props => {
  return (<View style={styles.slide}>
    <Image
      onLoad={props.loadHandle.bind(null, props.i)}
      style={styles.image}
      source={{ uri: props.uri }}
    />
    {
      !props.loaded && <View style={styles.loadingView}>
        <Image style={styles.loadingImage} source={loading} />
      </View>
    }
  </View>);
};
export default class MainScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imgList: [
        'http://www.ttkprestige.com/media/images/html/Banner(5).jpg',
        'http://offers.droom.in/wp-content/uploads/2016/08/offer-page.jpg',
        'https://www.cleartrip.com/offers/sites/default/files/styles/destination-top/public/diwali_traveloffer_nov15.jpg?itok=tLg47GSO',
        'https://www.coupenyaari.in/wp-content/uploads/2017/11/Mi-Exchange-Offer-Exchange-Your-Old-Phone-with-Huge-Discount.png'
      ],
      loadQueue: [0, 0, 0, 0]
    };
    this.loadHandle = this.loadHandle.bind(this);
  }
  loadHandle(i) {
      const loadQueue = this.state.loadQueue;
      loadQueue[i] = 1;
      this.setState({
        loadQueue
      });
  }
  render() {
    const {
      containerStyle,
      locationStyle,
      headerStyle,
      swiperStyle,
      titleStyle
    } = styles;
    return (
      <Container style={containerStyle}>
        <Header
          style={headerStyle}
          iosBarStyle='light-content'
        >
          <Left>
            <Button transparent>
              <Icon style={{ color: 'white' }} ios='ios-menu' android="md-menu" />
            </Button>
          </Left>
          <Body>
            <Title style={titleStyle}>MAIN SCREEN</Title>
          </Body>
          <Right />
        </Header>
        <Content style={{ paddingTop: 5 }}>
          <View style={{ flex: 1 }}>
            <View style={locationStyle}>
              <View>
                <Text style={{ fontSize: variables.SCREEN_HEIGHT / 50 }}>YOUR LOCATION</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Icon style={{ color: 'black' }} ios='ios-pin' android="md-pin" />
                <Text>  Vanaz Corner, Kothrud</Text>
                <Right>
                  <Button transparent>
                    <Text
                      style={{
                        fontSize: variables.SCREEN_HEIGHT / 50,
                        color: 'green',
                       }}
                    >CHANGE</Text>
                  </Button>
                </Right>
              </View>
            </View>
            <View>
              <Swiper autoplay style={swiperStyle} >
                {
                  this.state.imgList.map((item, i) => {
                    return (<Slide
                    loadHandle={this.loadHandle}
                    loaded={!!this.state.loadQueue[i]}
                    uri={item}
                    i={i}
                    key={i}
                    />);
                  })
                }
              </Swiper>
            </View>
            <View
              style={{
                backgroundColor: '#1C2A3A',
                height: variables.SCREEN_HEIGHT * 0.4,
                marginTop: 10,
                paddingBottom: 10 }}
            >
              <View>
                <Text
                  style={{
                    paddingLeft: 10,
                    paddingTop: 10,
                    color: colors.white }}
                >Top 5 Offers</Text>
              </View>
              <ScrollView
                showsHorizontalScrollIndicator={false}
                horizontal
                style={{ paddingLeft: 10 }}
              >
                <SmallOfferCard />
                <SmallOfferCard />
                <SmallOfferCard />
              </ScrollView>
            </View>
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
    fontSize: 18,
    width: variables.SCREEN_WIDTH
  },
  locationStyle: {
    height: variables.SCREEN_HEIGHT / 10,
    backgroundColor: '#EFF2F7',
    paddingLeft: 10
  },
  swiperStyle: {
    height: variables.SCREEN_HEIGHT * 0.25
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },
  image: {
    width: variables.SCREEN_WIDTH,
    flex: 1,
    backgroundColor: 'transparent'
  },
  loadingView: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,.5)'
  },
  loadingImage: {
    width: 60,
    height: 60
  }
});
