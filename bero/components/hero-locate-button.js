import React, { PropTypes } from 'react';
import { TouchableHighlight, View, StyleSheet, Dimensions, Platform, Image } from 'react-native';
import { Icon } from 'react-native-elements';
import { Constants, Location, Permissions, DangerZone } from 'expo';

const { Lottie } = DangerZone;

const window = Dimensions.get('window');

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'red',
    width: window.width * 0.4,
    height: window.width * 0.4,
    borderRadius: 600,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    backgroundColor: 'transparent',
  },
  image: {
    flex: 1,
    width: window.width * 0.4,
    height: window.width * 0.4,
    resizeMode: 'contain',
  },
});

const HeroLocateButton = ({ onPress = () => null , loading = false ,animation = ""}) => {


  return (
    <TouchableHighlight
      style={styles.button}
      onPress={onPress}
      underlayColor='#263238'
      disabled={loading}
    >
      <View style={styles.button}>
        {loading ?
         <View>
          <Lottie
            ref={animation => {
              if(animation==null){

              }
              else{
                animation.play();
              }
            }}
            style={{
              width: window.width * 0.4,
              height: window.width * 0.4,
              backgroundColor: 'white',
            }}
            loop={true}
            source={require('../assets/animations/bouncy_mapmaker.json')}
          />
          </View>
        :
          <Image source={require('../assets/appicon.png')} style={styles.image}/>
        }
      </View>
    </TouchableHighlight>
  );
};

HeroLocateButton.propTypes = {
  onPress: PropTypes.func,
  loading: PropTypes.bool,
};

export default HeroLocateButton;