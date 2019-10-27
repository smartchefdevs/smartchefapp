import React from 'react'
import { StatusBar, Keyboard } from 'react-native'
import auth from '@react-native-firebase/auth';

// components
import LoginForm from 'amissa/src/scenes/login/login.form'
import {
  MainView, BackgroundView, TitleView, WraperLabel, LinkButton, LinksView
} from 'amissa/src/components/auth';
import Label from 'amissa/src/components/Label'
import { Colors } from 'amissa/src/styles/Colors';

class loginScreen extends React.PureComponent {
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
    this._goSignIn = this._goSignIn.bind();
    this._logIn = this._logIn.bind();
    this._keyboardDidShow = this._keyboardDidShow.bind();
    this._keyboardDidHide = this._keyboardDidHide.bind();
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

  _keyboardDidShow = () => {
    this.setState({
      titleSize: '22px',
      titleHeight: 24,
      titlePadding: true
    });
  };

  _keyboardDidHide = () => {
    this.setState({
      titleSize: '42px',
      titleHeight: 46,
      titlePadding: false
    });
  };

  _logIn = signUp => {
    const { email, password } = signUp;
    const { navigation } = this.props;
    try {
      auth()
        .signInWithEmailAndPassword(email, password)
        .then(user => {
          navigation.navigate('Home')
          console.log('signIn', user)
        })
        .catch(error => console.error(error));
    } catch (e) {
      console.error(e.message);
    }
  };
  _goSignIn = () => {
    const { navigation } = this.props;
    navigation.navigate('Register')
  };

  render() {
    const { titleSize, titleHeight, titlePadding } = this.state;
    return (
      <MainView>
        <StatusBar barStyle="default" backgroundColor="#3716d1" />
        <BackgroundView colors={['#3716d1', '#29128a', '#370551', '#120965']}>
          <MainView>
            <TitleView titlePadding={titlePadding}>
              <Label
                weight={700}
                size={titleSize}
                lineHeight={titleHeight}
                color={Colors.white}
              >
                Welcome {'      '}Back!
              </Label>
            </TitleView>
            <LoginForm onSubmit={this._logIn} />
            <LinksView>
              <LinkButton onPress={this._goSignIn}>
                <WraperLabel weight={410} color={Colors.white}>
                  Register
                </WraperLabel>
              </LinkButton>
              <LinkButton>
                <WraperLabel weight={410} color={Colors.white}>
                  Forgot Password
                </WraperLabel>
              </LinkButton>
            </LinksView>
          </MainView>
        </BackgroundView>
      </MainView>
    );
  }
}

export default loginScreen;
