import React from "react";
import { View, Text, Button, ActivityIndicator, StatusBar } from "react-native";
import MdIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  createBottomTabNavigator,
  createStackNavigator,
  createAppContainer,
  createSwitchNavigator
} from 'react-navigation';

// screen
import LoginScreen from 'amissa/src/scenes/login/login.container';
import RegisterScreen from 'amissa/src/scenes/register/register.container';
import HomeScreen from 'amissa/src/scenes/home/home.container'
import PublishScreen from 'amissa/src/scenes/publish/publish.container'
import AccountScreen from 'amissa/src/scenes/account/account.screen'
// utils
import { Colors } from 'amissa/src/styles/Colors';
import { verifyUser } from 'amissa/src/common/firebase.auth'

class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const userToken = await verifyUser();

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    console.log("usertoken", userToken);
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

const defaultScreen = () => {
  return (
    <View>
      <Text>{"En construccion"}</Text>
    </View>
  );
};

const TabNavigator = createBottomTabNavigator(
  {
    Home: HomeScreen,
    Search: defaultScreen,
    Loss: PublishScreen,
    Account: AccountScreen
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = MdIcons;
        let iconName = `account-circle${focused ? '' : '-outline'}`;
        if (routeName === 'Home') {
          iconName = `briefcase${focused ? '' : '-outline'}`;
          // Sometimes we want to add badges to some icons.
          // You can check the implementation below.
          // IconComponent = HomeIconWithBadge;
        } else if (routeName === 'Search') {
          iconName = `briefcase-search${focused ? '' : '-outline'}`;
        } else if(routeName === 'Loss'){
          iconName = `briefcase-plus${focused ? '' : '-outline'}`;
        }

        // You can return any component that you like here!
        return <IconComponent name={iconName} size={25} color={tintColor} />;
      }
    }),
    tabBarOptions: {
      activeTintColor: Colors.blue,
      inactiveTintColor: 'gray',
    },
  });

const AuthStack = createStackNavigator(
  { SignIn: LoginScreen, Register: RegisterScreen },
  { headerMode: 'none' }
);

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      AppMain: TabNavigator,
      Auth: AuthStack
    },
    {
      initialRouteName: 'AuthLoading'
    }
  )
);
