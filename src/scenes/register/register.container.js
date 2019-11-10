import React from 'react';
import { StatusBar, Keyboard } from 'react-native';
import { GoogleSignin, statusCodes } from 'react-native-google-signin';
import {connect} from 'react-redux';

// components
import RegisterForm from 'smartchef/src/scenes/register/register.form';
import {
  MainView, BackgroundView, TitleView, WraperLabel, LinkButton, LinksView
} from 'smartchef/src/components/auth';
import { loginWithFacebook } from 'smartchef/src/common/firebase.auth'

import Label from 'smartchef/src/components/Label';
import { Colors } from 'smartchef/src/styles/Colors';

//actions
import sessionActions from 'smartchef/src/services/session/session.reducer'

class registerScreen extends React.PureComponent {
  static navigationOptions = {
    headerMode: 'none'
  };
  constructor(props) {
    super(props);
    this.state = {
      titleSize: '42px',
      titleHeight: 46,
      titlePadding: false
    };
    this._keyboardDidShow = this._keyboardDidShow.bind();
    this._keyboardDidHide = this._keyboardDidHide.bind();
    this._bootstrap();
  }

  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this._keyboardDidShow,
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this._keyboardDidHide,
    );
  }
  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }
  _bootstrap = async () => {
    await GoogleSignin.configure({
      scopes: [],
      webClientId: '4335751593-e5pcca1uoh4c4galgk0u13v8o3u24659.apps.googleusercontent.com', // required
    });
  };
  _registerwithGoogle = async () => {
    const { navigation } = this.props;
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      // const user = await auth().signInWithCredential(credential);
      navigation.navigate("Home")
      console.log("el user", user, credential);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
      console.tron.log("error",error)
    }
  };
  _keyboardDidShow = () => {
    this.setState({
      titleSize: '22px',
      titleHeight: 22,
      titlePadding: true
    });
  };

  _keyboardDidHide = () => {
    this.setState({
      titleSize: '42px',
      titleHeight: 43,
      titlePadding: false
    });
  };

  _signIn = async signUp => {
    const {registerUser} = this.props;
    registerUser(signUp);
  };

  _registerWithFb = () => {
    const { navigation } = this.props;
    try {
      loginWithFacebook()
        .then(({user,resutl}) => {
          console.log("fbUser", user, resutl)
          navigation.navigate("Home")
        })
        .catch(err => console.log("err fb", err));
    } catch (error) {
      console.log('el error FbLoggin', error)
    }
  };
  _navigateToLogIn = () => {
    const { navigation } = this.props;
    navigation.navigate('SignIn')
  };
  render() {
    const { titleSize, titleHeight, titlePadding } = this.state;
    return (
      <MainView>
        <StatusBar barStyle="default" backgroundColor="#D71655" />
        <BackgroundView
          keyboardShow={titlePadding}
          colors={['#D71655', '#E83D38', '#E32402', '#e25f54']}
        >
          <MainView>
            <TitleView titlePadding={titlePadding}>
              <Label
                weight={700}
                size={titleSize}
                lineHeight={titleHeight}
                color={Colors.white}
              >
                Create Account
              </Label>
            </TitleView>
            <RegisterForm onSubmit={this._signIn} />
            <LinksView>
              <Label weight={400} color={Colors.white}>
                Or register with
              </Label>
              <LinkButton onPress={this._registerWithFb}>
                <WraperLabel weight={410} color={Colors.white}>
                  FB
                </WraperLabel>
              </LinkButton>
              <LinkButton onPress={this._registerwithGoogle}>
                <WraperLabel weight={410} color={Colors.white}>
                  GO
                </WraperLabel>
              </LinkButton>
            </LinksView>
            <LinksView keyboardShow={titlePadding}>
              <LinkButton onPress={this._navigateToLogIn}>
                <WraperLabel weight={410} color={Colors.white}>
                  Log in
                </WraperLabel>
              </LinkButton>
              <LinkButton>
                <WraperLabel weight={410} color={Colors.white}>
                  Terms of Conditions
                </WraperLabel>
              </LinkButton>
            </LinksView>
          </MainView>
        </BackgroundView>
      </MainView>
    );
  }
}

const mapStateToProps = state => ({
});

const mapStateToDispatch = dispatch => ({
  registerUser: values => dispatch(sessionActions.register(values)),
});

export default connect(
  mapStateToProps,
  mapStateToDispatch,
)(registerScreen);
