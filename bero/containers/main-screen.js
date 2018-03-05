import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, ScrollView, TouchableHighlight, Image, Dimensions, TouchableOpacity } from 'react-native';
import { Card, Text, Button, Icon } from 'react-native-elements';
import { ActionCreators } from '../actions';
import { Constants } from 'expo';
import MiniCard from '../components/MiniCard';
import CatagoryCard from '../components/CatagoryCard';
import SearchBox from '../components/SearchBox';
import { FloatingAction } from 'react-native-floating-action';
import call from 'react-native-phone-call'
import Colors from '../constants/colors';

const window = Dimensions.get('window');
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
  LongButton: {
    backgroundColor: '#EF5350',
    width: window.width * 0.9,
    height: 70,
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

const actions = [{
  text: 'เจ็บป่วยฉุกเฉิน',
  icon: <Icon name="ambulance" type='font-awesome' color="white" />,
  name: 'ambulance',
  position: 3,
  color: Colors.red,
},
{
  text: 'เหตุด่วนเหตุร้าย',
  icon: <Icon name="taxi" type='font-awesome' color="white" />,
  name: 'police',
  position: 2,
  color: Colors.red,
},
{
  text: 'เหตุไฟไหม้รถดับเพลิง',
  icon: <Icon name="fire-extinguisher" type='font-awesome' color="white" />,
  name: 'fire',
  position: 1,
  color: Colors.red,
},
];

class MainScreen extends React.Component {
  static navigationOptions = { header: null };

  state = {
    visible: true
  };

  render() {
    const { visible } = this.state;
    return (
      <View style={styles.container}>
        <SearchBox />
        <ScrollView showsVerticalScrollIndicator={false} style={{ paddingLeft: 20 }}
          onScrollBeginDrag={() => this.setState({
            visible: false
          })}
          onScrollEndDrag={() => this.setState({
            visible: true
          })}
        ><View style={{ paddingBottom: 20, paddingTop: 20 }}>
            <TouchableOpacity style={styles.LongButton}>
              {/* <Image source={require('../../assets/Test.jpeg')} style={styles.image} resizeMode="stretch" /> */}
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                <Text style={{color:"white",fontSize:30, fontWeight:"bold" }}>Map</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
            <Text style={styles.Header}>Recently Added</Text>
            <Text style={styles.more}>More ></Text>
          </View>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} snapToInterval={130}>
            <MiniCard onPress={() => this.props.navigation.navigate('RequestView')} />
            <MiniCard />
            <MiniCard />
            <MiniCard />
            <MiniCard />
          </ScrollView>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
            <View>
              <Text style={styles.Header}>Match For</Text>
              <Text style={styles.Header}>Your Skills</Text>
            </View>
            <Text style={styles.more}>More ></Text>
          </View>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} snapToInterval={130}>
            <MiniCard />
            <MiniCard />
            <MiniCard />
            <MiniCard />
            <MiniCard />
          </ScrollView>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
            <Text style={styles.Header}>Official</Text>
            <Text style={styles.more}>More ></Text>
          </View>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} snapToInterval={130}>
            <MiniCard />
            <MiniCard />
            <MiniCard />
            <MiniCard />
            <MiniCard />
          </ScrollView>
        </ScrollView>
        <FloatingAction
          visible={visible}
          actions={actions}
          distanceToEdge={10}
          buttonColor={Colors.red}
          onPressItem={
            (name) => {
              switch (name) {
                case "ambulance":
                  call({
                    number: '1669',
                    prompt: false
                  }).catch(console.error)
                  break;
                case "police":
                  call({
                    number: '191',
                    prompt: false
                  }).catch(console.error)
                  break;
                case "fire":
                  call({
                    number: '199',
                    prompt: false
                  }).catch(console.error)
                  break;
                default:
                  console.log(`selected button: ${name}`)
              }
            }
          }
        />
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