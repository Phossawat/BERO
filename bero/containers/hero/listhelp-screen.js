import React from 'react';
import { StyleSheet, View, FlatList, Image, Dimensions, TouchableOpacity, Platform } from 'react-native';
import FloatingButton from '../../components/FloatingButton';
import { Card, Text, Button, FormInput, FormLabel, FormValidationMessage, CheckBox, Tile, Icon } from 'react-native-elements';
import Colors from '../../constants/colors';
import { connect } from 'react-redux';
import { ActionCreators } from '../../actions';
import _ from 'lodash';

const window = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20,
    backgroundColor: 'white',
  },
});

class ListHelpScreen extends React.Component {
  static navigationOptions = {
    tabBarVisible: false,
    title: 'List',
    headerTintColor: '#EF5350',
    headerTitleStyle: { color: 'black' },
    headerStyle: {
      marginTop: (Platform.OS === 'ios') ? 0 : Expo.Constants.statusBarHeight,
      backgroundColor: 'white',
      borderBottomWidth: 0,
    },
  };
  state = {
    refreshing: false,
  }

  componentDidMount(){
    console.log("data is "+this.props.requestArray)
    this.props.requestFetchNear(this.props.keyNear)
  }

  handleRefresh= () => {
    this.props.requestFetchNearKeys(this.props.navigation.state.params.location.latitude, 
      this.props.navigation.state.params.location.longitude, 
      this.props.navigation.state.params.distance )
    this.setState({ refreshing: true })
    this.props.requestFetchNear(this.props.keyNear)
  }
  componentWillReceiveProps(nextProps){
    this.setState({ refreshing: false })
  }

  handleRequest = (item) => {
    this.props.requestFetchAccepted(item.uid)
    this.props.navigation.navigate('RequestView', {
      uid: item.uid })
  }

  render() {
    return (
      <View style={styles.container} >
         <FlatList
        showsVerticalScrollIndicator={false}
        data={this.props.requestObject}
        refreshing={false}
        onRefresh={this.handleRefresh}
        renderItem={({ item }) => (
          <TouchableOpacity style={{paddingTop: 5, paddingBottom: 10}}
          onPress={()=>this.handleRequest(item)}>
            <Image resizeMode={"cover"}
              source={{ uri: item.imageUrl }}
              style={{ height: window.height * 0.3, borderRadius: 3, }} />
            <Text style={{ color: Colors.mintColor, fontSize: 12, fontWeight: 'bold', paddingTop: 8 }}>{item.type}</Text>
            <Text style={{ color: Colors.grey1, fontSize: 20, fontWeight: 'bold', paddingTop: 3 }}>{item.topic}</Text>
            <Text style={{ color: Colors.grey1, fontSize: 12, paddingTop: 3 }}>{item.heroAccepted}/{item.hero} persons</Text>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.uid}
        />
        {this.props.requestObject&&
        <FloatingButton
          icon="map"
          onPress={()=>this.props.navigation.navigate('MapHelpScreen')}
        />
        }
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const { requestObject, keyNear } = state.requestForm;
//   const requestArray = _.map(requestObject, (val, uid) => {
//     return { ...val, uid }; 
// });
  return { requestObject, keyNear };
};


export default connect(mapStateToProps, ActionCreators)(ListHelpScreen);