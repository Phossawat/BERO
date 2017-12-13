import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, ScrollView, TouchableHighlight, Image } from 'react-native';
import { Card, Text, Button } from 'react-native-elements';
import { ActionCreators } from '../actions';
import { Constants } from 'expo';
import MiniCard  from '../components/MiniCard';
import CatagoryCard from '../components/CatagoryCard';
import SearchBox from '../components/SearchBox';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  Header: {
    color: '#34495e',
    fontSize: 20,
    fontWeight: 'bold',
  },
  image: {
    flex: 1,
    width: 60,
    height: 100,
    resizeMode: 'contain',
  },
  more: {
    paddingRight: 10, 
    color: 'grey',
  },
});


class MainScreen extends React.Component {
  static navigationOptions = { header: null };

  render() {
    return (
      <View style={styles.container}>
        <SearchBox />
        <ScrollView showsVerticalScrollIndicator={false} style={{paddingLeft: 20, zIndex: 1}}>
          <Text style={styles.Header}>category</Text>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{paddingBottom: 20, paddingTop: 20}}>
            <CatagoryCard icon="build"/>
            <CatagoryCard icon="fitness-center"/>
            <CatagoryCard icon="drive-eta"/>
            <CatagoryCard icon="local-hospital"/>
            <CatagoryCard icon="translate"/>
          </ScrollView>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',}}>
          <Text style={styles.Header}>Recently Added</Text>
          <Text style={styles.more}>More ></Text>
          </View>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <MiniCard />
            <MiniCard />
            <MiniCard />
            <MiniCard />
            <MiniCard />
          </ScrollView>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',}}>
          <View>
          <Text style={styles.Header}>Match For</Text>
          <Text style={styles.Header}>Your Skills</Text>
          </View>
          <Text style={styles.more}>More ></Text>
          </View>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <MiniCard />
            <MiniCard />
            <MiniCard />
            <MiniCard />
            <MiniCard />
          </ScrollView>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',}}>
          <Text style={styles.Header}>Official</Text>
          <Text style={styles.more}>More ></Text>
          </View>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <MiniCard />
            <MiniCard />
            <MiniCard />
            <MiniCard />
            <MiniCard />
          </ScrollView>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => ({ user: state.auth.user });

MainScreen.propTypes = {
  user: React.PropTypes.object.isRequired,
  logout: React.PropTypes.func.isRequired,
};

export default connect(mapStateToProps, ActionCreators)(MainScreen);