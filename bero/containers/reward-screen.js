import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Dimensions, FlatList, TouchableOpacity, Image, Platform } from 'react-native';
import { ActionCreators } from '../actions';
import { DangerZone } from 'expo';
import Colors from '../constants/colors';
import _ from 'lodash';

const window = Dimensions.get('window')

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.grey4,
      },
})

class RewardScreen extends React.Component {
    static navigationOptions = {
        tabBarVisible: false,
        title: 'Rewards',
        headerTintColor: '#EF5350',
        headerTitleStyle: { color: 'black' },
        headerStyle: {
          marginTop: (Platform.OS === 'ios') ? 0 : Expo.Constants.statusBarHeight,
          backgroundColor: 'white',
          borderBottomWidth: 0,
       },
      };
    
    handleReward = (item) => {
        this.props.navigation.navigate("RewardViewScreen",{
            item: item })
    }  
    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={this.props.rewardsArray}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={{ paddingTop: 5, paddingBottom: 10, marginBottom:5 , width: window.width, height: window.height * 0.30 }}
                            onPress={() => this.handleReward(item)}>
                            <Image resizeMode={"stretch"}
                                source={{ uri: item.image }}
                                style={{ width: window.width, height: window.height * 0.30 }} />
                        </TouchableOpacity>
                    )}
                    keyExtractor={item => item.uid}
                />
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    const { rewards } = state.reward;
    const rewardsArray = _.map(rewards, (val, uid) => {
        return { ...val, uid };
    })
    return { rewardsArray };
};

export default connect(mapStateToProps, ActionCreators)(RewardScreen);