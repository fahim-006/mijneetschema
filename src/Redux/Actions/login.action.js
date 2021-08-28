import { createActions } from 'reduxsauce';

const { Types, Creators } = createActions(
  {
    loginRequest: ['data'],
    loginSuccess: ['token', 'user'],
    loginFailure: ['error'],
    subscriptionError: ['error'],

    // trainerLogin: ['data'],
    // trainerLoginSuccess: ['token', 'user'],
    // trainerLoginFailure: ['error']
  }
);

export const Constants = Types;
export default Creators;