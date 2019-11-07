import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { persistStore, persistReducer, createTransform } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import immutablePersistenceTransform from '../common/immutable_persistence_transform'
// import createMetrics from 'redux-metrics'
// import AnalyticsManager from '../utils/analytics_manager';

export default (rootReducer, rootSaga) => {
  const middleware = []
  const enhancers = []

  // Mixpanel.track('Q pasa larry')

  const persistConfig = {
    whitelist: ['appPersist'],
    key: 'root',
    storage,
    transforms: [immutablePersistenceTransform]
  }


  //   const metrics = createMetrics({
  //     blacklistActions: [
  //       'persist/REHYDRATE',
  //       'persist/PERSIST'
  //     ],
  //     blacklistKeys: ['auth_token'],
  //     identifyAction: 'SESSION_SUCCESS',
  //     identifySchemaID: '',
  //     trackingLib: AnalyticsManager
  //   })
  //   middleware.push(metrics)

  /* ------------- Saga Middleware ------------- */
  // const sagaMonitor = process.env.NODE_ENV === 'development'
  //   ? console.tron.createSagaMonitor()
  //   : null
  const sagaMiddleware = createSagaMiddleware()
  middleware.push(sagaMiddleware)

  /* ------------- Assemble Middlewares ------------- */
  enhancers.push(applyMiddleware(...middleware))
  if (__DEV__) {
    enhancers.push(console.tron.createEnhancer())
  }
  const persistedReducer = persistReducer(persistConfig, rootReducer)
  // const store = createAppropriateStore(persistedReducer, compose(...enhancers))
  const store = createStore(persistedReducer, compose(...enhancers))
  const persistor = persistStore(store)
  sagaMiddleware.run(rootSaga)

  return { store, persistor }
}
