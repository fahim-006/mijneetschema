import { createStore, applyMiddleware, compose } from "redux";
import logger from "redux-logger";
import createSagaMiddleware from "redux-saga";
import rootReducer from "./Redux/Reducers";
import rootSaga from "./Redux/Saga";


const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  rootReducer,
  compose(applyMiddleware(sagaMiddleware, logger))
);
sagaMiddleware.run(rootSaga);

export default store;