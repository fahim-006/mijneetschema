const productsController = require("./../controller/productsController");
const token = require("./../../../../utilities/verify_token");
const { check, body, checkSchema } = require("express-validator");
const multer = require("multer");
//var up = multer();
var path = require("path");
//app.use(up.array());
const DIR = "./public/uploads";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    console.log("file==", file);
    cb(
      null,
      file.fieldname + "-" + Date.now() + "." + file.mimetype.split("/")[1]
    );
  },
});
/* defined filter */
const imageFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    // req['a'] ={ 'msg':'File format '}
    req.fileValidationError = "File format should be PNG,JPG,JPEG";
    return cb(null, false);
  }
};

const csvFilter = (req, file, cb) => {
  if (file.mimetype === "text/csv") {
    cb(null, true);
  } else {
    req.fileValidationError = "File format should be CVS";
    return cb(null, false);
  }
};
const upload = multer({ storage: storage, fileFilter: imageFilter });
const upload_file_all = multer({ storage: storage });
const upload_file = multer({ storage: storage, fileFilter: csvFilter });

module.exports = (router) => {
  router.post(
    "/api/products/add-category",
    [
      check("category")
        .not()
        .isEmpty()
        .withMessage("Category field is required"),
    ],
    token.verifyToken,
    productsController.createCategory
  );

  router.post(
    "/api/products/create-product",
    upload.single("image"),
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
    token.verifyToken,
    productsController.createProduct
  );

  router.post(
    "/api/products/update-product/:productId",
    upload.single("image"),
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
    token.verifyToken,
    productsController.updateProduct
  );

  router.get(
    "/api/products/delete-product/:productId",
    token.verifyToken,
    productsController.deleteProduct
  );

  router.get(
    "/api/products/list-products/:page_no",
    token.verifyToken,
    productsController.listProducts
  );

  router.get("/api/products/list-category", productsController.listCategory);
  router.post(
    "/api/products/list-category-bylimit",
    [check("limit").not().isEmpty().withMessage("limit is required")],
    productsController.listCategoryByLimit
  );

  router.post(
    "/api/products/list-all-products",
    [check("page_no").not().isEmpty().withMessage("Page number is required")],
    productsController.listAllProducts
  );
  router.post(
    "/api/products/list-all-products-bylimit",
    [check("limit").not().isEmpty().withMessage("Limit is required")],
    productsController.listAllProductsByLimit
  );

  router.post(
    "/api/products/list-all-products-bycat",
    [
      check("page_no").not().isEmpty().withMessage("Page number is required"),
      check("category").not().isEmpty().withMessage("Category_id is required"),
    ],
    productsController.listAllProductsByCat
  );

  router.get(
    "/api/products/list-featured-products",
    productsController.listFeaturedProducts
  );
  router.post(
    "/api/products/list-single-product",
    productsController.listSingleProduct
  );

  router.post(
    "/api/products/add-wish",
    [
      check("product_id")
        .not()
        .isEmpty()
        .withMessage("Product field is required"),
      checkSchema({
        product_type: {
          in: "body",
          matches: {
            options: [/\b(?:Meals|Products)\b/],
            errorMessage:
              "Invalid product_type: must be from (Meals, Products)",
          },
        },
      }),
    ],
    token.verifyToken,
    productsController.createWishlist
  );

  router.post(
    "/api/products/remove-wish",
    [
      check("product_id")
        .not()
        .isEmpty()
        .withMessage("Product field is required"),
    ],
    token.verifyToken,
    productsController.removeWishlist
  );

  router.post(
    "/api/products/list-wish-products",
    [check("page_no").not().isEmpty().withMessage("Page number is required")],
    token.verifyToken,
    productsController.listWishProducts
  );
  router.post(
    "/api/products/check-coupon",
    [check("coupon").not().isEmpty().withMessage("Coupon field is required")],
    productsController.checkCoupon
  );

  router.post(
    "/api/products/create-rating",
    [
      check("rating").not().isEmpty().withMessage("Rating field is required"),
      check("product_id")
        .not()
        .isEmpty()
        .withMessage("Product Id field is required"),
      checkSchema({
        product_type: {
          in: "body",
          matches: {
            options: [/\b(?:Meals|Products|User)\b/],
            errorMessage:
              "Invalid product_type: must be from (Meals,Products,User)",
          },
        },
      }),
      check("reviews").not().isEmpty().withMessage("Reviews field is required"),
    ],
    token.verifyToken,
    productsController.createRating
  );

  router.post(
    "/api/products/list-rating",
    [
      check("product_id")
        .not()
        .isEmpty()
        .withMessage("Product Id field is required"),
    ],
    productsController.listRating
  );
};
