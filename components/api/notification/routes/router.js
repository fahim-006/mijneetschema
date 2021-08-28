const { check,query,body } = require("express-validator");
const notificationController = require("../controller/notificationController");
const token = require("./../../../../utilities/verify_token");

module.exports = (router) => {
  
  router.post(
    "/api/notification/create-notification",[
      body("receiverId").not().isEmpty().withMessage("receiverId field is required"),
      body("content").not().isEmpty().withMessage("content field is required")
    ],
    token.verifyToken,
    notificationController.createNoti
  );

  router.get(
    "/api/notification/fetch-notification",[
      query("pageno").not().isEmpty().withMessage("pageno field is required"),
    ],
    token.verifyToken,
    notificationController.fetchNoti
  );

  router.post(
    "/api/notification/mark-notification-read",[
      body("notificationId").not().isEmpty().withMessage("receiverId field is required"),
    ],
    token.verifyToken,
    notificationController.markNotiRead
  );

};
