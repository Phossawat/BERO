import React from 'react';
import { connect } from 'react-redux';
import { ActionCreators } from '../../actions';
import { StyleSheet, View, ScrollView, TextInput, Dimensions } from 'react-native';
import { Card, Text, Button, FormInput, FormLabel, FormValidationMessage, CheckBox } from 'react-native-elements';
import ModalSelector from 'react-native-modal-selector'
import Colors from '../../constants/colors';

const window = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 33,
        backgroundColor: 'white',
    },
    Header: {
        color: Colors.red,
        fontSize: 20,
        fontWeight: 'bold',
        paddingLeft: 20,
        paddingTop: 50,
    },
});

class FormReqScreen extends React.Component {
    static navigationOptions = { header: null };
    state = {
        location: null,
      };
    handleNextPress = () => {
        _getLocationAsync = async () => {
            let { status } = await Permissions.askAsync(Permissions.LOCATION);
            if (status !== 'granted') {
              this.setState({
                errorMessage: 'Permission to access location was denied',
              });
            }
            let region = await Location.getCurrentPositionAsync({});

          };
          this.props.navigation.navigate('LocationPickupScreen');
      };     
     
    render() {
        let index = 0;
        const type_data = [
            { key: index++, label: 'Car repair' },
            { key: index++, label: 'Medic' },
            { key: index++, label: 'Chef' },
            { key: index++, label: 'Path Finder' },
            { key: index++, label: 'Programmer' },
            { key: index++, label: 'Nothing' },
        ];
        const view_data = [
            { key: index++, label: 'Friend only' },
            { key: index++, label: 'Public' },
            { key: index++, label: 'Except Friend' },
        ];
        const mustBe_data = [
            { key: index++, label: 'All' },
            { key: index++, label: 'Male' },
            { key: index++, label: 'Female' },
        ];
        const hero_data = [
            { key: index++, label: '1' },
            { key: index++, label: '2' },
            { key: index++, label: '3' },
            { key: index++, label: '4' },
            { key: index++, label: '5' },
        ];
        let content;

  if (this.props.isLoggingIn) {
    content = (
      <View>
          <Text> Me Request kank u naja</Text>
      </View>
    );
  } else {
    content = (
        <View style={{flex: 1}}>
            <ScrollView style={{ backgroundColor: 'white' }}>

                <Text style={styles.Header}>Create your request</Text>
                <FormLabel>
                    <Text style={{ color: Colors.mintColor }}>Topic</Text>
                </FormLabel>
                <FormInput containerStyle={{ borderBottomColor: Colors.mintColor }}
                    inputStyle={{width:window.width * 0.9}}
                    maxLength={50}
                    value={this.props.topic}
                    onChangeText={text => this.props.requestUpdate({ prop: 'topic', value: text })}/>

                <View style={{ flexDirection: 'row', }}>
                    <ModalSelector
                        style={{ width: window.width * 0.5 }}
                        data={type_data}
                        onChange={type => this.props.requestUpdate({ prop: 'type', value: type.label })}>
                        <FormLabel>
                            <Text style={{ color: Colors.mintColor }}>Type</Text>
                        </FormLabel>
                        <FormInput containerStyle={{ borderBottomColor: Colors.mintColor }}
                            editable={false}
                            value={this.props.type} />
                    </ModalSelector>
                    <ModalSelector
                        style={{ width: window.width * 0.5 }}
                        data={view_data}
                        onChange={view => this.props.requestUpdate({ prop: 'view', value: view.label })}>
                        <FormLabel>
                            <Text style={{ color: Colors.mintColor }}>View</Text>
                        </FormLabel>
                        <FormInput containerStyle={{ borderBottomColor: Colors.mintColor }}
                            editable={false}
                            value={this.props.view} />
                    </ModalSelector>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                    <ModalSelector
                        style={{ width: window.width * 0.5 }}
                        data={mustBe_data}
                        onChange={must_be => this.props.requestUpdate({ prop: 'must_be', value: must_be.label })}>
                        <FormLabel>
                            <Text style={{ color: Colors.mintColor }}>Must be</Text>
                        </FormLabel>
                        <FormInput containerStyle={{ borderBottomColor: Colors.mintColor }}
                            editable={false}
                            value={this.props.must_be} />
                    </ModalSelector>
                    <ModalSelector
                        style={{ width: window.width * 0.5 }}
                        data={hero_data}
                        onChange={hero => this.props.requestUpdate({ prop: 'hero', value: hero.label })}>
                        <FormLabel>
                            <Text style={{ color: Colors.mintColor }}>Hero</Text>
                        </FormLabel>
                        <FormInput containerStyle={{ borderBottomColor: Colors.mintColor}}
                            type='number'
                            editable={false}
                            value={this.props.hero} />
                    </ModalSelector>
                </View>

                <FormLabel>
                    <Text style={{ color: Colors.mintColor }}>Detail</Text>
                </FormLabel>
                <FormInput containerStyle={{ borderBottomColor: Colors.mintColor }}
                    inputStyle={{width:window.width * 0.9}}
                    multiline={true}
                    value={this.props.detail}
                    onChangeText={text => this.props.requestUpdate({ prop: 'detail', value: text })}/>
            </ScrollView>
            <View style={{backgroundColor: 'white'}}>
            <Button
                    style={{paddingTop: 10, paddingBottom: 10, borderRadius: 3, }}
                    backgroundColor='#EF5350'
                    color='white'
                    onPress={this.handleNextPress}
                    title='Next'/>
            </View>
            </View>
    );
  }
        return (
        <View style={{flex: 1}}>
            <ScrollView style={{ backgroundColor: 'white' }}>

                <Text style={styles.Header}>Create your request</Text>
                <FormLabel>
                    <Text style={{ color: Colors.mintColor }}>Topic</Text>
                </FormLabel>
                <FormInput containerStyle={{ borderBottomColor: Colors.mintColor }}
                    inputStyle={{width:window.width * 0.9}}
                    maxLength={50}
                    value={this.props.topic}
                    onChangeText={text => this.props.requestUpdate({ prop: 'topic', value: text })}/>

                <View style={{ flexDirection: 'row', }}>
                    <ModalSelector
                        style={{ width: window.width * 0.5 }}
                        data={type_data}
                        onChange={type => this.props.requestUpdate({ prop: 'type', value: type.label })}>
                        <FormLabel>
                            <Text style={{ color: Colors.mintColor }}>Type</Text>
                        </FormLabel>
                        <FormInput containerStyle={{ borderBottomColor: Colors.mintColor }}
                            editable={false}
                            value={this.props.type} />
                    </ModalSelector>
                    <ModalSelector
                        style={{ width: window.width * 0.5 }}
                        data={view_data}
                        onChange={view => this.props.requestUpdate({ prop: 'view', value: view.label })}>
                        <FormLabel>
                            <Text style={{ color: Colors.mintColor }}>View</Text>
                        </FormLabel>
                        <FormInput containerStyle={{ borderBottomColor: Colors.mintColor }}
                            editable={false}
                            value={this.props.view} />
                    </ModalSelector>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                    <ModalSelector
                        style={{ width: window.width * 0.5 }}
                        data={mustBe_data}
                        onChange={must_be => this.props.requestUpdate({ prop: 'must_be', value: must_be.label })}>
                        <FormLabel>
                            <Text style={{ color: Colors.mintColor }}>Must be</Text>
                        </FormLabel>
                        <FormInput containerStyle={{ borderBottomColor: Colors.mintColor }}
                            editable={false}
                            value={this.props.must_be} />
                    </ModalSelector>
                    <ModalSelector
                        style={{ width: window.width * 0.5 }}
                        data={hero_data}
                        onChange={hero => this.props.requestUpdate({ prop: 'hero', value: hero.label })}>
                        <FormLabel>
                            <Text style={{ color: Colors.mintColor }}>Hero</Text>
                        </FormLabel>
                        <FormInput containerStyle={{ borderBottomColor: Colors.mintColor}}
                            type='number'
                            editable={false}
                            value={this.props.hero} />
                    </ModalSelector>
                </View>

                <FormLabel>
                    <Text style={{ color: Colors.mintColor }}>Detail</Text>
                </FormLabel>
                <FormInput containerStyle={{ borderBottomColor: Colors.mintColor }}
                    inputStyle={{width:window.width * 0.9}}
                    multiline={true}
                    value={this.props.detail}
                    onChangeText={text => this.props.requestUpdate({ prop: 'detail', value: text })}/>
            </ScrollView>
            <View style={{backgroundColor: 'white'}}>
            <Button
                    style={{paddingTop: 10, paddingBottom: 10, borderRadius: 3, }}
                    backgroundColor='#EF5350'
                    color='white'
                    onPress={this.handleNextPress}
                    title='Next'/>
            </View>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    const { topic, type, view, must_be, hero, detail } = state.requestForm;
   
    return { topic, type, view, must_be, hero, detail  };
  };
  
  
  export default connect(mapStateToProps, ActionCreators)(FormReqScreen);