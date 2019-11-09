import {
  put, call, select, all, takeLatest
} from 'redux-saga/effects';

import Utils from 'smartchef/src/sagas/utils.sagas';
/** TYPES and Actions */
import RoutesActions from 'smartchef/src/navigation/routes.reducer';
import { AppTypes } from 'smartchef/src/services/app/app.persist.reducer';
import SessionActions, { SessionTypes } from 'smartchef/src/services/session/session.reducer';

// import AnalyticsManager from '../utils/analytics_manager';

// export function* setErrorMessage() {
//   yield put(SessionActions.setErrorMessage(''))
// }

export function* saveOneSignalToken(api, action) {
  if (action.isLoggedIn) {
    const authorization = yield select(Utils.getAuthToken)
    const token = yield select(Utils.getNotificationsToken)
    yield call(api.token, authorization, token)
  }
}

export function* getProfile(api, action) {
  const authorization = yield select(Utils.getAuthToken)
  const response = yield call(api.getUserProfile, action.user_id, authorization)
  switch (response.status) {
    case 200:
      yield put(SessionActions.setProfile(response.data.data))
      break
    case 400:
    case 403:
    case 404:
    case 422:
      break
    case 401:
    default:
      console.tron.log(response)
      break
  }
}


function* ActionWatcher(api) {
  yield takeLatest(AppTypes.SET_IS_LOGGED_IN, saveOneSignalToken, api)
  yield takeLatest(SessionTypes.GET_PROFILE, getProfile, api)
}

export default function* rootSaga(api) {
  yield all([
    ActionWatcher(api)
  ]);
}
