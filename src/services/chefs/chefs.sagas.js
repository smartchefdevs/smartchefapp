import {
  put, call, select, all, takeLatest
} from 'redux-saga/effects';
// import Utils from 'smartchef/src/sagas/utils.sagas';
import api_transform from 'smartchef/src/common/api_transform';
/** TYPES and Actions */
import ChefsActions, {
  ChefsTypes,
} from 'smartchef/src/services/chefs/chefs.reducers';

function* getListOfChef(api, action) {
  const {usr_id} = action;
  // const authorization = yield select(Utils.getAuthToken);
  const response = yield call(api.getUsers, usr_id);
  let transform = [];
  if (response.ok && response.status < 300) {
    transform = api_transform.apiToListChef(response.data.msg);
    yield put(ChefsActions.setChefs(transform));
  }
}

function* ActionWatcher(api) {
  yield takeLatest(ChefsTypes.GET_CHEFS, getListOfChef, api);
}

export default function* rootSaga(api) {
  yield all([ActionWatcher(api)]);
}
