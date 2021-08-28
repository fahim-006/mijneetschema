import { createActions } from 'reduxsauce';

const { Types, Creators } = createActions(
  {
    addCategoryRequest: ['data'],
    addCategorySuccess: ['payload'],
    addCategoryFailure: ['error'],
    addProductRequest: ['data'],
    addProductSuccess: ['payload'],
    addProductFailure: ['error'],

    listCategoryRequest: ['data'],
    listCategorySuccess: ['categories'],
    listCategoryFailure: ['error'],

    
    listProductsRequest: ['data'],
    listProductsSuccess: ['products'],
    listProductsFailure: ['error'],


    getCartItems: ['data'],
    getCartItemsSuccess: ['itemsList'],
    getCartItemsFailure: null,

    removeCartItem: ['item'],
    removeItemSuccess: null,
    removeItemFailure: null,

    getAllProducts: ['condition'],
    getAllProductsSuccess: ['product','count'],
    getAllProductsFailure: ['errMsg'],

    // -------meals---------
    getAllMeals: ['condition'],
    getAllMealsSuccess: ['product','count'],
    getAllMealsFailure: ['errMsg'],

    listSingleMealRequest: ['data'],
    listSingleMealSuccess: ['product','like_products'],
    listSingleMealFailure: ['error'],
    
    listMealCategoryRequest: ['data'],
    listMealCategorySuccess: ['categories'],
    listMealCategoryFailure: ['error'],

    getCatMeal: ['condition'],
    getCatMealSuccess: ['product','count'],
    getCatMealFailure: ['errMsg'],
    // -------meals---------

    getCatProduct: ['condition'],
    getCatProductSuccess: ['product','count'],
    getCatProductFailure: ['errMsg'],

    getSingleProduct: ['prod_id'],
    getSingleProductSuccess: ['prod_details'],
    getSingleProductFailure: ['errMsg'],

    getFeaturedProd: null,
    getFeaturedProdSuccess: ['featured_products'],
    getFeaturedProdFailure: ['errMsg'],

    listCategoryByLimitRequest: ['data'],
    listCategoryByLimitSuccess: ['categories'],
    listCategoryByLimitFailure: ['error'],

    listAllProductsByLimitRequest: ['data'],
    listAllProductsByLimitSuccess: ['product'],
    listAllProductsByLimitFailure: ['error'],

    listSingleProductRequest: ['data'],
    listSingleProductSuccess: ['product','like_products'],
    listSingleProductFailure: ['error'],
    
    buyProduct: ['details'],
    buyProductSuccess: ['report'],
    buyProductFailure: ['errMsg'],

    prodPayment: ['details'],
    prodPaymentSuccess: ['report'],
    prodPaymentFailure: ['errMsg'],

    addWishRequest: ['data'],
    addWishSuccess: ['payload'],
    addWishError: ['error'],

    removeWishRequest: ['data'],
    removeWishSuccess: ['product','count','message'],
    removeWishError: ['error'],

    listWishRequest: ['data'],
    listWishSuccess: ['product','count'],
    listWishError: ['error'],

    addRatingRequest: ['data'],
    addRatingSuccess: ['rating','message'],
    addRatingError: ['error'],

    listRatingRequest: ['data'],
    listRatingSuccess: ['rating'],
    listRatingError: ['error'],
  }
);

export const Constants = Types;
export default Creators;