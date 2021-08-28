import { createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
    getOrdersList: ['page_no'],
    orderListSuccess: ['order_list'],
    orderListFailure: ['err_msg'],
});

export const Constants = Types;
export default Creators;