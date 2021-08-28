import { createReducer } from 'reduxsauce';
import { Constants } from '../Actions';

const INITIAL_STATE = {
    success: false,
    error: false,
    message: null,

    cartItems: [],
    remove_wish_success:false,
    remove_wish_error:false,
    add_wish_success:false,
    add_wish_error:false,
    add_rating_error:false,
    add_rating_success:false,

};

const PRODUCTS_STATE = {
// --------------*Meals------------
    all_meals:null,
    prod_details: null,

// --------------*Meals------------

    all_products: null,
    get_success: false,
    get_error: false,
    get_error_msg: null,
    count: 0,

    prod_details: null,
    get_prod_err: false,
    get_prod_success: false,
    get_details_err: false,
    get_details_success: false,

    get_cat_prod_success: false,
    get_cat_prod_err: false,
    
    feat_prods: null,
    feat_prods_success: false,
    feat_prods_err: false,

    buy_Prod_details: null,
    buy_Prod_success: false,
    buy_Prod_err: false,
    buy_Prod_error_msg: null,
    prod_payment_url: null,

    prod_pay_success: false,
    prod_pay_err: false,
    prod_pay_error_msg: null,

    wish_products: null,
    wish_count: 0,
    add_wish_success: false,
    remove_wish_success: false,
    add_wish_error: false,
    remove_wish_error: false,
}

const addCategoryRequest = (state = INITIAL_STATE, action) => {
    return { ...INITIAL_STATE };
};

const addCategorySuccess = (state = INITIAL_STATE, action) => {
    return { ...state, success: true, message: action.payload };
};

const addCategoryError = (state = INITIAL_STATE, action) => {
    return { ...state, error: true, message: action.error };
};

const addProductRequest = (state = INITIAL_STATE, action) => {
    return { ...INITIAL_STATE };
};

const addProductSuccess = (state = INITIAL_STATE, action) => {
    return { ...state, productSuccess: true, message: action.payload };
};

const addProductError = (state = INITIAL_STATE, action) => {
    return { ...state, productError: true, message: action.error };
};

const listCategoryRequest = (state = INITIAL_STATE, action) => {
    return { ...INITIAL_STATE };
};

const listCategorySuccess = (state = INITIAL_STATE, action) => {
    return { ...state, success: true, categories: action.categories.data };
};

const listCategoryError = (state = INITIAL_STATE, action) => {
    return { ...state, error: true, message: action.error };
};
const listProductsRequest = (state = INITIAL_STATE, action) => {
    return { ...INITIAL_STATE };
};

const listProductsSuccess = (state = INITIAL_STATE, action) => {
    return { ...state, success: true, products: action.products.data };
};

const listProductsError = (state = INITIAL_STATE, action) => {
    return { ...state, error: true, message: action.error };
};

const removeCartItem = (state = INITIAL_STATE, action) => {
    return { ...state }
};

const removeItemSuccess = (state = INITIAL_STATE, action) => {
    return { ...state }
};

const removeItemFailure = (state = INITIAL_STATE, action) => {
    return { ...state }
};

const getCartItems = (state = INITIAL_STATE, action) => {
    return { ...state }
};

const getCartItemsSuccess = (state = INITIAL_STATE, action) => {
    return { ...state }
};

const getCartItemsFailure = (state = INITIAL_STATE, action) => {
    return { ...state }
};

// Get all products
const getAllProducts = (state = PRODUCTS_STATE, action) => {
    return { ...state }
};

const getAllProductsSuccess = (state = PRODUCTS_STATE, action) => {
    return {
        ...state,
        get_success: true,
        all_products: action.product,
        count : action.count
    }
};

const getAllProductsFailure = (state = PRODUCTS_STATE, action) => {
    return {
        ...state,
        get_error: true,
        get_error_msg: action.errMsg
    }
};

//---------------*Meals-------------
const getAllMeals = (state = PRODUCTS_STATE, action) => {
    return { ...state }
};

const getAllMealsSuccess = (state = PRODUCTS_STATE, action) => {
    return {
        ...state,
        get_success: true,
        all_meals: action.product,
        count : action.count
    }
};

const getAllMealsFailure = (state = PRODUCTS_STATE, action) => {
    return {
        ...state,
        get_error: true,
        get_error_msg: action.errMsg
    }
};

const listSingleMealRequest = (state = INITIAL_STATE, action) => {
    return { ...INITIAL_STATE };
};

const listSingleMealSuccess = (state = INITIAL_STATE, action) => {
    return { ...state, 
        single_product_success: true, 
        single_product: action.product , 
        like_products: action.like_products
    };
};

const listSingleMealError = (state = INITIAL_STATE, action) => {
    return { 
        ...state, 
        error: true,
        message: action.error 
    };
};

const listMealCategoryRequest = (state = INITIAL_STATE, action) => {
    return { ...INITIAL_STATE };
};

const listMealCategorySuccess = (state = INITIAL_STATE, action) => {
    return { ...state, success: true, categories: action.categories.data };
};

const listMealCategoryError = (state = INITIAL_STATE, action) => {
    return { ...state, error: true, message: action.error };
};

const getCatMeal = (state = PRODUCTS_STATE, action) => {
    return { ...state }
};

const getCatMealSuccess = (state = PRODUCTS_STATE, action) => {
    return {
        ...state,
        get_cat_prod_success: true,
        get_cat_prod_err: false,
        all_meals: action.product,
        count : action.count
    }
};

const getCatMealFailure = (state = PRODUCTS_STATE, action) => {
    return {
        ...state,
        get_cat_prod_err: true,
        get_cat_prod_success: false,
        get_error_msg: action.errMsg
    }
};

//---------------*Meals-------------

//  Get Category Products
const getCatProduct = (state = PRODUCTS_STATE, action) => {
    return { ...state }
};

const getCatProductSuccess = (state = PRODUCTS_STATE, action) => {
    return {
        ...state,
        get_cat_prod_success: true,
        get_cat_prod_err: false,
        all_products: action.product,
        count : action.count
    }
};

const getCatProductFailure = (state = PRODUCTS_STATE, action) => {
    return {
        ...state,
        get_cat_prod_err: true,
        get_cat_prod_success: false,
        get_error_msg: action.errMsg
    }
};

//  Get Single Product
const getSingleProduct = (state = PRODUCTS_STATE, action) => {
    return{ ...state }
}

const getSingleProductSuccess = (state = PRODUCTS_STATE, action) => {
    return{ ...state, get_prod_success: true, prod_details: action.prod_details }
}

const getSingleProductFailure = (state = PRODUCTS_STATE, action) => {
    return{ ...state, get_prod_err: true }
}

//  Get Featured Products
const getFeaturedProd = (state = PRODUCTS_STATE, action) => {
    return { ...state }
};

const getFeaturedProdSuccess = (state = PRODUCTS_STATE, action) => {
    return {
        ...state,
        feat_prods_success: true,
        feat_prods_err: false,
        feat_prods: action.featured_products
    }
};

const getFeaturedProdFailure = (state = PRODUCTS_STATE, action) => {
    return {
        ...state,
        feat_prods_err: true,
        feat_prods_success: false,
        get_error_msg: action.errMsg
    }
};

const listCategoryByLimitRequest = (state = INITIAL_STATE, action) => {
    return { ...INITIAL_STATE };
};

const listCategoryByLimitSuccess = (state = INITIAL_STATE, action) => {
    return { ...state, success: true, categories: action.categories.data };
};

const listCategoryByLimitError = (state = INITIAL_STATE, action) => {
    return { ...state, error: true, message: action.error };
};

const listAllProductsByLimitRequest = (state = INITIAL_STATE, action) => {
    return { ...INITIAL_STATE };
};

const listAllProductsByLimitSuccess = (state = INITIAL_STATE, action) => {
    return { ...state, product_success: true, all_products_bylimit: action.product };
};

const listAllProductsByLimitError = (state = INITIAL_STATE, action) => {
    return { ...state, error: true, message: action.error };
};

const listSingleProductRequest = (state = INITIAL_STATE, action) => {
    return { ...INITIAL_STATE };
};

const listSingleProductSuccess = (state = INITIAL_STATE, action) => {
    return { ...state, single_product_success: true, single_product: action.product , like_products: action.like_products};
};

const listSingleProductError = (state = INITIAL_STATE, action) => {
    return { ...state, error: true, message: action.error };
};


//  Buy Products
const buyProduct = (state = PRODUCTS_STATE, action) => {
    return { ...state }
};

const buyProductSuccess = (state = PRODUCTS_STATE, action) => {
    return {
        ...state,
        buy_Prod_success: true,
        buy_Prod_err: false,
        prod_payment_url: action.report
    }
};

const buyProductFailure = (state = PRODUCTS_STATE, action) => {
    return {
        ...state,
        buy_Prod_err: true,
        buy_Prod_success: false,
        buy_Prod_error_msg: action.errMsg
    }
};

//  payment success
const prodPayment = (state = PRODUCTS_STATE, action) => {
    return { ...state }
};

const prodPaymentSuccess = (state = PRODUCTS_STATE, action) => {
    return {
        ...state,
        prod_pay_success: true,
        prod_pay_err: false,
        prod_payment_url: action.report
    }
};

const prodPaymentFailure = (state = PRODUCTS_STATE, action) => {
    return {
        ...state,
        prod_pay_err: true,
        prod_pay_success: false,
        prod_pay_error_msg: action.errMsg
    }
};

const addWishRequest = (state = INITIAL_STATE, action) => {
   return { ...state, add_wish_success:false , add_wish_error:false };
};

const addWishSuccess = (state = INITIAL_STATE, action) => {
    return { ...state, add_wish_success: true, message: action.payload };
};

const addWishError = (state = INITIAL_STATE, action) => {
    return { ...state, add_wish_error: true, message: action.error };
};

const removeWishRequest = (state = INITIAL_STATE, action) => {
    return { ...state, remove_wish_success:false , remove_wish_error:false };
};

const removeWishSuccess = (state = INITIAL_STATE, action) => {
    return { ...state, remove_wish_success: true, wish_success: true,
        wish_products: action.product,
        wish_count : action.count,
        message:action.message };
};

const removeWishError = (state = INITIAL_STATE, action) => {
    return { ...state, remove_wish_error: true, message: action.error };
};

// Get wishlist products
const listWishRequest = (state = PRODUCTS_STATE, action) => {
    return { ...state }
};

const listWishSuccess = (state = PRODUCTS_STATE, action) => {
    return {
        ...state,
        wish_success: true,
        wish_products: action.product,
        wish_count : action.count
    }
};

const listWishError = (state = PRODUCTS_STATE, action) => {
    return {
        ...state,
        wish_error: true,
        wish_error_msg: action.error
    }
};

const addRatingRequest = (state = INITIAL_STATE, action) => {
    return { ...state, add_rating_success:false , add_rating_error:false };
};

const addRatingSuccess = (state = INITIAL_STATE, action) => {
    return { ...state, add_rating_success: true, rating_success:true,
        rating: action.rating,
        message:action.message };
};

const addRatingError = (state = INITIAL_STATE, action) => {
    return { ...state, add_rating_error: true, message: action.error };
};

const listRatingRequest = (state = INITIAL_STATE, action) => {
    return { ...state }
};

const listRatingSuccess = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        rating_success: true,
        rating: action.rating
    }
};

const listRatingError = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        rating_error: true,
        rating_error_msg: action.errMsg
    }
};

const HANDLERS = {
    [Constants.ADD_CATEGORY_REQUEST]        : addCategoryRequest,
    [Constants.ADD_CATEGORY_SUCCESS]        : addCategorySuccess,
    [Constants.ADD_CATEGORY_FAILURE]        : addCategoryError,

    [Constants.ADD_PRODUCT_REQUEST]         : addProductRequest,
    [Constants.ADD_PRODUCT_SUCCESS]         : addProductSuccess,
    [Constants.ADD_PRODUCT_FAILURE]         : addProductError,
    
    [Constants.LIST_CATEGORY_REQUEST]       : listCategoryRequest,
    [Constants.LIST_CATEGORY_SUCCESS]       : listCategorySuccess,
    [Constants.LIST_CATEGORY_FAILURE]       : listCategoryError,
    
    [Constants.LIST_PRODUCTS_REQUEST]       : listProductsRequest,
    [Constants.LIST_PRODUCTS_SUCCESS]       : listProductsSuccess,
    [Constants.LIST_PRODUCTS_FAILURE]       : listProductsError,

    [Constants.REMOVE_CART_ITEM]            : removeCartItem,
    [Constants.REMOVE_ITEM_SUCCESS]         : removeItemSuccess,
    [Constants.REMOVE_ITEM_FAILURE]         : removeItemFailure,

    [Constants.GET_CART_ITEMS]              : getCartItems,
    [Constants.GET_CART_ITEMS_SUCCESS]      : getCartItemsSuccess,
    [Constants.GET_CART_ITEMS_FAILURE]      : getCartItemsFailure,

    [Constants.GET_ALL_PRODUCTS]            : getAllProducts,
    [Constants.GET_ALL_PRODUCTS_SUCCESS]    : getAllProductsSuccess,
    [Constants.GET_ALL_PRODUCTS_FAILURE]    : getAllProductsFailure,

// ---------------*Meals----------
    [Constants.GET_ALL_MEALS]            : getAllMeals,
    [Constants.GET_ALL_MEALS_SUCCESS]    : getAllMealsSuccess,
    [Constants.GET_ALL_MEALS_FAILURE]    : getAllMealsFailure,

    [Constants.LIST_SINGLE_MEAL_REQUEST]       : listSingleMealRequest,
    [Constants.LIST_SINGLE_MEAL_SUCCESS]       : listSingleMealSuccess,
    [Constants.LIST_SINGLE_MEAL_FAILURE]       : listSingleMealError,

    [Constants.LIST_MEAL_CATEGORY_REQUEST]       : listMealCategoryRequest,
    [Constants.LIST_MEAL_CATEGORY_SUCCESS]       : listMealCategorySuccess,
    [Constants.LIST_MEAL_CATEGORY_FAILURE]       : listMealCategoryError,

    [Constants.GET_CAT_MEAL]             : getCatMeal,
    [Constants.GET_CAT_MEAL_SUCCESS]     : getCatMealSuccess,
    [Constants.GET_CAT_MEAL_FAILURE]     : getCatMealFailure,
// ---------------*Meals----------
    
    [Constants.GET_CAT_PRODUCT]             : getCatProduct,
    [Constants.GET_CAT_PRODUCT_SUCCESS]     : getCatProductSuccess,
    [Constants.GET_CAT_PRODUCT_FAILURE]     : getCatProductFailure,

    [Constants.GET_SINGLE_PRODUCT]          : getSingleProduct,
    [Constants.GET_SINGLE_PRODUCT_SUCCESS]  : getSingleProductSuccess,
    [Constants.GET_SINGLE_PRODUCT_FAILURE]  : getSingleProductFailure,

    [Constants.GET_FEATURED_PROD]           : getFeaturedProd,
    [Constants.GET_FEATURED_PROD_SUCCESS]   : getFeaturedProdSuccess,
    [Constants.GET_FEATURED_PROD_FAILURE]   : getFeaturedProdFailure,

    [Constants.LIST_CATEGORY_BY_LIMIT_REQUEST]       : listCategoryByLimitRequest,
    [Constants.LIST_CATEGORY_BY_LIMIT_SUCCESS]       : listCategoryByLimitSuccess,
    [Constants.LIST_CATEGORY_BY_LIMIT_FAILURE]       : listCategoryByLimitError,

    [Constants.LIST_ALL_PRODUCTS_BY_LIMIT_REQUEST]       : listAllProductsByLimitRequest,
    [Constants.LIST_ALL_PRODUCTS_BY_LIMIT_SUCCESS]       : listAllProductsByLimitSuccess,
    [Constants.LIST_ALL_PRODUCTS_BY_LIMIT_FAILURE]       : listAllProductsByLimitError,

    [Constants.LIST_SINGLE_PRODUCT_REQUEST]       : listSingleProductRequest,
    [Constants.LIST_SINGLE_PRODUCT_SUCCESS]       : listSingleProductSuccess,
    [Constants.LIST_SINGLE_PRODUCT_FAILURE]       : listSingleProductError,
 

    [Constants.BUY_PRODUCT]                 : buyProduct,
    [Constants.BUY_PRODUCT_SUCCESS]         : buyProductSuccess,
    [Constants.BUY_PRODUCT_FAILURE]         : buyProductFailure,

    [Constants.PROD_PAYMENT]                 : prodPayment,
    [Constants.PROD_PAYMENT_SUCCESS]         : prodPaymentSuccess,
    [Constants.PROD_PAYMENT_FAILURE]         : prodPaymentFailure,

    [Constants.ADD_WISH_REQUEST]             : addWishRequest,
    [Constants.ADD_WISH_SUCCESS]             : addWishSuccess,
    [Constants.ADD_WISH_ERROR]               : addWishError,

    [Constants.REMOVE_WISH_REQUEST]         : removeWishRequest,
    [Constants.REMOVE_WISH_SUCCESS]         : removeWishSuccess,
    [Constants.REMOVE_WISH_ERROR]           : removeWishError,

    [Constants.LIST_WISH_REQUEST]         : listWishRequest,
    [Constants.LIST_WISH_SUCCESS]         : listWishSuccess,
    [Constants.LIST_WISH_ERROR]           : listWishError,

    [Constants.ADD_RATING_REQUEST]         : addRatingRequest,
    [Constants.ADD_RATING_SUCCESS]         : addRatingSuccess,
    [Constants.ADD_RATING_ERROR]           : addRatingError,

    [Constants.LIST_RATING_REQUEST]         : listRatingRequest,
    [Constants.LIST_RATING_SUCCESS]         : listRatingSuccess,
    [Constants.LIST_RATING_ERROR]           : listRatingError,
};

export default createReducer(INITIAL_STATE, HANDLERS);