import LoginCreators, { Constants as LoginConstants } from './login.action'
import RegisterCreators, { Constants as RegisterConstants } from './register.action'
import CalculatorCreators, { Constants as CalculatorConstants } from './calculator.action'
import ProductsCreators, { Constants as ProductsConstants } from './products.action'
import LoaderCreators, { Constants as LoaderConstants } from './loader.action'
import SubscriptionCreators, { Constants as SubscriptionConstants } from './subscription.action'
import CoupanCreators, { Constants as CoupanConstants } from './coupan.action'
import TrainerCreators, { Constants as TrainerConstants } from './trainer.action'
import UserDashCreators, { Constants as UserDashConstants } from './user_dash.action'



export const Constants = {
    ...LoginConstants,
    ...RegisterConstants,
    ...CalculatorConstants,
    ...ProductsConstants,
    ...LoaderConstants,
    ...SubscriptionConstants,
    ...CoupanConstants,
    ...TrainerConstants,
    ...UserDashConstants,
};

export const Actions = {
    ...LoginCreators,
    ...RegisterCreators,
    ...CalculatorCreators,
    ...ProductsCreators,
    ...LoaderCreators,
    ...SubscriptionCreators,
    ...CoupanCreators,
    ...TrainerCreators,
    ...UserDashCreators,
}