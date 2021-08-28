import { createActions } from 'reduxsauce';

const { Types, Creators } = createActions(
  {
    getSubscription: ['data'],
    getSubscriptionSuccess: ['data'],
    getSubscriptionFailure: ['error'],

    subscriptionComplete: ['data'],
    subscriptionCompleteSuccess: ['data'],
    subscriptionCompleteFailure: ['error'],

    dietPurchase: ['details'],
    dietPurchaseSuccess: ['successData'],
    dietPurchaseFailure: ['error'],
    dietPurchaseComplete: ['details'],
    dietPurchaseCompleteSuccess: ['successData'],
    dietPurchaseCompleteFailure: ['error'],
  }
);

export const Constants = Types;
export default Creators;