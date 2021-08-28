import { createReducer } from "reduxsauce";
import { Constants } from "../Actions";

const INITIAL_STATE = {
    listArr: null,
    list_error: false,
    list_err_msg: null,
    list_success: false,
};

const getOrdersList = (state = INITIAL_STATE, action) => {
    return{
        ...state,
        list_error: false,
        list_err_msg: null,
        list_success: false,
    }
}

const orderListSuccess = (state = INITIAL_STATE, action) => {
    return{
        ...state,
        list_error: false,
        list_success: true,
        listArr: action.order_list,
    }
}

const orderListFailure = (state = INITIAL_STATE, action) => {
    return{
        ...state,
        list_error: true,
        list_success: false,
        list_err_msg: action.err_msg,
    }
}

const HANDLERS = {
    [Constants.GET_ORDERS_LIST]             : getOrdersList,
    [Constants.ORDER_LIST_SUCCESS]         : orderListSuccess,
    [Constants.ORDER_LIST_FAILURE]         : orderListFailure,
};

export default createReducer(INITIAL_STATE, HANDLERS);