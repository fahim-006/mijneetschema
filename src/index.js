import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import Routes from "./Routes";
import * as serviceWorker from "./serviceWorker";
// import { createStore, applyMiddleware, compose } from "redux";
// import logger from "redux-logger";
// import createSagaMiddleware from "redux-saga";
// import rootReducer from "./Redux/Reducers";
// import rootSaga from "./Redux/Saga";
import store from './store';
import * as SocketFun from './socket'
//import 'bootstrap/dist/css/bootstrap.min.css'

// let data = SocketFun.sendChatReq()
let data2 = SocketFun.initializeSocketList()
// impor t io from "socket.io-client";

// const SOCKET_URL = "http://13.59.30.160:4333";
// let ACCESS_TOKEN = "";
// if (localStorage.getItem("user_details")) {
//   ACCESS_TOKEN = JSON.parse(localStorage.getItem("user_details")).token;
// }

// const socket = io(SOCKET_URL, {
//   query: {
//     token: `barier ${ACCESS_TOKEN}`,
//   },
// });

// socket.emit(
//   "send-contact-request",
//   {
//     receiverId: "5f47958b3723155618abba5c",
//     content: "test 111",
//     token:ACCESS_TOKEN
//   },
//   (err, res) => {
//     console.log("aashish---->", err, res);
//   }
// );

// socket.on("new-notification", (data) => {
//   console.log("new notification data============>.", data);
// });

// const sagaMiddleware = createSagaMiddleware();
// const store = createStore(
//   rootReducer,
//   compose(applyMiddleware(sagaMiddleware, logger))
// );
// sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <div>
      <BrowserRouter>
        <Routes history={BrowserRouter} />
      </BrowserRouter>
    </div>
  </Provider>,
  document.getElementById("root")
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
