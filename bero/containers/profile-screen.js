import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Card, Text, Button, Tile, List, ListItem } from 'react-native-elements';
import { ActionCreators } from '../actions';
import { Constants } from 'expo';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 33,
    backgroundColor: 'white',
  },
});

class ProfileScreen extends React.Component {
  static navigationOptions = { header: null };
   handleSettingsPress = () => {
    this.props.navigation.navigate('Settings');
  }; 
  render() {
    return (
   <ScrollView style={{ backgroundColor: 'white' }}>
        <Tile
          imageSrc={{ uri: this.props.user.photoURL}}
          featured
          title={this.props.user.displayName}
          titleStyle= {{ fontWeight: 'bold' }}
          caption={this.props.user.email}
        />
        <View style={styles.container}>
        <Text>Score</Text>
        </View>
        <List containerStyle={{ paddingLeft: 20, paddingRight: 20, borderTopWidth: 0 }}>
          <ListItem
            title="Notification"
            titleStyle= {{ fontWeight: 'bold' }}
            rightIcon={{ name: 'bell-o', type: 'font-awesome', color: '#263238' }}
            containerStyle={{ borderColor: '#B0BEC5' }}
          />

          <ListItem
            title="Friends"
            titleStyle= {{ fontWeight: 'bold' }}
            rightIcon={{ name: 'address-book-o', type: 'font-awesome', color: '#263238' }}
            containerStyle={{ borderColor: '#B0BEC5' }}
          />

          <ListItem
            title="Settings"
            titleStyle= {{ fontWeight: 'bold' }}
            rightIcon={{ name: 'cog', type: 'font-awesome', color: '#263238' }}
            containerStyle={{ borderColor: '#B0BEC5' }}
            onPress={this.handleSettingsPress}
          />

          <ListItem
            title="Give us feedback"
            titleStyle= {{ fontWeight: 'bold' }}
            rightIcon={{ name: 'feedback', color: '#263238' }}
            containerStyle={{  borderColor: '#B0BEC5' }}
          />

          <ListItem
            title="Get help"
            titleStyle= {{ fontWeight: 'bold' }}
            rightIcon={{ name: 'question', type: 'font-awesome', color: '#263238' }}
            containerStyle={{ borderBottomWidth: 0, borderColor: '#B0BEC5' }}
          />
        </List>

      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({ user: state.auth.user });

ProfileScreen.propTypes = {
  user: React.PropTypes.object.isRequired,
  logout: React.PropTypes.func.isRequired,
};

export default connect(mapStateToProps, ActionCreators)(ProfileScreen);