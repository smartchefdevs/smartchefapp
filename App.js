/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import { i18nActions } from 'redux-react-native-i18n';
import { PersistGate } from 'redux-persist/integration/react';
// Internationalization
// import { i18n, defaultLocale } from 'pads/app/lang'
// router
import initStore from 'smartchef/src/store';
import Router from 'smartchef/src/router';

// store.dispatch(i18nActions.setLanguages(i18n.languages))
// store.dispatch(i18nActions.setDictionaries(i18n.dictionaries))
// store.dispatch(i18nActions.setCurrentLanguage(defaultLocale))
const styles = {
  appView: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
};
const store = initStore();

const App = () => {
  return (
    <View style={styles.appView}>
      <Provider store={store}>
        <Router />
      </Provider>
    </View>
  );
};

export default App;
