import { createReducer } from "reduxsauce";
import { Constants } from "../Actions";

const INITIAL_STATE = {
  trainerList: null,
  get_trnr_success: false,
  get_trnr_failure: false,
  get_trnr_err_msg: null,
  pages: null,

  tr_Cat_List: null,
  get_cat_success: false,
  get_cat_failure: false,
  get_cat_err_msg: null,

  searchSuccess: false,
  searchFailure: false,
  search_err_msg: null,

  videosList: null,
  videosListSuccess: false,
  videosListFailure: false,
  videos_err_msg: null,
  total_page: null,

  profileData: null,
  profileSuccess: false,
  profileError: false,
  profile_err_msg: null,

  notification: false,
  notificationList: null,
  getNotif_success: false,
  getNotif_error: false,
  notif_err_msg: null,
};

const trainerListRequest = (state = INITIAL_STATE, action) => {
    return { 
        ...state,
        get_trnr_success: false,
        get_trnr_failure: false,
        get_trnr_err_msg: null,
    };
};

const trainerListSuccess = (state = INITIAL_STATE, action) => {
    return { 
        ...state,
        get_trnr_success: true,
        get_trnr_failure: false,
        trainerList: action.list,
        pages: action.pages,
    };
};

const trainerListFailure = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        get_trnr_success: false,
        get_trnr_failure: true,
        get_trnr_err_msg: action.err_msg,
    };
};

const trainerCat = (state = INITIAL_STATE, action) => {
    return { 
        ...state,
        get_cat_success: false,
        get_cat_failure: false,
        get_cat_err_msg: null,
    };
};

const trainerCatSuccess = (state = INITIAL_STATE, action) => {
    return { 
        ...state,
        get_cat_success: true,
        get_cat_failure: false,
        tr_Cat_List: action.cat_list,
    };
};

const trainerCatFailure = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        get_cat_success: false,
        get_cat_failure: true,
        get_cat_err_msg: action.err_msg,
    };
};

const trainerSearch = (state = INITIAL_STATE, action) => {
    return { 
        ...state,
        searchSuccess: false,
        searchfailure: false,
        search_err_msg: null,
    };
};

const trainerSearchSuccess = (state = INITIAL_STATE, action) => {
    return { 
        ...state,
        searchSuccess: true,
        searchfailure: false,
        trainerList: action.list,
    };
};

const trainerSearchFailure = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        searchSuccess: false,
        searchfailure: true,
        search_err_msg: action.err_msg,
    };
};

const trainerVideos = (state = INITIAL_STATE, action) => {
    return { 
        ...state,
        videosListSuccess: false,
        videosListfailure: false,
        videos_err_msg: null,
    };
};

const trainerVideosSuccess = (state = INITIAL_STATE, action) => {
    return { 
        ...state,
        videosListSuccess: true,
        videosListfailure: false,
        videosList: action.video_list,
        total_page: action.total_page
    };
};

const trainerVideosFailure = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        videosListSuccess: false,
        videosListfailure: true,
        videos_err_msg: action.err_msg,
    };
};

// Trainer Profile
const profileDetails = (state = INITIAL_STATE, action) => {
    return { 
        ...state,
        profileSuccess: false,
        profileError: false,
        err_msg: null,
    };
};

const profileSuccess = (state = INITIAL_STATE, action) => {
    return { 
        ...state,
        profileSuccess: true,
        profileError: false,
        profileData: action.profile,
        // total_page: action.total_page
    };
};

const profileFailure = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        profileSuccess: false,
        profileError: true,
        profile_err_msg: action.err_msg,
    };
};

// Check for new notifications
const checkForNotifications = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        notificationList: null,
        getNotif_success: false,
        getNotif_error: false,
        notif_err_msg: null,
    }
}

const getNotificationSuccess = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        notificationList: action.notifi_List,
        getNotif_success: true,
    }
}

const getNotificationError = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        getNotif_error: true,
        notif_err_msg: action.err_msg
    }
}

const followReqNotification = (state = INITIAL_STATE, action) => {
    const listOfNotif = action.details.notificationList;
    return {
        ...state,
        notification: action.status,
        notificationList: listOfNotif,
    }
}

const resetNotification = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        notification: false,
        notificationList: null,
    }
}

const HANDLERS = {
    [Constants.TRAINER_LIST]: trainerListRequest,
    [Constants.TRAINER_LIST_SUCCESS]: trainerListSuccess,
    [Constants.TRAINER_LIST_FAILURE]: trainerListFailure,

    [Constants.TRAINER_CAT]: trainerCat,
    [Constants.TRAINER_CAT_SUCCESS]: trainerCatSuccess,
    [Constants.TRAINER_CAT_FAILURE]: trainerCatFailure,

    [Constants.TRAINER_SEARCH]: trainerSearch,
    [Constants.TRAINER_SEARCH_SUCCESS]: trainerSearchSuccess,
    [Constants.TRAINER_SEARCH_FAILURE]: trainerSearchFailure,

    [Constants.TRAINER_VIDEOS]: trainerVideos,
    [Constants.TRAINER_VIDEOS_SUCCESS]: trainerVideosSuccess,
    [Constants.TRAINER_VIDEOS_FAILURE]: trainerVideosFailure,

    [Constants.PROFILE_DETAILS]: profileDetails,
    [Constants.PROFILE_SUCCESS]: profileSuccess,
    [Constants.PROFILE_FAILURE]: profileFailure,

    [Constants.CHECK_FOR_NOTIFICATIONS]: checkForNotifications,
    [Constants.GET_NOTIFICATION_SUCCESS]: getNotificationSuccess,
    [Constants.GET_NOTIFICATION_ERROR]: getNotificationError,

    [Constants.FOLLOW_REQ_NOTIFICATION]: followReqNotification,
    [Constants.RESET_NOTIFICATION]: resetNotification,
  };
  
  export default createReducer(INITIAL_STATE, HANDLERS);