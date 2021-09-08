const loginController = require("./../controller/loginController");
const dashboardController = require("./../controller/dashboardController");
const userController = require("./../controller/userController");
const plansController = require("./../controller/plansController");
const productsController = require("./../controller/productsController");
const mealsController = require("./../controller/mealsController");
const couponsController = require("./../controller/couponsController");
const auth = require("../../../helpers/admin/auth");
const { check } = require("express-validator");
var multer = require("multer");
var path = require("path");
const DIR = "./public/uploads";


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + "." + file.mimetype.split("/")[1]
    );
  },
});

const upload = multer({ storage: storage });

module.exports = (router) => {
  //Admin
  router.get("/login", auth.beforeLogin, loginController.login);
  router.post(
    "/loginPost",
    [
      check("email").not().isEmpty().withMessage("Email field is required"),
      check("password")
        .not()
        .isEmpty()
        .withMessage("Password field is required"),
    ],
    auth.beforeLogin,
    loginController.loginPost
  );

  router.get("/logout", auth.afterLogin, loginController.logout);
  router.get("/dashboard", auth.afterLogin, dashboardController.dashboard);
 
  //edit profile of admin(user)
  router.get("/user/edit-admin", auth.afterLogin, userController.editUser);
  router.post(
    "/user/update-admin/:id",
    upload.single("avtar"),
    [
      check("name").not().isEmpty().withMessage("Full Name field is required"),
      check("phone")
        .not()
        .isEmpty()
        .withMessage("Phone field is required")
        .isNumeric()
        .withMessage("Phone number must be numeric"),
    ],
    auth.afterLogin,
    userController.updateUser
  );

  router.get(
    "/user/reset-password",
    auth.afterLogin,
    userController.resetPassword
  );
  router.post(
    "/user/update-password",
    [
      check("old_password")
        .not()
        .isEmpty()
        .withMessage("Old Password field is required"),
      check("new_password")
        .not()
        .isEmpty()
        .withMessage("New Password field is required"),
      check("confirm_password")
        .not()
        .isEmpty()
        .withMessage("Confirm Password field is required"),
    ],
    auth.afterLogin,
    userController.updatePassword
  );

  router.get(
    "/products/category/add",
    auth.afterLogin,
    productsController.category
  );



  router.post(
    "/products/category/create",
    upload.single("avtar"),
    [
      check("category")
        .not()
        .isEmpty()
        .withMessage("Category field is required"),
      check("description")
        .not()
        .isEmpty()
        .withMessage("Description field is required"),
    ],
    auth.afterLogin,
    productsController.createCategory
  );

  router.get(
    "/products/category/list",
    auth.afterLogin,
    productsController.listCategory
  );

  router.get("/users/add-trainer", auth.afterLogin, userController.addTrainer);

  router.get(
    "/users/edit-trainer/:trainerId",
    auth.afterLogin,
    userController.editTrainer
  );

  router.post(
    "/users/create-trainer",
    upload.array("avtar", 4),
    [
      check("name").not().isEmpty().withMessage("Name field is required"),
      check("email")
        .not()
        .isEmpty()
        .withMessage("Email field is required")
        .isEmail()
        .withMessage("Email must be in correct format"),
      check("mobile_number")
        .not()
        .isEmpty()
        .withMessage("Phone number field is required")
        .isNumeric()
        .withMessage("Phone number must be numeric"),
      check("new_password")
        .not()
        .isEmpty()
        .withMessage("New Password field is required"),
      check("confirm_password")
        .not()
        .isEmpty()
        .withMessage("Confirm Password field is required"),
    ],
    auth.afterLogin,
    userController.createTrainer
  );

  router.get(
    "/users/trainers/list",
    auth.afterLogin,
    userController.listTrainers
  );
  
  // ****************** Plans ******************** //


  router.get(
    "/plans/plan/add",
    auth.afterLogin,
    plansController.addPlan
  );
  router.get(
    "/plans/plan/list",
    auth.afterLogin,
    plansController.listPlans
  );

  router.get(
    "/leadschema",
    auth.afterLogin,
    plansController.listLead
  );


  // ******************* Products **************** //


  router.get(
    "/products/product/add",
    auth.afterLogin,
    productsController.addProducts
  );
  router.get(
    "/products/product/edit/:productId",
    auth.afterLogin,
    productsController.editProducts
  );

  router.post(
    "/products/create-product",
    upload.single("avtar"),
    [
      check("name").not().isEmpty().withMessage("Name field is required"),
      check("sku").not().isEmpty().withMessage("Sku field is required"),
      check("price")
        .not()
        .isEmpty()
        .withMessage("Phone number field is required"),
      check("description")
        .not()
        .isEmpty()
        .withMessage("Description field is required"),
      check("category")
        .not()
        .isEmpty()
        .withMessage("Category field is required"),
    ],
    auth.afterLogin,
    productsController.createProduct
  );

  router.post(
    "/products/update-product/:productId",
    upload.single("avtar"),
    [
      check("name").not().isEmpty().withMessage("Name field is required"),
      check("sku").not().isEmpty().withMessage("Sku field is required"),
      check("price")
        .not()
        .isEmpty()
        .withMessage("Phone number field is required"),
      check("description")
        .not()
        .isEmpty()
        .withMessage("Description field is required"),
      check("category")
        .not()
        .isEmpty()
        .withMessage("Category field is required"),
    ],
    auth.afterLogin,
    productsController.updateProduct
  );

  router.get(
    "/products/product/list",
    auth.afterLogin,
    productsController.listProducts
  );


//****************** Meals ******************* //


  router.get(
    "/meals/ingredient/add",
    auth.afterLogin,
    mealsController.ingredients
  );

  router.get(
    "/meals/ingredient/edit/:ingredientId",
    auth.afterLogin,
    mealsController.editIngredients
  );

  router.post(
    "/meals/ingredient/create",
    [check("name").not().isEmpty().withMessage("Ingredient field is required")],
    auth.afterLogin,
    mealsController.createIngredients
  );

  router.get(
    "/meals/ingredients/list",
    auth.afterLogin,
    mealsController.listIngredients
  );

  router.get("/meals/meal/add", auth.afterLogin, mealsController.addMeal);
  router.get("/meals/meal/edit/:mealId", auth.afterLogin, mealsController.editMeal);
  router.post(
    "/meals/create-meal",
    upload.single("avtar"),
    [
      check("category")
        .not()
        .isEmpty()
        .withMessage("Category field is required"),
      check("name")
        .not()
        .isEmpty()
        .withMessage("Name field is required"),
      check("sku")
        .not()
        .isEmpty()
        .withMessage("Sku field is required"),
      check("price")
        .not()
        .isEmpty()
        .withMessage("Phone number field is required"),
      check("description")
        .not()
        .isEmpty()
        .withMessage("Description field is required"),
      check("food_source")
        .not()
        .isEmpty()
        .withMessage("Food Source field is required"),
      check("avtar")
        .custom((value, {req}) => {
          if(!req.file.filename) return false;
          if(req.file.filename) return true;
        })
        .withMessage("Image is required"),
      check("quantity")
        .not()
        .isEmpty()
        .withMessage("Quantity is required"),
      
    ],
    auth.afterLogin,
    mealsController.createMeal
  );

  router.post(
    "/meals/update-meal/:mealId",
    upload.single("avtar"),
    [
      check("name").not().isEmpty().withMessage("Name field is required"),
      check("sku").not().isEmpty().withMessage("Sku field is required"),
      check("price")
        .not()
        .isEmpty()
        .withMessage("Phone number field is required"),
      check("description")
        .not()
        .isEmpty()
        .withMessage("Description field is required"),
    ],
    auth.afterLogin,
    mealsController.updateMeal
  );

  router.get("/meals/meal/list", auth.afterLogin, mealsController.listMeals);

  router.get(
    "/products/coupons/add",
    auth.afterLogin,
    couponsController.coupons
  );


  router.get(
    "/products/coupons/edit/:couponId",
    auth.afterLogin,
    couponsController.editCoupons
  );

  router.post(
    "/products/coupons/create",
    [
      check("coupon").not().isEmpty().withMessage("Coupon field is required"),
      check("discount")
        .not()
        .isEmpty()
        .withMessage("Discount field is required"),
      check("expiry_date")
        .not()
        .isEmpty()
        .withMessage("Expiry Date field is required"),
    ],
    auth.afterLogin,
    couponsController.createCoupons
  );

  router.post(
    "/products/coupons/update/:couponId",
    [
      check("coupon").not().isEmpty().withMessage("Coupon field is required"),
      check("discount")
        .not()
        .isEmpty()
        .withMessage("Discount field is required"),
      check("expiry_date")
        .not()
        .isEmpty()
        .withMessage("Expiry Date field is required"),
    ],
    auth.afterLogin,
    couponsController.updateCoupons
  );

  router.get(
    "/products/coupons/list",
    auth.afterLogin,
    couponsController.listCoupons
  );

  // ---------------------------meals------------------------
  router.get("/meals/category/add", auth.afterLogin, mealsController.category);

  router.get(
    "/meals/category/list",
    auth.afterLogin,
    mealsController.listCategory
  );

  router.post(
    "/meals/category/create",
    upload.single("avtar"),
    [
      check("category")
        .not()
        .isEmpty()
        .withMessage("Category field is required"),
      check("description")
        .not()
        .isEmpty()
        .withMessage("Description field is required"),
    ],
    auth.afterLogin,
    mealsController.createCategory
  );

  // ---------------------------meals------------------------

  // ---------------------------trainer------------------------

  router.get("/user/category/add", auth.afterLogin, userController.category);
  
  // router.get("/user/category/edit/:categoryId", auth.afterLogin, userController.editCategory);

  router.post("/user/category/update/:categoryId",
  upload.single("avtar"),
    [
      check("category")
        .not()
        .isEmpty()
        .withMessage("Category field is required"),
      check("description")
        .not()
        .isEmpty()
        .withMessage("Description field is required"),
    ],
    auth.afterLogin, 
    userController.updateCategory
  )

  router.get(
    "/user/category/list",
    auth.afterLogin,
    userController.listCategory
  );

  router.post(
    "/user/category/create",
    upload.single("avtar"),
    [
      check("category")
        .not()
        .isEmpty()
        .withMessage("Category field is required"),
      check("description")
        .not()
        .isEmpty()
        .withMessage("Description field is required"),
    ],
    auth.afterLogin,
    userController.createCategory
  );

  router.post(
    "/trainer/edit-trainer/:id",
    upload.single("avtar"),
    [
      check("name").not().isEmpty().withMessage("Name field is required"),
      check("email")
        .not()
        .isEmpty()
        .withMessage("Email field is required")
        .isEmail()
        .withMessage("Email must be in correct format"),
      check("mobile_number")
        .not()
        .isEmpty()
        .withMessage("Phone number field is required")
        .isNumeric()
        .withMessage("Phone number must be numeric"),
    ],
    auth.afterLogin,
    userController.updateTrainer
  );

  router.get('/users/delete-trainer/:trainerId',
    auth.afterLogin,
    userController.deleteTrainer
  )

  router.get('/products/delete-product/:productId',
    auth.afterLogin,
    productsController.deleteProduct
  )

  router.get('/meals/delete-meal/:mealId',
    auth.afterLogin,
    mealsController.deleteMeal
  )

  router.get(
    "/products/category/edit/:categoryId",
    auth.afterLogin,
    productsController.categoryEdit
  );

  router.get(
    "/meals/category/edit/:categoryId", 
    auth.afterLogin, 
    mealsController.categoryEdit
  );

  router.get(
    "/user/category/edit/:categoryId", 
    auth.afterLogin, 
    userController.categoryEdit
  );

  router.post(
    "/products/category/update/:categoryId",
    upload.single("avtar"),
    [
      check("category")
        .not()
        .isEmpty()
        .withMessage("Category field is required"),
      check("description")
        .not()
        .isEmpty()
        .withMessage("Description field is required"),
    ],
    auth.afterLogin,
    productsController.updateCategory
  );
  
  router.post(
    "/meals/category/update/:categoryId",
    upload.single("avtar"),
    [
      check("category")
        .not()
        .isEmpty()
        .withMessage("Category field is required"),
      check("description")
        .not()
        .isEmpty()
        .withMessage("Description field is required"),
    ],
    auth.afterLogin,
    mealsController.updateCategory
  );

  router.post(
    "/user/category/update/:categoryId",
    upload.single("avtar"),
    [
      check("category")
        .not()
        .isEmpty()
        .withMessage("Category field is required"),
      check("description")
        .not()
        .isEmpty()
        .withMessage("Description field is required"),
    ],
    auth.afterLogin,
    userController.updateCategory
  );

  router.get('/users/category/delete/:categoryId',
    auth.afterLogin,
    userController.deleteUserCategory
  )
  router.get('/products/category/delete/:categoryId',
    auth.afterLogin,
    productsController.deleteProductCategory
  )
  router.get('/meals/category/delete/:categoryId',
    auth.afterLogin,
    mealsController.deleteMealCategory
  )
  router.get('/meals/ingredient/delete/:ingredientId',
    auth.afterLogin,
    mealsController.deleteIngredient
  )

  router.post(
    "/meals/ingredient/update/:ingredientId",
    [
      check("name")
        .not()
        .isEmpty()
        .withMessage("Category field is required"),
    ],
    auth.afterLogin,
    mealsController.updateIngredient
  );
  
// ***************************** Orders ********************* //

router.get(
  "/orders/meal/list",
  auth.afterLogin,
  (req, res, next) => {
    res.render("order/meal-orders", {
      data: {}
    });
  }
);


router.get(
  "/orders/product/list",
  auth.afterLogin,
  (req, res, next) => {
    res.render("order/product-orders", {
      data: {}
    });
  }
);
  

  // User Section Start //

  router.get("/users/add-user", auth.afterLogin, userController.addUser);

  router.get(
    "/users/edit-user/:trainerId",
    auth.afterLogin,
    userController.editTrainer
  );

  router.post(
    "/users/create-user",
    upload.array("avtar", 4),
    [
      check("name").not().isEmpty().withMessage("Name field is required"),
      check("email")
        .not()
        .isEmpty()
        .withMessage("Email field is required")
        .isEmail()
        .withMessage("Email must be in correct format"),
      check("mobile_number")
        .not()
        .isEmpty()
        .withMessage("Phone number field is required")
        .isNumeric()
        .withMessage("Phone number must be numeric"),
      check("new_password")
        .not()
        .isEmpty()
        .withMessage("New Password field is required"),
      check("confirm_password")
        .not()
        .isEmpty()
        .withMessage("Confirm Password field is required"),
    ],
    auth.afterLogin,
    userController.createTrainer
  );

  router.get(
    "/users/user/list",
    auth.afterLogin,
    userController.listUsers
  );
  

  // ---------------------------trainer------------------------
};
