var Category = require("../../../models/Category");
var Product = require("../../../models/Products");
var Coupons = require("../../../models/Coupons");
const timestamp = require("time-stamp");
created_date = timestamp.utc("YYYY-MM-DD HH:mm:ss");
const { validationResult } = require("express-validator");
var randomstring = require("randomstring");
var md5 = require("md5");
const ejs = require("ejs");
//var Mail = require('../../../utilities/mail');
var fs = require("fs");
var path = require("path");
var dateFormat = require("dateformat");
const moment = require("moment");

module.exports.coupons = (req, res) => {
  if (typeof req.flash("formdata") == "undefined") {
    var formdata = { coupon: "", discount: "", expiry_date: "" };
    req.flash("formdata", formdata);
  }

  res.render("coupons/coupon", {
    formdata: req.flash("formdata"),
    errors: req.flash("errors"),
    success: req.flash("success"),
    reset: req.flash("reset"),
  });
};

module.exports.editCoupons = async (req, res) => {
  var formdata = {};
  if (typeof req.flash("formdata") == "undefined") {
    formdata = {
      coupon: "",
      discount: "",
      expiry_date: "",
    };
    req.flash("formdata", formdata);
  }
  console.log("");
  $where = { _id: req.params.couponId };

  var couponExist = await Coupons.findOne($where).exec();
  console.log("couponExist============>", couponExist);
  if (!couponExist) {
    req.flash("errors", "Invalid coupon");
    req.flash("formdata", formdata);
    return res.redirect(`/products/coupons/list`);
  } else {
    console.log("couponExist._id=============", couponExist._id, couponExist);
    // let formdata={};
    (formdata.id = couponExist._id),
      (formdata.coupon = couponExist.coupon),
      (formdata.discount = couponExist.discount),
      (formdata.expiry_date = moment(couponExist.expiry_date).format(
        "YYYY-MM-DD"
      ));

    res.render(`coupons/edit-coupon`, {
      formdata: req.flash("formdata"),
      errors: req.flash("errors"),
      success: req.flash("success"),
      reset: req.flash("reset"),
    });
  }
};

module.exports.createCoupons = async (req, res) => {
  // Validate request
  var formdata = {
    coupon: req.body.coupon,
    discount: req.body.discount,
    expiry_date: req.body.expiry_date,
  };
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    let errorsData = { coupon: "", discount: "", expiry_date: "" };
    if (errors.array().length > 0) {
      errors.array().forEach((value) => {
        errorsData[value.param] = value.msg;
      });
      req.flash("errors", errorsData);
      req.flash("formdata", formdata);
      return res.redirect("/products/coupons/add");
    }
  }

  $where = { coupon: req.body.coupon };
  var couponExist = await Coupons.findOne($where).exec();
  if (couponExist) {
    $message = { msg: "coupon already exist" };
    req.flash("errors", $message);
    return res.redirect("/products/coupons/add");
  }

  if (req.body.expiry_date < created_date) {
    $message = { msg: "Expiry date must be greater than today" };
    req.flash("errors", $message);
    return res.redirect("/products/coupons/add");
  }

  // Create a category
  const Coupon = new Coupons({
    coupon: req.body.coupon,
    discount: req.body.discount,
    expiry_date: req.body.expiry_date,
    created_at: created_date,
    updated_at: created_date,
  });

  Coupon.save()
    .then((data) => {
      console.log("issue issue");
      $message = { msg: "Coupon added successfully" };
      req.flash("success", $message);
      return res.redirect("/products/coupons/add");
    })
    .catch((err) => {
      console.log(err);
      $errors = { msg: "Something went wrong!" };
      req.flash("errors", $errors);
      req.flash("formdata", formdata);
      return res.redirect("/products/coupons/add");
    });
};

module.exports.updateCoupons = async (req, res) => {
  console.log("updateTrainer body============>", req.body);
  console.log("updateTrainer params============>", req.params);
  console.log("updateTrainer file============>", req.file);
  // Validate request
  var formdata = {
    coupon: req.body.coupon,
    discount: req.body.discount,
    expiry_date: req.body.expiry_date,
  };
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    let errorsData = { coupon: "", discount: "", expiry_date: "" };
    if (errors.array().length > 0) {
      errors.array().forEach((value) => {
        errorsData[value.param] = value.msg;
      });
      req.flash("errors", errorsData);
      req.flash("formdata", formdata);
      return res.redirect(`/products/coupons/edit/${req.params.couponId}`);
    }
  }

  $where = {
    coupon: req.body.coupon._id,
    _id: { $ne: req.params.couponId },
  };
  var couponExist = await Coupons.findOne($where).exec();

  console.log("couponExist body============>", couponExist);
  if (couponExist) {
    $message = { msg: "coupon already exist" };
    req.flash("errors", $message);
    req.flash("formdata", formdata);
    return res.redirect(`/products/coupons/edit/${req.params.couponId}`);
  }

  if (req.body.expiry_date < created_date) {
    $message = { msg: "Expiry date must be greater than today" };
    req.flash("errors", $message);
    return res.redirect(`/products/coupons/edit/${req.params.couponId}`);
  }

  // Create a category
  // const Coupon = new Coupons({
  //   coupon: req.body.coupon,
  //   discount: req.body.discount,
  //   expiry_date: req.body.expiry_date,
  //   created_at: created_date,
  //   updated_at: created_date,
  // });

  let query = {
    _id: req.params.couponId,
  };
  let options = {
    returnNewDocument: true,
  };
  let newData = {
    coupon: req.body.coupon,
    discount: req.body.discount,
    expiry_date: req.body.expiry_date,
    updated_at: created_date,
  };
  Coupons.findOneAndUpdate(query, newData, options)
    .then((data) => {
      console.log("updated Dta----------->", data);
      $message = { msg: "Coupon updated successfully" };
      req.flash("success", $message);
      return res.redirect(`/products/coupons/edit/${req.params.couponId}`);
    })
    .catch((err) => {
      console.log(err);
      $errors = { msg: "Something went wrong!" };
      req.flash("errors", $errors);
      req.flash("formdata", formdata);
      return res.redirect(`/products/coupons/edit/${req.params.couponId}`);
    });
};

module.exports.listCoupons = (req, res) => {
  Coupons.find(function (err, couponObj) {
    if (err) {
      let err = err;
      res.render("pages/err", { err });
    } else {
      let data = couponObj;
      if (data.length) {
        return res.render("coupons/coupon-list", {
          data,
          errors: req.flash("errors"),
          baseUrl: process.env.URL,
          message: req.flash("message"),
          dateFormat,
        });
      }
      if (!data.length) {
        return res.render("coupons/coupon-list", {
          data,
          added: "No data is available",
          message: req.flash("message"),
          baseUrl: process.env.URL,
          errors: req.flash("errors"),
          success: req.flash("success"),
          dateFormat,
        });
      }
    }
  });
};
