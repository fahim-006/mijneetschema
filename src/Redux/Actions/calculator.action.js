import { createActions } from 'reduxsauce';

const { Types, Creators } = createActions(
  {
    calculatorRequest: ['details'],
    calculatorSuccess: ['data'],
    calculatorFailure: ['error'],

    getCalculations: null,
    getCalculationsSuccess: ['data'],
    getCalculationsFailure: ['err_msg'],

    reCalculateDiet: null,
    setReCalculateDiet: null,
  }
);

export const Constants = Types;
export default Creators;