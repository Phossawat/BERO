import React from 'react';
import { StyleSheet, View, } from 'react-native';
import { Button } from 'react-native-elements';
import { DangerZone } from 'expo';
const { Lottie } = DangerZone;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 33,
    backgroundColor: 'white',
  },
});

export default class FindingScreen extends React.Component {
    static navigationOptions = {
    title: 'HERO',
    headerStyle: {
      backgroundColor: 'white',
      borderBottomWidth: 0,
   },
  };

    constructor(props) {
    super(props);
  }
  goToNearMe = () => {
      this.animation.play();
      setTimeout(() => {
      this.props.navigation.navigate('ListHelpScreen');
    }, 3000);
  };

  render() {
    return (
      <View style={styles.container} >
          <View>
          <Lottie
            ref={animation => {
              this.animation = animation;
            }}
            style={{
              width: 400,
              height: 400,
              backgroundColor: 'white',
            }}
            loop={true}
            source={require('../../assets/animations/servishero_loading.json')}
            onPress={this.goToNearMe}
          />
          </View>
          <Button onPress={this.goToNearMe} title='NEXT' buttonStyle={{backgroundColor: 'red'}}/>
      </View>
    );
  }
}