import { combineReducers } from 'redux';
// import { reducer as formReducer } from 'redux-form'
import { i18nReducer } from 'redux-react-native-i18n';

import configureStore from 'smartchef/src/store/store';
import rootSaga from 'smartchef/src/sagas';
import { reducer as appReducer } from 'smartchef/src/services/app/app.persist.reducer';

export default () => {
  const rootReducer = combineReducers({
    appPersist: appReducer,
    i18n: i18nReducer
  });

  return configureStore(rootReducer, rootSaga);
};
