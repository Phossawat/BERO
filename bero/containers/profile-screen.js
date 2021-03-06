import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, ScrollView, TouchableHighlight } from 'react-native';
import { Card, Text, Button, Tile, List, ListItem } from 'react-native-elements';
import { ActionCreators } from '../actions';
import { Constants } from 'expo';
import _ from 'lodash';
import Colors from '../constants/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 33,
    backgroundColor: 'white',
  },
  rectanglebit: {
    height: 56,
    borderWidth: 2,
    flexDirection: 'row',
    borderColor: Colors.grey3,
    borderRadius: 4,
    margin: 20
  },
  columnbit: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  title: {
    color: "#666",
    fontWeight: '600'
  },
  val: {
    color: "#999"
  },
});

class ProfileScreen extends React.Component {
  static navigationOptions = { header: null };

  handleSettingsPress = () => {
    this.props.navigation.navigate('Settings');
  };
  handleFriendsPress = () => {
    this.props.navigation.navigate('FriendList');
  };
  handleRedeemPress = () => {
    this.props.navigation.navigate('RedeemScreen');
  }
  handleSavedPress = () => {
    // this.props.fetch_saved();
    this.props.navigation.navigate('SavedScreen');
  }
  handleRewards = () => {
    this.props.fetch_rewards()
    this.props.navigation.navigate('RewardScreen');
  }

  render() {
    return (
      <ScrollView style={{ backgroundColor: 'white' }}>
        <Tile
          imageSrc={{ uri: this.props.userProfileObject.profilePicture }}
          featured
          title={this.props.user.displayName}
          titleStyle={{ fontWeight: 'bold' }}
          caption={this.props.user.email}
        />

        <View style={styles.rectanglebit}>
          <View style={styles.columnbit}>
            <Text style={styles.title}>
              Point
      </Text>
            <Text style={styles.val}>
              {this.props.userProfileObject.point}
      </Text>
          </View>
          <View style={styles.columnbit}>
            <Text style={styles.title}>
              Helped
      </Text>
            <Text style={styles.val}>
              {this.props.userProfileObject.help}
      </Text>
          </View>
        </View>
        <List containerStyle={{ paddingLeft: 20, paddingRight: 20, borderTopWidth: 0 }}>
          {/* <ListItem
            component={TouchableHighlight}
            title="Notification"
            titleStyle={{ fontWeight: 'bold' }}
            rightIcon={{ name: 'bell-o', type: 'font-awesome', color: '#263238' }}
            containerStyle={{ borderColor: '#CFD8DC' }}
          /> */}

          <ListItem
            component={TouchableHighlight}
            title="Saved"
            titleStyle={{ fontWeight: 'bold' }}
            rightIcon={{ name: 'heart-outline', type: 'material-community', color: '#263238' }}
            containerStyle={{ borderColor: '#CFD8DC' }}
            onPress={this.handleSavedPress}
            underlayColor="#ecf0f1"
          />

          {/* <ListItem
            component={TouchableHighlight}
            title="Friends"
            titleStyle={{ fontWeight: 'bold' }}
            rightIcon={{ name: 'address-book-o', type: 'font-awesome', color: '#263238' }}
            containerStyle={{ borderColor: '#CFD8DC' }}
            onPress={this.handleFriendsPress}
            underlayColor="#ecf0f1"
          /> */}

          <ListItem
            component={TouchableHighlight}
            title="Redeem Voucher"
            titleStyle={{ fontWeight: 'bold' }}
            rightIcon={{ name: 'wallet-giftcard', type: 'material-community', color: '#263238' }}
            containerStyle={{ borderColor: '#CFD8DC' }}
            onPress={this.handleRedeemPress}
            underlayColor="#ecf0f1"
          />

          <ListItem
            component={TouchableHighlight}
            title="Rewards"
            titleStyle={{ fontWeight: 'bold' }}
            rightIcon={{ name: 'heart-outline', type: 'material-community', color: '#263238' }}
            containerStyle={{ borderColor: '#CFD8DC' }}
            onPress={this.handleRewards}
            underlayColor="#ecf0f1"
          />

          <ListItem
            component={TouchableHighlight}
            title="Settings"
            titleStyle={{ fontWeight: 'bold' }}
            rightIcon={{ name: 'cog', type: 'font-awesome', color: '#263238' }}
            containerStyle={{ borderColor: '#CFD8DC' }}
            onPress={this.handleSettingsPress}
            underlayColor="#ecf0f1"
          />
          
          <ListItem
            component={TouchableHighlight}
            title="Report"
            titleStyle= {{ fontWeight: 'bold' }}
            rightIcon={{ name: 'feedback', color: '#263238' }}
            containerStyle={{  borderColor: '#CFD8DC' }}
            underlayColor="#ecf0f1"
            onPress={()=>this.props.navigation.navigate("ReportScreen")}
          />
        </List>

      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => {
  const { userProfileObject } = state.userForm;

  return { user: state.auth.user, userProfileObject };
};

ProfileScreen.propTypes = {
  user: React.PropTypes.object.isRequired,
  logout: React.PropTypes.func.isRequired,
};

export default connect(mapStateToProps, ActionCreators)(ProfileScreen);