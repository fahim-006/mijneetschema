import { createReducer } from "reduxsauce";
import { Constants } from "../Actions";

const INITIAL_STATE = {
  loading: false,
  loaderOne: false,

  itemsInCart: null,
};

const start = (state = INITIAL_STATE, action) => {
  return { loading: true };
};

const stop = (state = INITIAL_STATE, action) => {
  return { loading: false };
};

const startLoaderOne = (state = INITIAL_STATE, action) => {
  return { loaderOne: true };
};

const stopLoaderOne = (state = INITIAL_STATE, action) => {
  return { loaderOne: false };
};

const updateCartValue = (state = INITIAL_STATE, action) => {
  // localStorage.getItem()localStorage.getItem();
  let num_of_items = null;
  if(localStorage.getItem('items_in_cart')){
    num_of_items = JSON.parse(localStorage.getItem('items_in_cart'));
    let totalItems = num_of_items.reduce((count, item) => parseInt(count + item.quantity), 0);
    return {...state, itemsInCart: totalItems};
  }else{
    return {...state, itemsInCart: num_of_items};
  }
}

const HANDLERS = {
  [Constants.START_LOADING]: start,
  [Constants.STOP_LOADING]: stop,
  [Constants.START_LOADER_ONE]: startLoaderOne,
  [Constants.STOP_LOADER_ONE]: stopLoaderOne,

  [Constants.UPDATE_CART_VALUE]: updateCartValue,
};

export default createReducer(INITIAL_STATE, HANDLERS);
