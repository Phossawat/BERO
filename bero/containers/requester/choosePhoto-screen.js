import React from 'react';
import { StyleSheet, View, Button, Image, ActivityIndicator, ProgressViewIOS, Platform, Text } from 'react-native';
import { ImagePicker } from 'expo';
import Colors from '../../constants/colors';
import { connect } from 'react-redux';
import { ActionCreators } from '../../actions';
import firebase from 'firebase';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 33,
    backgroundColor: 'white',
  },
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5FCFF88',

  },
});


class ChoosePhotoScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state
    return {
      title: 'Image',
      headerRight: <Button color={Colors.red} title={"Done"} onPress={() => params.handlePress()} />,
      headerTintColor: '#EF5350',
      headerTitleStyle: { color: 'black' },
      headerStyle: {
        backgroundColor: 'white',
        borderBottomWidth: 0,
      },
    }
  };
  componentDidMount() {
    this.props.navigation.setParams({ handlePress: this.onButtonPress })
  }
  state = {
    progress: 1,
    image: null,
    loading: false,
    url: null,
  };

  onButtonPress = () => {
    const { topic, type, view, must_be, hero, detail, mark_position } = this.props;
    this.setState({ loading: true })
    this.props.requestCreate({ topic, type, view, must_be, hero, detail, mark_position },this.state.url);
    setTimeout(() => {
      this.props.navigation.navigate('FormReqScreen');
      this.setState({ loading: false });
    }, 1000);
  }

  render() {
    let { image } = this.state;

    return (
      <View style={styles.container}>
        <Button
          title="Pick an image from camera roll"
          color={Colors.red}
          onPress={this._pickImage}
        />
        {image &&
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
        {this.state.loading &&
          <View pointerEvents="none" style={styles.loading}>
            <ActivityIndicator size='large' />
          </View>
        }
        {this.state.progress === 1
          ? null
          : <ProgressViewIOS
            progress={this.state.progress}
            style={{
              padding: 20,
              height: 6
            }} />
        }
      </View>
    );
  }

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: .8,
      aspect: [4, 3],
      base64: true
    });

    console.log(result);

    if (!result.cancelled) {
      // this._uploadAsByteArray(result.base64, (progress) => {
      //   console.log(progress)
      //   this.setState({ progress })
      // })
      this.setState({ image: result.uri });
      this.setState({ url: "https://firebasestorage.googleapis.com/v0/b/bero-be-a-hero.appspot.com/o/images%2Ftest1.jpg?alt=media&token=bcdbb820-6b5d-42f1-908d-3dc9997314ed"})
    }
  };
  _uploadAsByteArray = async (pickerResultAsByteArray, progressCallback) => {
    
        try {
    
          var metadata = {
            contentType: 'image/jpeg',
          };
          let name = new Date().getTime() + "-request.jpg"
          const sessionId = new Date().getTime()
          var storageRef = firebase.storage().ref('images').child(`${sessionId}`)
          let message = 'data:image/jpeg;base64, '+ pickerResultAsByteArray
          let uploadTask = storageRef.putString(message,"raw",metadata)
      
          uploadTask.on('state_changed', function (snapshot) {
      
            progressCallback && progressCallback(snapshot.bytesTransferred / snapshot.totalBytes)
      
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
      
          }, function (error) {
            console.log("in _uploadAsByteArray ", error)
          }, function () {
            var downloadURL = uploadTask.snapshot.downloadURL;
            this.setState({ url: result.uri });
          });
        } catch (ee) {
          console.log("when trying to load _uploadAsByteArray ", ee)
        }
      }

}

const mapStateToProps = (state) => {
  const { topic, type, view, must_be, hero, detail, mark_position } = state.requestForm;
  
   return { topic, type, view, must_be, hero, detail, mark_position };
};


export default connect(mapStateToProps, ActionCreators)(ChoosePhotoScreen);