import { createActions } from 'reduxsauce';

const { Types, Creators } = createActions(
  {
    applyCoupan: ['coupon'],
    applyCoupanSuccess: ['discount'],
    applyCoupanFailure: ['error_msg']
  }
);

export const Constants = Types;
export default Creators;