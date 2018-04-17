import React from 'react';
import {
  TouchableWithoutFeedback,
  StyleSheet  
} from 'react-native';
import {
  Container,
  ListItem,
  Header,
  Content,
  Spinner,
  Button,
  Right,
  Title,
  Left,
  List,
  View,
  Icon,
  Body,
  Text,
} from 'native-base';
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
import { getGroupList } from '../../../actions';

class GroupListingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.autoBind(
      'renderRow'
    );
  }
  componentWillMount() {
    const { token, userId } = this.props;
    this.props.getGroupList(token, userId);
  }
  autoBind(...methods) {
      methods.forEach(method => {
        this[method] = this[method].bind(this);
        return this[method];
      });
  }
  renderRow(groupDetails) {
    const { groupId, groupName } = groupDetails;
    const { groupListLoading } = this.props;
    if (groupListLoading) {
      return (
        <View style={styles.loadingStyle}>
          <Spinner
            style={{ height: responsiveHeight(25) }}
            color='black'
          />
        </View>);
    }
      return (
        <TouchableWithoutFeedback
          onPress={() => {
            console.log(`Group: ${groupId}`);
            Actions.groupScreen();
          }}
        >
          <ListItem>
            <Body>
              <Text>{groupName}</Text>
            </Body>
            <Right style={{ alignItems: 'flex-end' }}>
              <Icon name="arrow-forward" />
            </Right>
          </ListItem>
        </TouchableWithoutFeedback>
      );
  }
  render() {
    const { groupList } = this.props;
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
            <Button transparent onPress={() => { Actions.popTo('mainScreen'); }}>
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
            dataArray={groupList}
            renderRow={(group) => {
                // console.log('Group: ');
                // console.log(group);
                return (this.renderRow(group));
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
  loadingStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black'
  },
  titleStyle: {
    fontWeight: 'bold',
    color: colors.white,
    textAlign: 'center',
    fontSize: responsiveFontSize(3),
    width: responsiveWidth(60)
  },
});

function mapStateToProps({ user, groups }) {
    const { grouplist } = groups;
    const { token } = user;
    return {
        ...grouplist,
        token
    };
}
function mapDispatchToProps(dispatch) {
    return {
        getGroupList: (token, userId) => {
          return dispatch(getGroupList(token, userId));
        },
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GroupListingScreen);
