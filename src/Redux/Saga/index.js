import { call, put, takeLatest, delay, take } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { Actions } from '../Actions';
import {
    LoginAPI,
    TrainerRegisterAPI,
    AddCategoryAPI,
    ListCategoryAPI,
    ListMealCategoryAPI,
    AddProductAPI,
    ListProductsAPI,
    AddVideoAPI,
    ListVideoAPI,
    UserRegisterAPI,
    GetSubscriptionAPI,
    SubscriptionCompleteAPI,
    CalculatorAPI,
    GetDietPlanAPI,
    DietPurchaseCompleteAPI,
//----*meal
    GetAllMealsAPI,
    ListSingleMealAPI,
    GetCatMealsAPI,
//-----*meal

    GetAllProductsAPI,
    GetCatProductsAPI,
    GetFeaturedProductsAPI,
    ListCategoryByLimitAPI,
    ListAllProductsByLimitAPI,
    ListSingleProductAPI,
    GetProductDetailAPI,
    BuyProductsAPI,
    ProdPaymentsAPI,
    AddWishAPI,
    RemoveWishAPI,
    ListWishAPI,
    AddRatingAPI,
    ListRatingAPI,
    CoupanAPI,
    GetTrainerListAPI,
    GetTrainerCatAPI,
    SearchTrainerAPI,
    TrainerVideosAPI,
    TrainerProfileAPI,
    GetNotificationAPI,
    GetOrderListAPI, GetCalculationAPI, GetLeadData
} from '../API';


function* login(actions) {
    const response = yield call(LoginAPI, actions.data);
    yield delay(2000);
    if (response.status === 200) {
        if (response.data.user) {
            localStorage.setItem('user_details', JSON.stringify(response.data.user));
            localStorage.setItem('user_role', response.data.user.role);
            yield put(
                Actions.loginSuccess(response.data.user.token, response.data.user)
            );
            yield put(Actions.stopLoaderOne());
        } else if (response.data.status === 402 || response.data.status === 405) {
            // 402:Not Subscribed   405:Subscription expired
            localStorage.setItem('user_id', response.data.user_id);
            yield put(Actions.subscriptionError(response.data.message));
        } else {
            yield put(Actions.loginFailure(response.data.message));
            yield put(Actions.stopLoaderOne());
        }
    } else {
        yield put(Actions.loginFailure(response.response.data.message));
        yield put(Actions.stopLoaderOne());
    }
}

function* trainerRegister(actions) {
    const response = yield call(TrainerRegisterAPI, actions.data);
    if (response.status === 200) {
        localStorage.setItem('user_id', response.data.data._id);
        localStorage.setItem('trainer_data', JSON.stringify(response.data.data));
        yield put(Actions.trainerRegisterSuccess(response.data.message));
        yield put(Actions.stopLoading());
    } else {
        yield put(
            Actions.trainerRegisterFailure(response.response.data.errors[0].message)
        );
        yield put(Actions.stopLoading());
    }
}

function* addCategory(actions) {
    const response = yield call(AddCategoryAPI, actions.data);
    if (response.status === 200) {
        yield put(Actions.addCategorySuccess(response.data.message));

    } else {
        yield put(
            Actions.addCategoryFailure(response.response.data.errors[0].message)
        );

    }
}

function* userRegister(actions) {
    const response = yield call(UserRegisterAPI, actions.data);
    if (response.status === 200) {
        if (response.data.status === 200) {
            localStorage.setItem('user_id', response.data.data._id);
            localStorage.setItem('user_role', response.data.data.role);
            localStorage.setItem('user_data', JSON.stringify(response.data.data));
            yield put(Actions.userRegisterSuccess(response.data.message));
            yield put(Actions.stopLoading());
        } else if (response.data.status === parseInt(400)) {
            yield put(Actions.userRegisterFailure(response.data.message));
        }
    } else {
        yield put(
            Actions.userRegisterFailure(response.response.data.errors[0].message)
        );
        yield put(Actions.stopLoading());
    }
}

function* addProduct(actions) {
    const response = yield call(AddProductAPI, actions.data);
    if (response.status === 200) {
        yield put(Actions.addProductSuccess(response.data.message));

    } else {
        yield put(
            Actions.addProductFailure(response.response.data.errors[0].message)
        );
    }
}

function* listProducts(actions) {
    const response = yield call(ListProductsAPI);
    if (response.status === 200) {
        yield put(Actions.listProductsSuccess(response.data));

    } else {
        yield put(
            Actions.addProductsFailure(response.response.data.errors[0].message)
        );

    }
}

function* addVideo(actions) {
    const response = yield call(AddVideoAPI, actions.data);
    if (response.status === 200) {
        yield put(Actions.trainerVideoSuccess(response.data.message));

    } else {
        yield put(
            Actions.trainerVideoFailure(response.response.data.errors[0].message)
        );

    }
}

function* listVideo(actions) {
    const response = yield call(ListVideoAPI);
    if (response.status === 200) {
        yield put(Actions.listVideoSuccess(response.data));

    } else {
        yield put(
            Actions.listVideoFailure(response.response.data.errors[0].message)
        );

    }
}


function* getSubscription(actions) {
    const response = yield call(GetSubscriptionAPI, actions.data);
    if (response.status === 200) {
        localStorage.setItem('payment_id', response.data.data.id);
        yield put(Actions.getSubscriptionSuccess(response.data.data.checkout_url));
    } else {
        yield put(
            Actions.getSubscriptionFailure(response.response.data.errors[0].message)
        );
    }
}


function* listCategoryByLimit(actions) {
    const response = yield call(ListCategoryByLimitAPI,actions.data);
    if (response.status === 200) {
        yield put(Actions.listCategoryByLimitSuccess(response.data));

    } else {
        yield put(
            Actions.listCategoryByLimitError(response.response.data.errors[0].message)
        );

    }
}

function* getAllProductsByLimit(actions){
    const response = yield call(ListAllProductsByLimitAPI, actions.data);
    if (response.status === 200 && response.data.data) {
        yield put(Actions.listAllProductsByLimitSuccess(response.data.data));
    } else {
        yield put(
            Actions.listAllProductsByLimitError(response.response.data.errors[0].message)
        );
    }
}

function* listSingleProduct(actions){
    const response = yield call(ListSingleProductAPI, actions.data);
    if (response.status === 200 && response.data.data) {
        yield put(Actions.listSingleProductSuccess(response.data.data, response.data.products));
    } else {
        yield put(
            Actions.listSingleProductError(response.response.data.errors[0].message)
        );
    }
}

function* subscriptionComplete(actions) {
    const response = yield call(SubscriptionCompleteAPI, actions.data);
    if (response.status === 200 && response.data.data) {
        yield put(Actions.subscriptionCompleteSuccess(response.data.data));
    } else {
        yield put(
            Actions.subscriptionCompleteFailure(response.response.data.errors[0].message)
        );
    }
}

function* listCategory(actions) {
    const response = yield call(ListCategoryAPI);
    if (response.status === 200) {
        yield put(Actions.listCategorySuccess(response.data));

    } else {
        yield put(
            Actions.addCategoryFailure(response.response.data.errors[0].message)
        );

    }
}

function* listMealCategory(actions) {
    const response = yield call(ListMealCategoryAPI);
    if (response.status === 200) {
        yield put(Actions.listMealCategorySuccess(response.data));

    } else {
        yield put(
            Actions.addMealCategoryFailure(response.response.data.errors[0].message)
        );

    }
}

function* calculatorRequestSaga(actions) {
    console.log('calculatorRequestSaga ', actions);
    const response = yield call(CalculatorAPI, actions.details);
    if (response.status === parseInt(200)) {
        yield put(Actions.calculatorSuccess(response.data.message));
    } else {
        yield put(Actions.calculatorFailure(response.err));
    }
}

// DietPlan purchasing saga


// function* dietplanPurchase(actions) {
//     const response = yield call(GetLeadData, actions.details);
//     if (response.status === 200) {
//         localStorage.setItem('diet_payment_id', response.data.data.id);
//         yield put(Actions.dietPurchaseSuccess(response.data.data.checkout_url));
//     } else {
//         yield put(
//             Actions.dietPurchaseFailure(response.response.data.errors[0].message)
//         );
//     }
// } 


function* dietplanPurchase(actions) {
    const response = yield call(GetDietPlanAPI, actions.details);
    if (response.status === 200) {
        localStorage.setItem('diet_payment_id', response.data.data.id);
        yield put(Actions.dietPurchaseSuccess(response.data.data.checkout_url));
    } else {
        yield put(
            Actions.dietPurchaseFailure(response.response.data.errors[0].message)
        );
    }
}

function* dietPurchaseComplete(actions) {
    const response = yield call(DietPurchaseCompleteAPI, actions.details);
    console.log('dietPurchaseComplete', dietPurchaseComplete);
    // check response.data
    if (response.status === 200 && (response.data.status === 200 || response.data.data)) {
        if(response.data.data){
            yield put(Actions.dietPurchaseCompleteSuccess(response.data.data));
        }else{
            yield put(Actions.dietPurchaseCompleteSuccess(response.data));
        }
        
    } else {
        yield put(
            Actions.dietPurchaseCompleteFailure(response.response.data.errors[0].message)
        );
    }
}

function* getAllProducts(actions){
    const response = yield call(GetAllProductsAPI, actions.condition);
    if (response.status === 200 && response.data.data) {
        yield put(Actions.getAllProductsSuccess(response.data.data,response.data.count));
    } else {
        yield put(
            Actions.getAllProductsFailure(response.response.data.errors[0].message)
        );
    }
}

function* getAllMeals(actions){
    const response = yield call(GetAllMealsAPI, actions.condition);
    if (response.status === 200 && response.data.data) {
        yield put(Actions.getAllMealsSuccess(response.data.data,response.data.count));
    } else {
        yield put(
            Actions.getAllMealsFailure(response.response.data.errors[0].message)
        );
    }
}

function* listSingleMeal(actions){
    const response = yield call(ListSingleMealAPI, actions.data);
    if (response.status === 200 && response.data.data) {
        yield put(Actions.listSingleMealSuccess(response.data.data, response.data.products));
    } else {
        yield put(
            Actions.listSingleMealError(response.response.data.errors[0].message)
        );
    }
}

function* getCatProducts(actions){
    const response = yield call(GetCatProductsAPI, actions.condition);
    if (response.status === 200 && response.data.data) {
        yield put(Actions.getCatProductSuccess(response.data.data,response.data.count));
    } else {
        yield put(
            Actions.getCatProductFailure(response.response.data.errors[0].message)
        );
    }
}

function* getCatMeals(actions){
    const response = yield call(GetCatMealsAPI, actions.condition);
    if (response.status === 200 && response.data.data) {
        yield put(Actions.getCatMealSuccess(response.data.data,response.data.count));
    } else {
        yield put(
            Actions.getCatMealFailure(response.response.data.errors[0].message)
        );
    }
}

function* getFeaturedProducts(actions){
    const response = yield call(GetFeaturedProductsAPI);
    if (response.status === 200 && response.data.data) {
        yield put(Actions.getFeaturedProdSuccess(response.data.data));
    } else {
        yield put(
            Actions.getFeaturedProdFailure(response.response.data.errors[0].message)
        );
    }
}


function* getProductDetailsSaga(actions){
    const response = yield call(GetProductDetailAPI, actions.prod_id);
    if (response.status === 200 && response.data.data) {
        yield put(Actions.getProdDetailsSuccess(response.data.data));
    } else {
        yield put(
            Actions.getProdDetailsFailure(response.response.data.errors[0].message)
        );
    }
}

function* buyProductsSaga(actions){
    const response = yield call(BuyProductsAPI, actions.details);
    if (response.status === 200 && response.data.data) {
        localStorage.setItem('prod_purchs_id', response.data.data.id);
        // localStorage.setItem('user_id', response.data.data.user_id);
        yield put(Actions.buyProductSuccess(response.data.data.checkout_url));
    } else if(response.status === 200 && response.data.status === 404){
        yield put (Actions.buyProductFailure(response.data.message));
    }else {
        yield put (Actions.buyProductFailure(response.errors.title));
    }
}

function* prodPaymentsSaga(actions){
    const response = yield call(ProdPaymentsAPI, actions.details);
    if (response.data.status === 200 ) {
        yield put(Actions.prodPaymentSuccess(response.data));
    } else if(response.data.status === 400){
        yield put(Actions.prodPaymentFailure(response.data.message));
    }else {
        yield put(
            Actions.prodPaymentFailure(response.response.data.errors[0].message)
        );
    }
}

function* removeWish(actions) {
    const response = yield call(RemoveWishAPI, actions.data);
    if (response.status === 200) {
        yield put(Actions.removeWishSuccess(response.data.data,response.data.count,response.data.message));

    } else {
        yield put(
            Actions.removeWishError(response.response.data.errors[0].message)
        );
    }
}

function* listWishProducts(actions) {
    const response = yield call(ListWishAPI, actions.data);
    if (response.status === 200 && response.data.data) {
        yield put(Actions.listWishSuccess(response.data.data,response.data.count));
    } else if(response.data.status === 401){
        let store = ["user_role", "user_details"];
        store.forEach((item) => localStorage.removeItem(item));
        yield put(
            Actions.listWishError(response.data.message)
        );
    }else {
        yield put(
            Actions.listWishError(response.response.data.errors[0].message)
        );
    }
}

function* addRating(actions) {
    const response = yield call(AddRatingAPI, actions.data);
    if (response.status === 200 && response.data.status === 200) {
        yield put(Actions.addRatingSuccess(response.data.data,response.data.message));

    } else if(response.data.status === 401){
        yield put(
            Actions.addRatingError(response.data.message)
        );
    } else {
        yield put(
            Actions.addRatingError(response.response.data.errors[0].message)
        );

    }
}

function* listRating(actions) {
    const response = yield call(ListRatingAPI, actions.data);
    if (response.status === 200 && response.data.data) {
        yield put(Actions.listRatingSuccess(response.data.data));
    } else {
        yield put(
            Actions.listRatingError(response.response.data.errors[0].message)
        );

    }
}

function* addWish(actions) {
    const response = yield call(AddWishAPI, actions.data);
    if (response.status === 200) {
        yield put(Actions.addWishSuccess(response.data.message));
    }else{
        yield put(
            Actions.addWishError(response.response.data.errors[0].message)
            );
    }
}

function* applyCoupanSaga(actions){
    const response = yield call(CoupanAPI, actions.coupon);
    if (response.status === 200) {
        if(response.data.status === 200){
            yield put(Actions.applyCoupanSuccess(response.data.discount));
        }
        if(response.data.status === 400){
            yield put(Actions.applyCoupanFailure(response.data.message));
        }
    } else {
        yield put(
            Actions.applyCoupanFailure(response.response.data.errors[0].message)
        );
    }
}

function* getTrainersListSaga(actions) {
    const response = yield call(GetTrainerListAPI, actions.details);
    if (response.status === 200) {
        yield put(Actions.trainerListSuccess(response.data.data, response.data.data.total_pages));

    } else {
        yield put(
            Actions.trainerListFailure(response.response.data.errors[0].message)
        );

    }
}

function* trainerCategorySaga(){
    const response = yield call(GetTrainerCatAPI);
    if (response.status === 200) {
        yield put(Actions.trainerCatSuccess(response.data.data.trainer_Category_list));

    } else if(response.data.status === 400){
        yield put(
            Actions.trainerCatFailure(response.data.message)
        );
    } else {
        yield put(
            Actions.trainerCatFailure(response.response.data.errors[0].message)
        );

    }
}

function* searchTrainerSaga(actions){
    const response = yield call(SearchTrainerAPI, actions.data);
    if (response.status === 200) {
        yield put(Actions.trainerListSuccess(response.data.data));

    } else {
        yield put(
            Actions.trainerListFailure(response.response.data.errors[0].message)
        );

    }
}

function* trainerVideosSaga(actions){
    const response = yield call(TrainerVideosAPI, actions.data);
    if (response.status === 200) {
        yield put(Actions.trainerVideosSuccess(response.data.data.trainer_Video_list, response.data.data.totalPages));

    } else {
        yield put(
            Actions.trainerVideosFailure(response.response.data.errors[0].message)
        );
    }
}

function* profileDetailsSaga(actions){
    const response = yield call(TrainerProfileAPI, actions.trainerId);
    if (response.status === 200) {
        yield put(Actions.profileSuccess(response.data.data[0]));

    } else {
        yield put(
            Actions.profileFailure(response.response.data.errors[0].message)
        );
    }
}

function* checkNotificationSaga(actions){
    const response = yield call(GetNotificationAPI, actions.page_no);
    if (response.status === 200) {
        yield put(Actions.getNotificationSuccess(response.data.data.notificationList));

    } else {
        yield put(
            Actions.getNotificationError(response.response.data.errors[0].message)
        );
    }
}

function* getOrderListSaga(actions){
    const response = yield call(GetOrderListAPI, actions.page_no);
    if (response.data.status === 200) {
        yield put(Actions.orderListSuccess(response.data.data.ordersList));
    } else {
        yield put(
            Actions.orderListFailure(response.response.data.errors[0].message)
        );
    }
}

function* getCalculationsSaga(){
    const response = yield call(GetCalculationAPI);
    if (response.status === 200 && response.data.status === 200) {
        yield put(Actions.getCalculationsSuccess(response.data.data));
    } else if (response.status === 200 && response.data.status === 401) {
        let store = ["user_role", "user_details"];
        store.forEach((item) => localStorage.removeItem(item));
        yield put(Actions.getCalculationsFailure(response.data.message));
    } else {
        yield put(
            Actions.getCalculationsFailure(response.response.data.errors[0].message)
        );
    }
}

export default function* rootSaga() {
    yield takeLatest('LOGIN_REQUEST', login);
    yield takeLatest('TRAINER_REGISTER_REQUEST', trainerRegister);
    yield takeLatest('TRAINER_VIDEO_REQUEST', addVideo);
    yield takeLatest('ADD_CATEGORY_REQUEST', addCategory);
    yield takeLatest('LIST_CATEGORY_REQUEST', listCategory);
    yield takeLatest('ADD_PRODUCT_REQUEST', addProduct);
    yield takeLatest('LIST_PRODUCTS_REQUEST', listProducts);
    yield takeLatest('LIST_VIDEO_REQUEST', listVideo);
    yield takeLatest('GET_SUBSCRIPTION', getSubscription);
    yield takeLatest('SUBSCRIPTION_COMPLETE', subscriptionComplete);
    yield takeLatest('USER_REGISTER_REQUEST', userRegister);
    yield takeLatest('CALCULATOR_REQUEST', calculatorRequestSaga);
    yield takeLatest('DIET_PURCHASE', dietplanPurchase);
    yield takeLatest('DIET_PURCHASE_COMPLETE', dietPurchaseComplete);
    yield takeLatest('GET_ALL_PRODUCTS', getAllProducts);
    
// ---------*Meals--------------
    yield takeLatest('GET_ALL_MEALS', getAllMeals);
    yield takeLatest('LIST_SINGLE_MEAL_REQUEST', listSingleMeal);
    yield takeLatest('LIST_MEAL_CATEGORY_REQUEST', listMealCategory);
    yield takeLatest('GET_CAT_MEAL', getCatMeals);

// ---------*Meals--------------

    yield takeLatest('GET_CAT_PRODUCT', getCatProducts);
    yield takeLatest('GET_FEATURED_PROD', getFeaturedProducts);
    yield takeLatest('LIST_CATEGORY_BY_LIMIT_REQUEST', listCategoryByLimit);
    yield takeLatest('LIST_ALL_PRODUCTS_BY_LIMIT_REQUEST', getAllProductsByLimit);
    yield takeLatest('LIST_SINGLE_PRODUCT_REQUEST', listSingleProduct);
    yield takeLatest('GET_PROD_DETAILS', getProductDetailsSaga);
    yield takeLatest('BUY_PRODUCT', buyProductsSaga);
    yield takeLatest('PROD_PAYMENT', prodPaymentsSaga);
    yield takeLatest('ADD_WISH_REQUEST', addWish);
    yield takeLatest('REMOVE_WISH_REQUEST', removeWish);
    yield takeLatest('LIST_WISH_REQUEST', listWishProducts);
    yield takeLatest('ADD_RATING_REQUEST', addRating);
    yield takeLatest('LIST_RATING_REQUEST', listRating);
    yield takeLatest('APPLY_COUPAN', applyCoupanSaga);
    yield takeLatest('TRAINER_LIST', getTrainersListSaga);
    yield takeLatest('TRAINER_CAT', trainerCategorySaga);
    yield takeLatest('TRAINER_SEARCH', searchTrainerSaga);
    yield takeLatest('TRAINER_VIDEOS', trainerVideosSaga);
    yield takeLatest('PROFILE_DETAILS', profileDetailsSaga);
    yield takeLatest('CHECK_FOR_NOTIFICATIONS', checkNotificationSaga);
    // user dashboard
    yield takeLatest('GET_ORDERS_LIST', getOrderListSaga);
    yield takeLatest('GET_CALCULATIONS', getCalculationsSaga);
};  