import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, ScrollView, TouchableHighlight } from 'react-native';
import { Card, Text, Button, Tile, List, ListItem } from 'react-native-elements';
import { ActionCreators } from '../actions';
import { Constants } from 'expo';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 33,
    backgroundColor: 'white',
  },
  rectanglebit:{
    height:56,
    borderWidth:2,
    flexDirection:'row',
    borderColor:'#e3e3e3',
    margin:20
  },
  columnbit:{
    flex:1,
    alignItems:'center',
    justifyContent:'space-around'
  },
  title:{
    color:"#666",
    fontWeight:'600'
  },
  val:{
    color:"#999"
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

      <View style={styles.rectanglebit}>
      <View style={styles.columnbit}>
      <Text style={styles.title}>
      Rank
      </Text>
      <Text style={styles.val}>
      D+
      </Text>
      </View>
       <View style={styles.columnbit}>
      <Text style={styles.title}>
      Score
      </Text>
      <Text style={styles.val}>
      0
      </Text>
      </View>
       <View style={styles.columnbit}>
      <Text style={styles.title}>
      Helped
      </Text>
      <Text style={styles.val}>
      0
      </Text>
      </View>
      </View>
        <List containerStyle={{ paddingLeft: 20, paddingRight: 20, borderTopWidth: 0 }}>
          <ListItem
            component={TouchableHighlight}
            title="Notification"
            titleStyle= {{ fontWeight: 'bold' }}
            rightIcon={{ name: 'bell-o', type: 'font-awesome', color: '#263238' }}
            containerStyle={{ borderColor: '#CFD8DC' }}
          />

          <ListItem
            component={TouchableHighlight}
            title="Friends"
            titleStyle= {{ fontWeight: 'bold' }}
            rightIcon={{ name: 'address-book-o', type: 'font-awesome', color: '#263238' }}
            containerStyle={{ borderColor: '#CFD8DC' }}
            underlayColor="#ecf0f1"
          />

          <ListItem
            component={TouchableHighlight}
            title="Settings"
            titleStyle= {{ fontWeight: 'bold' }}
            rightIcon={{ name: 'cog', type: 'font-awesome', color: '#263238' }}
            containerStyle={{ borderColor: '#CFD8DC' }}
            onPress={this.handleSettingsPress}
            underlayColor="#ecf0f1"
          />

          <ListItem
            component={TouchableHighlight}
            title="Give us feedback"
            titleStyle= {{ fontWeight: 'bold' }}
            rightIcon={{ name: 'feedback', color: '#263238' }}
            containerStyle={{  borderColor: '#CFD8DC' }}
            underlayColor="#ecf0f1"
          />

          <ListItem
            component={TouchableHighlight}
            title="Get help"
            titleStyle= {{ fontWeight: 'bold' }}
            rightIcon={{ name: 'question', type: 'font-awesome', color: '#263238' }}
            containerStyle={{ borderBottomWidth: 0, borderColor: '#CFD8DC' }}
            underlayColor="#ecf0f1"
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