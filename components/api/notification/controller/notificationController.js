const { validationResult } = require("express-validator");
const User = require("../../../../models/User");
const TrainerCategory = require("../../../../models/TrainerCategory");
const Video = require("../../../../models/Video");
const Notification = require("../../../../models/notification");
const NotificationService = require("../services");
const { getUserDataByToken } = require("../../../../helpers/helper");

module.exports.createNoti = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      let errorsData = { receiverId: "", content: "" };
      if (errors.array().length > 0) {
        errors.array().forEach((value) => {
          errorsData[value.param] = value.msg;
        });
        return res.json({
          status: 400,
          message: "validation error",
          errors: errorsData,
        });
      }
    }

    let bearer_token = req.headers["token"].split(" ")[1];
    var userData = await getUserDataByToken(bearer_token);
    const data = await NotificationService.createNotification(
      userData._id,
      req.body.receiverId,
      req.body.content
    );
    if (data.status != 200) {
      throw new Error(data.message);
    }
    res.send(data);
  } catch (error) {
    console.log("error==========>", error);
    res.send({
      status: 400,
      message: error.message,
      data: {},
    });
  }
};

module.exports.fetchNoti = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      let errorsData = { pageno: "" };
      if (errors.array().length > 0) {
        errors.array().forEach((value) => {
          errorsData[value.param] = value.msg;
        });
        return res.json({
          status: 400,
          message: "validation error",
          errors: errorsData,
        });
      }
    }

    let bearer_token = req.headers["token"].split(" ")[1];
    var userData = await getUserDataByToken(bearer_token);
    const data = await NotificationService.fetchNotification(
      userData._id,
      req.query.pageno
    );
    if (data.status != 200) {
      throw new Error(data.message);
    }
    res.send(data);
  } catch (error) {
    console.log("error==========>", error);
    res.send({
      status: 400,
      message: error.message,
      data: {},
    });
  }
};

module.exports.markNotiRead = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      let errorsData = { notificationId: "" };
      if (errors.array().length > 0) {
        errors.array().forEach((value) => {
          errorsData[value.param] = value.msg;
        });
        return res.json({
          status: 400,
          message: "validation error",
          errors: errorsData,
        });
      }
    }

    
    let bearer_token = req.headers["token"].split(" ")[1];
    var userData = await getUserDataByToken(bearer_token);
    const data = await NotificationService.markRead(req.body.notificationId,userData._id);
    if (data.status != 200) {
      throw new Error(data.message);
    }
    res.send(data);
  } catch (error) {
    console.log("error==========>", error);
    res.send({
      status: 400,
      message: error.message,
      data: {},
    });
  }
};
