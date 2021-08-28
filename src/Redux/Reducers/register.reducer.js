import { createReducer } from 'reduxsauce';
import { Constants } from '../Actions';

const INITIAL_STATE = {
    success: false,
    error: false,
    message: null,
};

const USER_STATE = {
    isRegister: false,
    registerErr: false,
    registerMsg: null,
    errMessage: null,
};

const trainerRegisterRequest = (state = INITIAL_STATE, action) => {
    return { ...INITIAL_STATE };
};

const trainerRegisterSuccess = (state = INITIAL_STATE, action) => {
    return { ...state, success: true, message: action.payload };
};

const trainerRegisterError = (state = INITIAL_STATE, action) => {
    return { ...state, error: true, message: action.error };
};

const trainerVideoRequest = (state = INITIAL_STATE, action) => {
    return { ...INITIAL_STATE };
};

const trainerVideoSuccess = (state = INITIAL_STATE, action) => {
    return { ...state, videoSuccess: true, message: action.payload };
};

const trainerVideoError = (state = INITIAL_STATE, action) => {
    return { ...state, videoError: true, message: action.error };
};

const listVideoRequest = (state = INITIAL_STATE, action) => {
    return { ...INITIAL_STATE };
};

const listVideoSuccess = (state = INITIAL_STATE, action) => {
    return { ...state, videoListSuccess: true, videos: action.videos.data };
};

const listVideoError = (state = INITIAL_STATE, action) => {
    return { ...state, error: true, message: action.error };
} ;

const userRegisterRequest = (state = USER_STATE, action) => {
    return { ...state };
};

const userRegisterSuccess = (state = USER_STATE, action) => {
    return { ...state, isRegister: true, registerMsg: action.payload };
};

const userRegisterFailure = (state = USER_STATE, action) => {
    return { ...state, registerErr: true, errMessage: action.error };
};

const HANDLERS = {
    [Constants.TRAINER_REGISTER_REQUEST]: trainerRegisterRequest,
    [Constants.TRAINER_REGISTER_SUCCESS]: trainerRegisterSuccess,
    [Constants.TRAINER_REGISTER_FAILURE]: trainerRegisterError,
    [Constants.TRAINER_VIDEO_REQUEST]: trainerVideoRequest,
    [Constants.TRAINER_VIDEO_SUCCESS]: trainerVideoSuccess,
    [Constants.TRAINER_VIDEO_FAILURE]: trainerVideoError,
    [Constants.LIST_VIDEO_REQUEST]: listVideoRequest,
    [Constants.LIST_VIDEO_SUCCESS]: listVideoSuccess,
    [Constants.LIST_VIDEO_FAILURE]: listVideoError,

    [Constants.USER_REGISTER_REQUEST]: userRegisterRequest,
    [Constants.USER_REGISTER_SUCCESS]: userRegisterSuccess,
    [Constants.USER_REGISTER_FAILURE]: userRegisterFailure
};

export default createReducer(INITIAL_STATE, HANDLERS);