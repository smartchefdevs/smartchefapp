import {
  put, call, select, all, takeLatest
} from 'redux-saga/effects'

import Utils from 'pads/app/sagas/utils.sagas'
/** TYPES and Actions */
import RoutesActions from 'pads/app/navigation/routes.reducer'
import AppActions, { AppTypes } from 'pads/app/services/app/app.persist.reducer'
import LeadsActions from 'pads/app/services/leads/leads.types'
import SessionActions, { SessionTypes } from 'pads/app/services/login/login.reducer'
import ListingsActions from 'pads/app/services/listings/listings.types';

import { showAlertError } from 'pads/app/components/AlertInfo.comp'

// import AnalyticsManager from '../utils/analytics_manager';
const delay = ms => new Promise(res => setTimeout(res, ms))

export function* setAppStatus(api, action) {
  if (action.credentials.email && action.credentials.password) {
    try {
      const response = yield call(api.login, action.credentials)
      if (response.ok && response.status < 300) {
        yield put(AppActions.setSession(response.data))
        yield put(AppActions.setIsLoggedIn(true))
        yield delay(800)
        yield put(RoutesActions.goTo('tabbar'))
        yield put(LeadsActions.getNewLeads(response.data.access_token))
        yield put(ListingsActions.getAllAreas(response.data.branch_id))
      } else {
        if (response.problem === 'NETWORK_ERROR') {
          showAlertError('login');
        }
        yield put(SessionActions.setErrorMessage(response.data.message))
      }
    } catch (error) {
      // todo sent crash mixpanel
      console.tron.error('error', error)
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
  yield put(RoutesActions.goTo('login'))
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
