const authController = require("./../controller/authController");
const calculatorController = require("./../controller/calculatorController");
const userController = require("../controller/usersController");
const token = require("./../../../../utilities/verify_token");
const { check, query } = require("express-validator");
const multer = require("multer");
//var up = multer();
var path = require("path");
const DIR = "./public/uploads";

//app.use(up.array());
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
    "/api/users/register",
    [
      check("email")
        .not()
        .isEmpty()
        .withMessage("Email field is required")
        .isEmail()
        .withMessage("Email must be in correct format"),
      check("name").not().isEmpty().withMessage("Name field is required"),
      check("mobile_number")
        .not()
        .isEmpty()
        .withMessage("Phone number field is required"),
      check("role").not().isEmpty().withMessage("Role field is required"),
      check("password")
        .not()
        .isEmpty()
        .withMessage("Password field is required"),
    ],
    authController.registerUser
  );

  router.post(
    "/api/users/register-trainer",
    [
      check("email")
        .not()
        .isEmpty()
        .withMessage("Email field is required")
        .isEmail()
        .withMessage("Email must be in correct format"),
      check("name").not().isEmpty().withMessage("Name field is required"),
      check("mobile_number")
        .not()
        .isEmpty()
        .withMessage("Phone number field is required"),
      check("role").not().isEmpty().withMessage("Role field is required"),
      check("password")
        .not()
        .isEmpty()
        .withMessage("Password field is required"),
      check("address").not().isEmpty().withMessage("Address field is required"),
      check("latitude").not().isEmpty().withMessage("Latitude  is required"),
      check("longitude").not().isEmpty().withMessage("Longitude  is required"),
      check("job_role")
        .not()
        .isEmpty()
        .withMessage("Job role field is required"),
    ],
    authController.registerTrainer
  );

  router.post(
    "/api/users/updateUser",
    [
      check("name").not().isEmpty().withMessage("Name field is required"),
      check("mobile_number")
        .not()
        .isEmpty()
        .withMessage("Phone number field is required"),
    ],
    token.verifyToken,
    authController.updateUser
  );

  

  router.post(
    "/api/users/login",
    [
      check("email")
        .not()
        .isEmpty()
        .withMessage("Email field is required")
        .isEmail()
        .withMessage("Email must be in correct format"),
      check("role").not().isEmpty().withMessage("Role field is required"),
      check("password")
        .not()
        .isEmpty()
        .withMessage("Password field is required"),
    ],
    authController.login
  );

  router.post(
    "/api/users/calculator",
    [
      check("gender").not().isEmpty().withMessage("Gender field is required"),
      check("userId").not().isEmpty().withMessage("userId field is required"),
      check("target").not().isEmpty().withMessage("Target field is required"),
      check("physical_activity")
        .not()
        .isEmpty()
        .withMessage("Physical Activity number field is required"),
      check("meat_products")
        .not()
        .isEmpty()
        .withMessage("Meat Products field is required"),
      check("vegetables")
        .not()
        .isEmpty()
        .withMessage("Vegitables field is required"),
      check("fruits").not().isEmpty().withMessage("Fruits field is required"),
      check("other_products")
        .not()
        .isEmpty()
        .withMessage("Other Products field is required"),
      check("allergies_intolerances")
        .not()
        .isEmpty()
        .withMessage("Allergies field is required"),
      check("personal_mesurement")
        .not()
        .isEmpty()
        .withMessage("Personal Mesurement field is required"),
      check("dailyPerfect")
        .not()
        .isEmpty()
        .withMessage("dailyPerfect field is required"),
      check("basalMetabolic")
        .not()
        .isEmpty()
        .withMessage("basalMetabolic field is required"),
    ],
    calculatorController.calculatorSave
  );

  // *************** External calculation lead data ****************
  router.post(
    "/api/users/leaddata",
    [
      check("gender").not().isEmpty().withMessage("Gender field is required"),
      check("target").not().isEmpty().withMessage("Target field is required"),
      check("physical_activity")
        .not()
        .isEmpty()
        .withMessage("Physical Activity number field is required"),
      check("meat_products")
        .not()
        .isEmpty()
        .withMessage("Meat Products field is required"),
      check("vegetables")
        .not()
        .isEmpty()
        .withMessage("Vegitables field is required"),
      check("fruits").not().isEmpty().withMessage("Fruits field is required"),
      check("other_products")
        .not()
        .isEmpty()
        .withMessage("Other Products field is required"),
      check("allergies_intolerances")
        .not()
        .isEmpty()
        .withMessage("Allergies field is required"),
      check("personal_mesurement")
        .not()
        .isEmpty()
        .withMessage("Personal Mesurement field is required"),
    ],
    calculatorController.leadSave
  );

  router.post(
    "/api/users/add-video",
    upload_file_all.single("video"),
    [
      check("video_type")
        .not()
        .isEmpty()
        .withMessage("Video type field is required"),
    ],
    token.verifyToken,
    authController.addVideo
  );

  router.post(
    "/api/users/update-video/:videoId",
    upload_file_all.single("video"),
    [
      check("video_type")
        .not()
        .isEmpty()
        .withMessage("Video type field is required"),
    ],
    token.verifyToken,
    authController.updateVideo
  );

  router.get(
    "/api/users/list-video",
    token.verifyToken,
    authController.listVideo
  );

  router.post(
    "/api/users/subscription-payment",
    [
      check("price").not().isEmpty().withMessage("Price field is required"),
      check("description")
        .not()
        .isEmpty()
        .withMessage("Description field is required"),
    ],
    authController.subscriptionPayment
  );

  router.post(
    "/api/users/subscription-complete",
    [
      check("payment_id")
        .not()
        .isEmpty()
        .withMessage("Payment Id field is required"),
      check("user_id").not().isEmpty().withMessage("User Id field is required"),
      check("plan_name")
        .not()
        .isEmpty()
        .withMessage("Plan Name field is required"),
      check("start_date")
        .not()
        .isEmpty()
        .withMessage("Start date field is required"),
      check("end_date")
        .not()
        .isEmpty()
        .withMessage("End date field is required"),
      check("payment_amount")
        .not()
        .isEmpty()
        .withMessage("Payment amount field is required"),
    ],
    authController.subscriptionComplete
  );

  router.post(
    "/api/users/dierplan-payment",
    [
      check("price").not().isEmpty().withMessage("Price field is required"),
      check("description")
        .not()
        .isEmpty()
        .withMessage("Description field is required"),
    ],
    authController.dierplanPayment
  );

  router.post(
    "/api/users/dierplan-payment-complete",
    [
      // check("user_id").not().isEmpty().withMessage("User Id field is required"),
      check("method_name")
        .not()
        .isEmpty()
        .withMessage("Method Name field is required"),
    ],
    authController.dierplanPaymentComplete
  );

  router.get("/api/users/fetch-trainer", userController.fetchTrainers);

  router.get(
    "/api/users/fetch-trainer-categories",
    userController.fetchTrainerCategories
  );

  router.get(
    "/api/users/fetch-trainer-video",
    [
      query("trainerId")
        .not()
        .isEmpty()
        .withMessage("trainerId field is required"),
      query("pageNo").not().isEmpty().withMessage("pageNo field is required"),
    ],
    userController.fetchTrainerVideo
  );

  router.get(
    "/api/fetch-calculator",
    token.verifyToken,
    calculatorController.fetchCalculator
  );

  router.get(
    "/api/users/delete-trainer-video/:videoId",
    token.verifyToken,
    userController.deleteVideo
  );
};
