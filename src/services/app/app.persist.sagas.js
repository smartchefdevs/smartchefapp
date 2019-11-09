import {
  put, call, select, all, takeLatest
} from 'redux-saga/effects'
import AsyncStorage from '@react-native-community/async-storage';

import Utils from 'smartchef/src/sagas/utils.sagas'
/** TYPES and Actions */
import AppActions, { AppTypes } from 'smartchef/src/services/app/app.persist.reducer';
import SessionActions, { SessionTypes } from 'smartchef/src/services/session/session.reducer';


// import AnalyticsManager from '../utils/analytics_manager';
const delay = ms => new Promise(res => setTimeout(res, ms))

export function* setAppStatus(api, action) {
  console.log("ACTIO LOGIN ", action)
  if (action.credentials.mail && action.credentials.pass) {
    try {
      const response = yield call(api.login, action.credentials)
      if (response.ok && response.status < 300) {
        yield put(AppActions.setSession(response.data))
        yield AsyncStorage.setItem('@smartchefUser', response.data)
        yield put(AppActions.setIsLoggedIn(true))
      } else {
        // if (response.problem === 'NETWORK_ERROR') {
        //   showAlertError('login');
        // }
        yield put(SessionActions.setErrorMessage(response.data.message))
      }
    } catch (error) {
      // todo sent crash mixpanel
      // console.tron.error('error', error)
    }
  } else {
    console.warn('bad credentials') // eslint-disable-line
  }
}

export function* logout(api) {
  const authorization = yield select(Utils.getAuthToken)
  const response = yield call(api.logout, authorization)
  if (response.ok && response.status < 300) {
    // call(AnalyticsManager.reset)
  }
  yield delay(800)
  // yield put(RoutesActions.goTo('login'))
}

function* ActionWatcher(api) {
  yield takeLatest(SessionTypes.SET_APP_CREDENTIALS, setAppStatus, api)
  yield takeLatest(AppTypes.LOGOUT, logout, api)
  // yield takeLatest(SessionTypes.FORGOT_PASSWORD, forgotPassword)
}

export default function* rootSaga(api) {
  yield all([
    ActionWatcher(api)
  ]);
}
