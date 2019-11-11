import {combineReducers} from 'redux';
// import { reducer as formReducer } from 'redux-form'
import {i18nReducer} from 'redux-react-native-i18n';

import configureStore from 'smartchef/src/store/store';
import rootSaga from 'smartchef/src/sagas';
import {reducer as appReducer} from 'smartchef/src/services/app/app.persist.reducer';
import {reducer as chefReducer} from 'smartchef/src/services/chefs/chefs.reducers';
import {reducer as categoyReducer} from 'smartchef/src/services/category/category.reducers';

export default () => {
  const rootReducer = combineReducers({
    appPersist: appReducer,
    i18n: i18nReducer,
    chefs: chefReducer,
    categories: categoyReducer,
  });

  return configureStore(rootReducer, rootSaga);
};
