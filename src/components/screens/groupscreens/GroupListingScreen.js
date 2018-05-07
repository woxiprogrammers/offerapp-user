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
  // responsiveHeight,
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
      'renderRow',
      'renderGroupList'
    );
  }
  componentWillMount() {
    const { token } = this.props;
    this.props.getGroupList(token);
  }
  autoBind(...methods) {
      methods.forEach(method => {
        this[method] = this[method].bind(this);
        return this[method];
      });
  }
  renderGroupList() {
    const { groupListLoading, groupList } = this.props;
    if (groupListLoading) {
      return (
        <LoadingIndicator loading={groupListLoading} />
      );
    }
    return (
      <List
        dataArray={groupList}
        renderRow={(group) => {
            return (this.renderRow(group));
          }
        }
      />
    );
  }
  renderRow(groupDetails) {
    const { groupId, groupName } = groupDetails;
      return (
        <TouchableWithoutFeedback
          onPress={() => {
            console.log(`Group: ${groupId}`);
            Actions.push('groupScreen', { groupId });
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
          {this.renderGroupList()}
        </Content>
      </Container>
    );
  }
}
const LoadingIndicator = ({ loading }) => {
  return (
    loading ? (
      <View style={styles.loadingStyle}>
        <Spinner
        // style={{ height: responsiveHeight(25) }}
        color='black'
        />
      </View>
    ) : null
  );
};
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
        getGroupList: (token) => {
          return dispatch(getGroupList(token));
        },
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GroupListingScreen);
