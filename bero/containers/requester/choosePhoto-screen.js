import React from 'react';
import { StyleSheet, View, Image, ActivityIndicator, ProgressViewIOS, Platform, Text, Dimensions } from 'react-native';
import { Button } from 'react-native-elements'
import { ImagePicker } from 'expo';
import Colors from '../../constants/colors';
import { connect } from 'react-redux';
import { ActionCreators } from '../../actions';
import firebase from 'firebase';
import Loader from '../../components/loader';

const window = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
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
    backgroundColor: 'rgba(52, 52, 52, 0.9)',
  },
  button: {
    borderRadius: 6, 
    borderColor: Colors.mintColor, 
    borderWidth: 1, 
    width: window.width * 0.4,
  }
});


class ChoosePhotoScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state
    return {
      tabBarVisible: false,
      title: 'Image',
      headerRight: <Button color={Colors.red} fontSize={20} backgroundColor={"transparent"} title={"Done"} onPress={() => params.handlePress()} />,
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
    loading: false,
    url: null,
    uploading: false,
  };

  onButtonPress = () => {
    const { topic, type, view, must_be, hero, detail, mark_position } = this.props;
    this.setState({ loading: true })
    this.props.requestCreate({ topic, type, view, must_be, hero, detail, mark_position }, this.state.url );
    setTimeout(() => {
      this.props.navigation.navigate('FormReqScreen');
      this.setState({ loading: false });
    }, 1000);
  }

  render() {
    let { url } = this.state;

    return (
      <View style={styles.container}>
      <Loader
          loading={this.state.uploading} />
      {url &&
          <Image source={{ uri: url }} style={{ width: window.width * 0.6, height: window.width * 0.6, borderRadius: 6, }} />}
        {/* {this.state.uploading &&
          <View pointerEvents="none" style={styles.loading}>
            <ActivityIndicator size='large' />
          </View>
        } */}
       <View style={{ paddingTop: 20 }}>
        <Button
          buttonStyle={styles.button}
          backgroundColor='white'
          fontSize={15}
          color={Colors.mintColor}
          title="Camera roll"
          onPress={this._pickImage}
        />
        </View>
        <Text style={{ paddingBottom: 10, paddingTop: 10, color:Colors.grey1, }}>
          or
        </Text>
        <Button
          buttonStyle={styles.button}
          backgroundColor='white'
          fontSize={15}
          color={Colors.mintColor}
          title="Take a photo"
          onPress={this._takePhoto}
        />
      </View>
    );
  }

  _pickImage = async () => {
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      quality: .8,
      allowsEditing: true,
      aspect: [4, 3],
    });

    this._handleImagePicked(pickerResult);
  };

  _takePhoto = async () => {
    let pickerResult = await ImagePicker.launchCameraAsync({
      quality: .8,
      allowsEditing: true,
      aspect: [4, 3],
    });

    this._handleImagePicked(pickerResult);
  };

  _handleImagePicked = async pickerResult => {
    let uploadResponse, uploadResult;

    try {
      this.setState({ uploading: true });

      if (!pickerResult.cancelled) {
        uploadResponse = await uploadImageAsync(pickerResult.uri);
        uploadResult = await uploadResponse.json();
        this.setState({ url: uploadResult.location });
      }
    } catch (e) {
      console.log({ uploadResponse });
      console.log({ uploadResult });
      console.log({ e });
      alert('Upload failed, sorry :(');
    } finally {
      this.setState({ uploading: false });
    }
  };

}

async function uploadImageAsync(uri) {
  let apiUrl = 'https://file-upload-backend-xzurjazqck.now.sh/upload';
  let uriParts = uri.split('.');
  let fileType = uriParts[uriParts.length - 1];

  let formData = new FormData();
  formData.append('photo', {
    uri,
    name: `photo.${fileType}`,
    type: `image/${fileType}`,
  });

  let options = {
    method: 'POST',
    body: formData,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
  };

  return fetch(apiUrl, options);
}


const mapStateToProps = (state) => {
  const { topic, type, view, must_be, hero, detail, mark_position } = state.requestForm

  return { topic, type, view, must_be, hero, detail, mark_position, };
};


export default connect(mapStateToProps, ActionCreators)(ChoosePhotoScreen);