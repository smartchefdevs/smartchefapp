import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'

export default (rootReducer, rootSaga) => {
  const middleware = [];
  const enhancers = [];

  /* ------------- Saga Middleware ------------- */
  // const sagaMonitor = process.env.NODE_ENV === 'development'
  //   ? console.tron.createSagaMonitor()
  //   : null
  const sagaMiddleware = createSagaMiddleware();
  middleware.push(sagaMiddleware);

  /* ------------- Assemble Middlewares ------------- */
  enhancers.push(applyMiddleware(...middleware));
  // if (__DEV__) {
  //   enhancers.push(console.tron.createEnhancer())
  // }

  const store = createStore(rootReducer, compose(...enhancers));
  sagaMiddleware.run(rootSaga);

  return store;
}
