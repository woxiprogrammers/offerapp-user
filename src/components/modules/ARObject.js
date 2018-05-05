import React from 'react';
import {
    StyleSheet,
    View,
    Text,
} from 'react-native';
import { connect } from 'react-redux';
import { Icon, Button, Badge } from 'native-base';
import { Actions } from 'react-native-router-flux';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from 'react-native-responsive-dimensions';
import { mixins, variables } from '../../styles';

class ARObject extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          offScreenLeft: false,
          offScreenRight: false
      };
  }
  componentWillReceiveProps(nextProps) {
      if ((nextProps.startingPosX + nextProps.xOffset) < 0) {
          this.setState({ offScreenLeft: true });
      } else {
          this.setState({ offScreenLeft: false });
      }
      if ((nextProps.startingPosX + nextProps.xOffset) > variables.SCREEN_WIDTH) {
          this.setState({ offScreenRight: true });
      } else {
          this.setState({ offScreenRight: false });
      }
  }
  shouldComponentUpdate(nextProps) {
      return (
          this.props.xOffset !== nextProps.xOffset ||
          this.props.yOffset !== nextProps.yOffset
      );
  }
  render() {
    const { sellerAddressId, sellerInfo, offerCount } = this.props;
    return (
      <View style={styles.root}>
        <Button
          transparent
          onPress={() => {
            console.log(`Seller Address Id is : ${sellerAddressId}`);
            console.log(`Seller Info is : ${sellerInfo}`);
            Actions.push('arListingSceen', { sellerInfo, sellerAddressId });
          }}
          style={{
                flex: 1,
                top: this.props.startingPosY + this.props.yOffset,
                left: this.props.startingPosX + this.props.xOffset
              }}
        >
          <Icon
            ios="ios-albums"
            android="md-albums"
            style={{ fontSize: responsiveFontSize(8), color: 'white' }}
          />
          <Badge
            primary
            style={{
              marginLeft: responsiveWidth(-5),
              marginTop: responsiveHeight(-2),
              alignItems: 'center',
            }}
          ><Text>{offerCount}</Text></Badge>
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    root: {
        ...mixins.arObject,
        ...mixins.row
    },
    arTarget: {
        ...mixins.arObject,
        height: 50,
        width: 50
    }
});

function mapStateToProps({ ar }) {
    const { arreducers } = ar;
    return {
        ...arreducers
    };
}
export default connect(
    mapStateToProps,
    //mapDispatchToProps
)(ARObject);
