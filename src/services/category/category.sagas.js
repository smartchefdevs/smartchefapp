import {
  put, call, select, all, takeLatest
} from 'redux-saga/effects';
// import Utils from 'smartchef/src/sagas/utils.sagas';
import api_transform from 'smartchef/src/common/api_transform';
/** TYPES and Actions */
import CategoriesActions, {CategoryTypes} from 'smartchef/src/services/category/category.reducers';

function* getCategories(api) {
  const response = yield call(api.getCategories);
  let transform = [];
  if (response.ok && response.status < 300) {
    transform = api_transform.apiToCategories(response.data.data);
    yield put(CategoriesActions.setCategories(transform));
  }
}

function* ActionWatcher(api) {
  yield takeLatest(CategoryTypes.GET_CATEGORIES, getCategories, api);
}

export default function* rootSaga(api) {
  yield all([ActionWatcher(api)]);
}
