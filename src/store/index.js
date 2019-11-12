import {combineReducers} from 'redux';
// import { reducer as formReducer } from 'redux-form'
import {i18nReducer} from 'redux-react-native-i18n';

import configureStore from 'smartchef/src/store/store';
import rootSaga from 'smartchef/src/sagas';
import {reducer as appReducer} from 'smartchef/src/services/app/app.persist.reducer';
import {reducer as eventsReducer} from 'smartchef/src/services/events/events.reducers';
import {reducer as categoyReducer} from 'smartchef/src/services/category/category.reducers';

export default () => {
  const rootReducer = combineReducers({
    appPersist: appReducer,
    i18n: i18nReducer,
    events: eventsReducer,
    categories: categoyReducer,
  });

  return configureStore(rootReducer, rootSaga);
};
