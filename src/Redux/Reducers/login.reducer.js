import { createReducer } from 'reduxsauce'
import { Constants } from '../Actions'

const INITIAL_STATE = {
    success: false,
    token: null,
    error: false,
    message: null,
    user: null,
    isSubscribed: null,
    subscriptionError: null,

    trnrSuccess: false,
    trnrError: false,
    trnrErrMsg: null,
    trainer: null
}

const success = (state = INITIAL_STATE, action) => {
    return { ...state, success: true, token: action.token, user: action.user }
}

const error = (state = INITIAL_STATE, action) => {
    return { ...state, error: true, message: action.error }
}

const request = (state = INITIAL_STATE, action) => {
    return {...state, success: false, error: false, message: null}
}

const subscriptionError = (state = INITIAL_STATE, action) => {
    return {...state, message: action.error, isSubscribed: false, subscriptionError: true }
}

// const trainerLogin = (state = INITIAL_STATE, action) => {
//     return {...INITIAL_STATE}
// }

// const trainerLoginSuccess = (state = INITIAL_STATE, action) => {
//     return { ...state, success: true, token: action.token, user: action.user }
// }

// const trainerLoginFailure = (state = INITIAL_STATE, action) => {
//     return { ...state, error: true, message: action.error }
// }


const HANDLERS = {
    [ Constants.LOGIN_SUCCESS ]         : success,
    [ Constants.LOGIN_FAILURE ]         : error,
    [ Constants.LOGIN_REQUEST ]         : request,
    [ Constants.SUBSCRIPTION_ERROR]     : subscriptionError,
    // [ Constants.LOGIN_REQUEST ]    : trainerLogin,
    // [ Constants.LOGIN_SUCCESS ]    : trainerLoginSuccess,
    // [ Constants.LOGIN_FAILURE ]    : trainerLoginFailure
}

export default createReducer(INITIAL_STATE, HANDLERS)