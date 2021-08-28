import { createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
    startLoading: null,
    stopLoading: null,

    startLoaderOne: null,
    stopLoaderOne: null,

    updateCartValue: null,
});

export const Constants = Types;
export default Creators;