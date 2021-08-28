import React from "react";
import { put } from 'redux-saga/effects';
import { Actions } from '../src/Redux/Actions';
import store from './store';
import io from "socket.io-client";

const SOCKET_URL = "http://www.mijneetschema.nl:4333";
let ACCESS_TOKEN = "";
if (localStorage.getItem("user_details")) {
  ACCESS_TOKEN = JSON.parse(localStorage.getItem("user_details")).token;
}

export const socket = io(SOCKET_URL, {
  query: {
    token: `barier ${ACCESS_TOKEN}`,
  },
});

export const sendChatReq= () =>{
  console.log("sendChatReq invokec")
  socket.emit(
    "send-contact-request",
    {
      receiverId: "5f47958b3723155618abba5c",
      content: "test Latest",
      token:ACCESS_TOKEN
    },
    (err, res) => {
      console.log("aashish---->", err, res);
    }
  );
}

export const initializeSocketList=()=>{
  socket.on("new-notification", (data) => {
    console.log("new notification data============>.", data);
    const notificationArr = data.notidata2.data;
    const status = data.notidata2.status === 200 ? true : false;
    store.dispatch(Actions.followReqNotification(notificationArr, status));
  });
}

export const respondToRequest= (tr_response) =>{
  console.log("respondToRequest invokec", tr_response);
  socket.emit(
    "updateNotificationStatus",
    tr_response,
    (err, res) => {
      console.log("aashish---->", err, res);
    }
  );
}
