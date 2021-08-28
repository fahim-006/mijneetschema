import React, { Component } from "react";
import DashboardLayout from "../../../layouts/DashboardLayout";
import { CometChat } from "@cometchat-pro/chat";
import CometChatUnified from "./src/react-chat-ui-kit/CometChat/components/CometChatUnified/index.js";
import CONFIG from "../../../config.json";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Actions } from "../../../Redux/Actions";
import { initializeSocketList, respondToRequest } from "../../../socket";

class chatModule extends Component {
  constructor(props) {
    super(props);
    let userData = JSON.parse(localStorage.getItem("user_details"));
    let appId = CONFIG.COMETCHAT_APPID;
    let region = CONFIG.COMETCHAT_REGION;
    let apiKey = CONFIG.COMETCHAT_APIKEY;

    this.state = {
      userData: userData,
      appID: appId,
      region: region,
      apiKey: apiKey,
      isloggedIn: false,
      isError: false,
      page_no: 1,
      token: '',
      show_notific_menu: false,
    };

    var appSetting = new CometChat.AppSettingsBuilder()
      .subscribePresenceForAllUsers()
      .setRegion(region)
      .build();

    CometChat.init(this.state.appID, appSetting).then(
      () => {
        this.chatSignup();
      },
      (error) => {
        this.setState({ isError: true });
      }
    );
  }

  chatSignup = () => {
    let userData = this.state.userData;
    var uid = userData._id;
    var name = userData.name;

    var user = new CometChat.User(uid);

    user.setName(name);

    CometChat.createUser(user, this.state.apiKey).then(
      (user) => {
        this.commetChatlogin();
      },
      (error) => {
        this.commetChatlogin();
      }
    );
  };
  commetChatlogin = () => {
    var UID = this.state.userData._id;
    var apiKey = this.state.apiKey;

    CometChat.login(UID, apiKey).then(
      (user) => {
        this.setState({
          isloggedIn: true,
          isError: false,
        });
      },
      (error) => {
        this.setState({ isError: true });
      }
    );
  };

  componentDidMount(){
    let data2 = initializeSocketList();
    this.props.checkForNotifications(this.state.page_no);

    if(localStorage.getItem('user_details') !== undefined){
      const token = JSON.parse(localStorage.getItem('user_details')).token;
      this.setState({
        token: token
      });
    }
  }

  // componentDidUpdate(prevProps, prevState){

  // }

  acceptFollowRequest = (event) => {
    const responseData = {
      receiverId: event.sender._id,
      notificationId: event._id,
      notificationStatus: 2,
      token: this.state.token
    }
    respondToRequest(responseData);
    this.initiateChat(responseData);
  }

  rejectFollowRequest = (event) => {
    const responseData = {
      receiverId: event.sender._id,
      notificationId: event._id,
      notificationStatus: 3,
      token: this.state.token
    }
    respondToRequest(responseData);
  }

  initiateChat = (data) => {
    var receiverID = data.receiverId;
    var messageText = "Hi, you can ask your queries...";
    var receiverType = CometChat.RECEIVER_TYPE.USER;
    var textMessage = new CometChat.TextMessage(
      receiverID,
      messageText,
      receiverType
    );

    CometChat.sendMessage(textMessage).then(
      message => {
        console.log("Message sent successfully:", message);
      },
      error => {
        console.log("Message sending failed with error:", error);
      }
    );
  }

  handleDropDown = () => {
    this.setState({
      show_notific_menu: !this.state.show_notific_menu
    })
  }
  render() {
    const { isError, isloggedIn, show_notific_menu } = this.state;
    const { notification, notificationList } = this.props;
    return (
      <DashboardLayout>
        {/* <div className="trnr_nav_cntnt">
          {isloggedIn == true ? (
            <CometChatUnified />
          ) : isError == true ? (
            <div>Something Went wrong! Try again later.</div>
          ) : (
            <></>
          )}
        </div> */}

        {/**
         * Chat screen start
        */}

        <div className="trnr_nav_cntnt">
          <div className="adprdct_nav_iner">
            <div className=" chat_screen_head d-flex justify-content-between align-items-center">
              <h2>Trainer Chat</h2>
              <div className="notification_chat">
                  <div className="dropdown show">
                      <button
                        className="btn btn-secondary"
                        type="button"
                        onClick={this.handleDropDown}
                      >
                        <i className="fa fa-bell-o" aria-hidden="true"></i>
                        {notificationList && notificationList.length ? 
                          <span className="not__count"> {notificationList.length} </span>
                          : 
                          <></>
                        }
                      </button>
                      {this.state.show_notific_menu ? (
                        <div className="dropdown-menu notific-drop-list">
                          {notificationList && notificationList.length ?
                            notificationList.map((note)=>(
                              <div className="dropdown-item d-flex align-items-center" key={note._id}>
                                <div className="dropdown-list-image mr-3">
                                <img className="rounded-circle" src="/images/chat_user1.png" alt=""/>
                                <div className="status-indicator bg-success"></div>
                                </div>
                                <div className="text-wrapper_not">
                                  <div className="text-truncate">
                                    {note.sender.fullname}send follow request.
                                  </div>
                                  <div className="chat_action">
                                    <button className="acpt" onClick={e=> this.acceptFollowRequest(note)}>Accept</button>
                                    <button className="rmv" onClick={e=> this.rejectFollowRequest(note)}>remove</button>
                                  </div>
                                </div>
                              </div>
                              )
                            )
                            :
                            <div className="no_notification">
                              <p>You haven't any notification right now.</p>
                            </div>
                          }

                        </div>
                      ) 
                      : 
                      null
                    }

                    {/* <button
                      type="button" 
                      id="not_drop_1"
                      data-toggle="dropdown"
                      aria-haspopup="true" 
                      aria-expanded="false"
                      className="btn btn-secondary dropdown-toggle"
                      onClick={this.handleDropDown}
                    >
                      <i className="fa fa-bell-o" aria-hidden="true"></i>
                      {notificationList && notificationList.length ? 
                        <span className="not__count"> {notificationList.length} </span>
                        : 
                        <></>
                      }
                    </button>
                    
                    {show_notific_menu ?
                      <div className="dropdown-menu" aria-labelledby="not_drop_1">
                        <a className="dropdown-item d-flex align-items-center" href="#">
                          <div className="dropdown-list-image mr-3">
                          <img className="rounded-circle" src="images/chat_user1.png" alt=""/>
                          <div className="status-indicator bg-success"></div>
                          </div>
                          <div className="text-wrapper_not">
                          <div className="text-truncate">Peterson send chat request</div>
                          <div className="chat_action">
                            <button className="acpt">Accept</button>
                            <button className="rmv">remove</button>
                          </div>
                          </div>
                        </a>
                        
                        <a className="dropdown-item d-flex align-items-center" href="#">
                          <div className="dropdown-list-image mr-3">
                          <img className="rounded-circle" src="images/chat_user1.png" alt=""/>
                          <div className="status-indicator bg-success"></div>
                          </div>
                          <div className="text-wrapper_not">
                          <div className="text-truncate">Enrick send chat request</div>
                          <div className="chat_action">
                            <button className="acpt">Accept</button>
                            <button className="rmv">remove</button>
                          </div>
                          </div>
                        </a>
                      </div>
                      :
                      null
                    } */}
                    
                    {/* <div
                      className={`dropdown-menu ${show_notific_menu ? "show-notification" : ''}`}
                      aria-labelledby="not_drop_1"
                    >
                      {notificationList && notificationList.length ?
                        notificationList.map((note)=>(
                          <div className="dropdown-item d-flex align-items-center" key={note._id}>
                            <div className="dropdown-list-image mr-3">
                            <img className="rounded-circle" src="/images/chat_user1.png" alt=""/>
                            <div className="status-indicator bg-success"></div>
                            </div>
                            <div className="text-wrapper_not">
                              <div className="text-truncate">
                                {note.sender.fullname}send follow request.
                              </div>
                              <div className="chat_action">
                                <button className="acpt" onClick={e=> this.acceptFollowRequest(note)}>Accept</button>
                                <button className="rmv" onClick={e=> this.rejectFollowRequest(note)}>remove</button>
                              </div>
                            </div>
                          </div>
                          )
                         )
                        :
                        <></>
                      }
                    </div> */}
                  </div>
                </div>
            </div>

            {isloggedIn == true ? (
              <CometChatUnified />
            ) : isError == true ? (
              <div>Something Went wrong! Try again later.</div>
            ) : (
              <></>
            )}

          </div>
        </div>
        {/**
         * Chat screen end
        */}
      </DashboardLayout>
    );
  }
}

const mapStateToProps = state => ({
  notificationList: state.Trainer.notificationList,
  getNotif_success: state.Trainer.getNotif_success,
  getNotif_error: state.Trainer.getNotif_error,
  notif_err_msg: state.Trainer.notif_err_msg,

  notification: state.Trainer.notification,
});

const mapActionsToProps = dispatch => bindActionCreators({
  checkForNotifications: Actions.checkForNotifications,
  resetNotification: Actions.resetNotification,
}, dispatch);

export default 
connect(
  mapStateToProps,
  mapActionsToProps
)(chatModule);
