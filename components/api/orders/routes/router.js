const ordersController = require('./../controller/ordersController');
const token = require('./../../../../utilities/verify_token');
const { check } = require ('express-validator');
const multer = require('multer');
//var up = multer();
const DIR = "./public/uploads";

var path = require('path');
//app.use(up.array());
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
     cb(null, DIR)
    },
    filename: (req, file, cb) => {
      console.log("file==",file)
     cb(null, file.fieldname + '-' + Date.now() + '.'+ file.mimetype.split('/')[1])
    }
});
/* defined filter */
const imageFilter = (req, file, cb) => 
{
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
   // req['a'] ={ 'msg':'File format '}
    req.fileValidationError = 'File format should be PNG,JPG,JPEG';
       return  cb(null, false); 
  }
};

const csvFilter = (req, file, cb) => {
  if (file.mimetype === "text/csv" ) {
    cb(null, true);
  } else {
     req.fileValidationError = 'File format should be CVS';
       return  cb(null, false); 
  }
};
const upload = multer({storage: storage,fileFilter: imageFilter});
const upload_file_all = multer({storage: storage});
const upload_file = multer({storage: storage, fileFilter: csvFilter});

module.exports = (router)=>
{
  
        router.post('/api/orders/payment', [
          check('address').not().isEmpty().withMessage("Address field is required"),
          check('email').not().isEmpty().withMessage("Email field is required"),
          check('contact_no').not().isEmpty().withMessage("Contact number field is required"),
          check('name').not().isEmpty().withMessage("Name field is required"),
          check('total').not().isEmpty().withMessage("Total field is required")
          ], ordersController.ordersPayment);
      

          router.post('/api/orders/payment-complete', [
            check('address').not().isEmpty().withMessage("Address field is required"),
            check('email').not().isEmpty().withMessage("Email field is required"),
            check('contact_no').not().isEmpty().withMessage("Contact number field is required"),
            check('name').not().isEmpty().withMessage("Name field is required"),
            check('total').not().isEmpty().withMessage("Name field is required"),
            check('payment_id').not().isEmpty().withMessage("Payment id field is required"),
            check('amount_without_tax').not().isEmpty().withMessage("Amount without tax field is required"),
            check('amount_with_tax').not().isEmpty().withMessage("Amount with tax field is required"),
            check('pincode').not().isEmpty().withMessage("Pincode field is required"),
            check('landmark').not().isEmpty().withMessage("Landmark field is required"),
            check('state').not().isEmpty().withMessage("State field is required"),
            check('city').not().isEmpty().withMessage("city field is required"),
            check('user_id').not().isEmpty().withMessage("User Id field is required"),
            check('couponCode').exists().withMessage("couponCode field is required")
    ], ordersController.ordersPaymentComplete); 
    
    router.get('/api/order',
      token.verifyToken,
      ordersController.fetchOrder
    )

    router.get('/api/remove-order',
      token.verifyToken,
      ordersController.removeOrder
    )

    router.get('/api/testEmail/:orderId',
      ordersController.testEmail
    )
}
