import { createActions } from 'reduxsauce';

const { Types, Creators } = createActions(
  {
    trainerRegisterRequest: ['data'],
    trainerRegisterSuccess: ['payload'],
    trainerRegisterFailure: ['error'],
    trainerVideoRequest: ['data'],
    trainerVideoSuccess: ['payload'],
    trainerVideoFailure: ['error'],
    listVideoRequest: ['data'],
    listVideoSuccess: ['videos'],
    listVideoFailure: ['error'],

    userRegisterRequest: ['data'],
    userRegisterSuccess: ['payload'],
    userRegisterFailure: ['error'],
  }
);

export const Constants = Types;
export default Creators;