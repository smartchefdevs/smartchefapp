/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import { View } from 'react-native';
// router
import Router from 'smartchef/src/router';

const styles = {
  appView: { flex: 1 }
}
const App = () => {
  return (
    <View style={styles.appView}>
      <Router />
    </View>
  );
};

export default App;
