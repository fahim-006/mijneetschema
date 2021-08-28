import { createReducer } from 'reduxsauce'
import { Constants } from '../Actions'

const INITIAL_STATE = {
    success: false,
    token: null,
    error: false,
    message: null,
    data: null,

    checkout_url: null,
    subsSuccess: false,
    subsError: false,
    subsErrMessage: null,

}

const DIET_STATE = {
    purchaseSuccess: null,
    purchaseError: null,
    purchaseErrMsg: null,
    payment_url: null,
    
    pur_comp_success: null,
    pur_comp_error: null,
    paymentData: null,
    pur_comp_err_msg: null,
}

const getSubscription = (state = INITIAL_STATE, action) => {
    return { ...state }
}

const getSubscriptionSuccess = (state = INITIAL_STATE, action) => {
    return { ...state, success: true, checkout_url: action.data }
}

const getSubscriptionFailure = (state = INITIAL_STATE, action) => {
    return { ...state, error: true, message: action.error }
}

// Subscription Complete
const subscriptionComplete = (state = INITIAL_STATE, action) => {
    return { ...state }
}

const subscriptionCompleteSuccess = (state = INITIAL_STATE, action) => {
    return { ...state, subsSuccess: true, data: action.data }
}

const subscriptionCompleteFailure = (state = INITIAL_STATE, action) => {
    return { ...state, subsError: true, subsErrMessage: action.error }
}

// Diet plan purchase
const dietPurchase = (state = DIET_STATE, action) => {
    return { ...state }
}

const dietPurchaseSuccess = (state = DIET_STATE, action) => {
    return { ...state, purchaseSuccess: true, payment_url: action.successData }
}

const dietPurchaseFailure = (state = DIET_STATE, action) => {
    return { ...state, purchaseError: true, purchaseErrMsg: action.error }
}

// Diet plan purchase Complete
const dietPurchaseComplete = (state = DIET_STATE, action) => {
    return { ...state }
}

const dietPurchaseCompleteSuccess = (state = DIET_STATE, action) => {
    return { ...state, pur_comp_success: true, paymentData: action.successData }
}

const dietPurchaseCompleteFailure = (state = DIET_STATE, action) => {
    return { ...state, pur_comp_error: true, pur_comp_err_msg: action.error }
}

const HANDLERS = {
    [Constants.GET_SUBSCRIPTION]                    : getSubscription,
    [Constants.GET_SUBSCRIPTION_SUCCESS]            : getSubscriptionSuccess,
    [Constants.GET_SUBSCRIPTION_FAILURE]            : getSubscriptionFailure,

    [Constants.SUBSCRIPTION_COMPLETE]               : subscriptionComplete,
    [Constants.SUBSCRIPTION_COMPLETE_SUCCESS]       : subscriptionCompleteSuccess,
    [Constants.SUBSCRIPTION_COMPLETE_FAILURE]       : subscriptionCompleteFailure,

    [Constants.DIET_PURCHASE]                       : dietPurchase,
    [Constants.DIET_PURCHASE_SUCCESS]               : dietPurchaseSuccess,
    [Constants.DIET_PURCHASE_FAILURE]               : dietPurchaseFailure,
    [Constants.DIET_PURCHASE_COMPLETE]              : dietPurchaseComplete,
    [Constants.DIET_PURCHASE_COMPLETE_SUCCESS]      : dietPurchaseCompleteSuccess,
    [Constants.DIET_PURCHASE_COMPLETE_FAILURE]      : dietPurchaseCompleteFailure,
}

export default createReducer(INITIAL_STATE, HANDLERS)