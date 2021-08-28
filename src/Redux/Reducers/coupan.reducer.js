import { createReducer } from 'reduxsauce';
import { Constants } from '../Actions';

const COUPAN_STATE = {
    apply_success: false,
    apply_error: false,
    apply_err_msg: null,
    discount: null,
};

// Coupan states 
const applyCoupan = (state = COUPAN_STATE, action) => {
    return { ...state, apply_success: false, apply_error: false, apply_err_msg: null };
};

const applyCoupanSuccess = (state = COUPAN_STATE, action) => {
    return { ...state, apply_success: true, discount: action.discount };
};

const applyCoupanFailure = (state = COUPAN_STATE, action) => {
    return { ...state, apply_error: true, apply_err_msg: action.error_msg };
};

const HANDLERS = {
    [Constants.APPLY_COUPAN]            : applyCoupan,
    [Constants.APPLY_COUPAN_SUCCESS]    : applyCoupanSuccess,
    [Constants.APPLY_COUPAN_FAILURE]    : applyCoupanFailure,
};

export default createReducer(COUPAN_STATE, HANDLERS);
