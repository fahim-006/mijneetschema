import { combineReducers } from 'redux';

import Login from './login.reducer';
import Register from './register.reducer'; 
import Products from './products.reducer';
import Loader from './loader.reducer';
import Subscription from './subscription.reducer';
import Calculator from './calculator.reducer';
import Coupan from './coupan.reducer';
import Trainer from './trainer.reducer';
import UserDash from './user_dash.reducer';

export default combineReducers({
    Login,
    Register,
    Products,
    Loader,
    Subscription,
    Calculator,
    Coupan,
    Trainer,
    UserDash,
});