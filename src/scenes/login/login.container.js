import React from 'react';
import { connect } from 'react-redux';
import { StatusBar, Keyboard } from 'react-native';
// import auth from '@react-native-firebase/auth';

// components
import LoginForm from 'smartchef/src/scenes/login/login.form';
import {
  MainView, BackgroundView, TitleView, WraperLabel, LinkButton, LinksView
} from 'smartchef/src/components/auth';
import Label from 'smartchef/src/components/Label'
import { Colors } from 'smartchef/src/styles/Colors';
// actions
import sessionActions from 'smartchef/src/services/session/session.reducer'

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

  _logIn = async signUp => {
    const { email, password } = signUp;
    const { setLogin } = this.props;
    setLogin({ mail: email, pass: password });
  };
  _goSignIn = () => {
    const { navigation } = this.props;
    navigation.navigate('Register')
  };

  render() {
    const { titleSize, titleHeight, titlePadding } = this.state;
    return (
      <MainView>
        <StatusBar barStyle="default" backgroundColor="#D71655" />
        <BackgroundView colors={['#D71655', '#E83D38', '#E32402', '#e25f54']}>
          <MainView>
            <TitleView titlePadding={titlePadding}>
              <Label
                weight={700}
                size={titleSize}
                lineHeight={titleHeight}
                color={Colors.white}
              >
               Welcome to smartchef
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

const mapStateToProps = state => ({

})

const mapStateToDispatch = dispatch => ({
  setLogin: (values) => dispatch(sessionActions.setAppCredentials(values))
})
export default connect(mapStateToProps, mapStateToDispatch)(loginScreen);
