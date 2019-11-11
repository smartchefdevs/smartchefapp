import React from "react";
import { View, Text, Button, ActivityIndicator, StatusBar } from "react-native";
import MdIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createAppContainer, createSwitchNavigator} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import AsyncStorage from '@react-native-community/async-storage';

// screen
import LoginScreen from 'smartchef/src/scenes/login/login.container';
import RegisterScreen from 'smartchef/src/scenes/register/register.container';
import MainScreen from 'smartchef/src/components/MainScreen';
// import ChatScreen from 'smartchef/src//components/ChatScreen';
import DetailScreen from 'smartchef/src/components/DetailScreen';
// import HomeScreen from 'smartchef/src/scenes/home/home.container';
// import PublishScreen from 'smartchef/src/scenes/publish/publish.container';
// import AccountScreen from 'smartchef/src/scenes/account/account.screen';
// utils
import { Colors } from 'smartchef/src/styles/Colors';

class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('@smartchefUser');

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
    Home: MainScreen,
    Search: defaultScreen,
    Account: defaultScreen,
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
        } else if (routeName === 'Loss') {
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
  {
    SignIn: LoginScreen,
    Register: RegisterScreen,
  },
  { headerMode: 'none' }
);

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      AppMain: TabNavigator,
      Auth: AuthStack,
      Detail: DetailScreen,
    },
    {
      initialRouteName: 'AuthLoading'
    }
  )
);
