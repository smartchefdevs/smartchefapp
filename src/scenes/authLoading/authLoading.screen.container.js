import React from 'react';
import { View, ActivityIndicator, StatusBar } from "react-native";
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
// actions
import AppActions from 'smartchef/src/services/app/app.persist.reducer';

class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const {setSession, setIsLoggedIn} = this.props;
    const userToken = await AsyncStorage.getItem('@smartchefUser');
    const sessionData = JSON.parse(userToken);
    setSession(sessionData);
    setIsLoggedIn();
    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    console.tron.log("usertoken", sessionData);
    this.props.navigation.navigate(userToken ? 'AppMain' : 'SignIn');
  };

  // Render any loading content that you like here
  render() {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" backgroundColor="orange" />
      </View>
    );
  }
}

const mapStateToProps = state => ({

})

const mapStateToDispatch = dispatch => ({
  setSession: values => dispatch(AppActions.setSession(values)),
  setIsLoggedIn: () => dispatch(AppActions.setIsLoggedIn(true)),
})
export default connect(mapStateToProps, mapStateToDispatch)(AuthLoadingScreen);