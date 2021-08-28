import { createReducer } from 'reduxsauce'
import { Constants } from '../Actions'

const INITIAL_STATE = {
    success: false,
    token: null,
    error: false,
    message: null,
    user: null,
    calc_data: null,
    get_calc_success: false,
    get_calc_error: false,
    get_calc_err_msg: null,

    reCalculateState: false,
}

// Save user calculation details
const calculatorRequest = (state = INITIAL_STATE, action) => {
    return { ...INITIAL_STATE, success: false, error: false, message: null }
}

const calculatorSuccess = (state = INITIAL_STATE, action) => {
    return { ...state, success: true, message: action.data }
}

const calculatorFailure = (state = INITIAL_STATE, action) => {
    return { ...state, error: true, message: action.error }
}

// Get user Calculation details
const getCalculations = (state = INITIAL_STATE, action) => {
    return {...INITIAL_STATE}
}

const getCalculationsSuccess = (state = INITIAL_STATE, action) => {
    return { 
        ...state,
        get_calc_success: true,
        get_calc_error: false,
        calc_data: action.data
    }
}

const getCalculationsFailure = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        get_calc_error: true,
        get_calc_success: false,
        get_calc_err_msg: action.err_msg
    }
}

const reCalculateDiet = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        reCalculateState: true,
    }
}

const setReCalculateDiet = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        reCalculateState: false,
    }
}

const HANDLERS = {
    [ Constants.CALCULATOR_REQUEST ]            : calculatorRequest,
    [ Constants.CALCULATOR_SUCCESS ]            : calculatorSuccess,
    [ Constants.CALCULATOR_FAILURE ]            : calculatorFailure,

    [Constants.GET_CALCULATIONS]                : getCalculations,
    [Constants.GET_CALCULATIONS_SUCCESS]        : getCalculationsSuccess,
    [Constants.GET_CALCULATIONS_FAILURE]        : getCalculationsFailure,

    [Constants.RE_CALCULATE_DIET]               : reCalculateDiet,
    [Constants.SET_RE_CALCULATE_DIET]           : setReCalculateDiet,
}

export default createReducer(INITIAL_STATE, HANDLERS)