import {
  put, call, select, all, takeLatest
} from 'redux-saga/effects';
// import Utils from 'smartchef/src/sagas/utils.sagas';
import api_transform from 'smartchef/src/common/api_transform';
/** TYPES and Actions */
import EventsActions, {
  EventsTypes,
} from 'smartchef/src/services/events/events.reducers';

function* getListOfEvents(api, action) {
  const {usr_id} = action;
  // const authorization = yield select(Utils.getAuthToken);
  const response = yield call(api.getEvents, usr_id);
  let transform = [];
  if (response.ok && response.status < 300) {
    transform = api_transform.apiToEvents(response.data.data);
    yield put(EventsActions.setEvents(transform));
  }
}

function* ActionWatcher(api) {
  yield takeLatest(EventsTypes.GET_EVENTS, getListOfEvents, api);
}

export default function* rootSaga(api) {
  yield all([ActionWatcher(api)]);
}
