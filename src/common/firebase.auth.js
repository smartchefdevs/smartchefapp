import { LoginManager, AccessToken } from 'react-native-fbsdk';

// Login with permissions
export const loginWithFacebook = async () => {
  const result = await LoginManager.logInWithPermissions([
    'public_profile',
    'first_name',
    'last_name',
    'middle_name',
    'name',
    'name_format',
    'picture',
    'short_name',
    'email',
  ]);
  if (result.isCancelled) {
    throw new Error('User cancelled the login process');
  }
  const data = await AccessToken.getCurrentAccessToken();
  if (!data) {
    throw new Error('Something went wrong obtaining access token');
  }
  return new Promise(resolve => resolve({user: data, result}));
};
