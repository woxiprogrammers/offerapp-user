import React from 'react';
import {
    StyleSheet,
    View,
    Text,
} from 'react-native';
import { connect } from 'react-redux';
import { Icon } from 'native-base';
// import { Actions } from 'react-native-router-flux';
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
  renderIcon() {
    if (this.props.offerCategory === 'clothing') {
      return <Icon ios='ios-shirt' android="md-shirt" style={{ fontSize: 50, color: 'white' }} />;
    } else if (this.props.offerCategory === 'bank') {
      return <Icon ios='ios-cash' android="md-cash" style={{ fontSize: 50, color: 'white' }} />;
    }
  }
  render() {
    return (
      <View style={styles.root}>
        <Text
          onPress={() => { console.log(this.props.offerId); }}
          style={[
              ...styles.arTarget,
              {
                  top: this.props.startingPosY + this.props.yOffset,
                  left: this.props.startingPosX + this.props.xOffset
              }
          ]}
        >
        {this.renderIcon()}
        </Text>
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
