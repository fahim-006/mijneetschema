var Category = require("../../../models/Category");
var Product = require("../../../models/Products");
const timestamp = require("time-stamp");
created_date = timestamp.utc("YYYY-MM-DD HH:mm:ss");
const { validationResult } = require("express-validator");
var randomstring = require("randomstring");
var md5 = require("md5");
const ejs = require("ejs");
//var Mail = require('../../../utilities/mail');
var fs = require("fs");
var path = require("path");

/////////////////////////

module.exports.category = (req, res) => {
  if (typeof req.flash("formdata") == "undefined") {
    var formdata = { email: "", password: "" };
    req.flash("formdata", formdata);
  }
  if (req.cookies) {
    var formdata = { email: req.cookies.email, password: req.cookies.password };
    req.flash("formdata", formdata);
  }

  res.render("products/category", {
    formdata: req.flash("formdata"),
    errors: req.flash("errors"),
    reset: req.flash("reset"),
  });
};

module.exports.categoryEdit = async (req, res) => {
  if (typeof req.flash("formdata") == "undefined") {
    var formdata = { email: "", password: "" };
    req.flash("formdata", formdata);
  }

  try {
    let categoryData = await Category.findOne({ _id: req.params.categoryId });
    if (categoryData) {
      formdata.id = categoryData._id;
      formdata.category = categoryData.category;
      formdata.description = categoryData.description;
      formdata.filePath =process.env.URL + "uploads/" + categoryData.category_img;

console.log("foemData==========>",formdata)

      res.render("products/edit-category", {
        formdata: req.flash("formdata"),
        errors: req.flash("errors"),
        reset: req.flash("reset"),
      });
    } else {
      console.log("in else");
      req.flash("errors", "Invalid category Id");
      req.flash("formdata", formdata);
      return res.redirect("/products/category/list");
    }
  } catch (error) {
    console.log("error=======>", error);
    req.flash("errors", "Invalid category Id");
    req.flash("formdata", formdata);
    return res.redirect("/products/category/list");
  }
};

module.exports.createCategory = async (req, res) => {
  let id = req.session.user_data.user_id;
  // Validate request
  var formdata = {
    category: req.body.category,
    description: req.body.description,
  };
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    let errorsData = { category: "" };
    if (errors.array().length > 0) {
      errors.array().forEach((value) => {
        errorsData[value.param] = value.msg;
      });
      req.flash("errors", errorsData);
      req.flash("formdata", formdata);
      return res.redirect("/products/category/add");
    }
  }

  if (!req.body) {
    return res.status(400).send({
      message: "Note content can not be empty",
    });
  }

  $where = { category: req.body.category, added_by: req.body.id };
  var catyExist = await Category.findOne($where).exec();
  if (catyExist) {
    $message = { msg: "Category already exists" };
    req.flash("errors", $message);
  }

  // Create a category
  const Categories = new Category({
    category: req.body.category,
    description: req.body.description,
    added_by: id,
    category_img: req.file.filename,
    created_at: created_date,
    updated_at: created_date,
  });

  Categories.save()
    .then((data) => {
      $message = { msg: "Category added successfully" };
      req.flash("errors", $message);
      return res.redirect("/products/category/add");
    })
    .catch((err) => {
      $errors = { message: "Something went wrong!" };
      req.flash("errors", $errors);
      req.flash("formdata", formdata);
      return res.redirect("/products/category/add");
    });
};

module.exports.listCategory = (req, res) => {
  Category.find({isDeleted:false},function (err, categoryObj) {
    if (err) {
      let err = err;
      res.render("pages/err", { err });
    } else {
      let data = categoryObj;
      if (data.length) {
        return res.render("products/category-list", {
          data,
          baseUrl: process.env.URL,
          errors: req.flash("errors"),
          message: req.flash("message"),
        });
      }
      if (!data.length) {
        return res.render("products/category-list", {
          data,
          baseUrl: process.env.URL,
          added: "No data is available",
          message: req.flash("message"),
          errors: req.flash("errors"),
          success: req.flash("success"),
        });
      }
    }
  });
};

module.exports.addProducts = (req, res) => {
  let id = req.session.user_data.user_id;
  console.log(id);
  if (typeof req.flash("formdata") == "undefined") {
    var formdata = {
      name: "",
      description: "",
      sku: "",
      price: "",
      category: "",
    };
    req.flash("formdata", formdata);
  }
  Category.find(function (err, result) {
    if (err) {
      console.log(err);
      $message = { message: "Error occured" };
      req.flash("errors", $message);
    } else {
      if (result) {
        res.render("products/products", {
          formdata: req.flash("formdata"),
          categoryData: result,
          errors: req.flash("errors"),
          reset: req.flash("reset"),
          success: req.flash("success"),
        });
      }
    }
  });
};

module.exports.editProducts = (req, res) => {
  let id = req.session.user_data.user_id;
  console.log(id);
  if (typeof req.flash("formdata") == "undefined") {
    var formdata = {
      name: "",
      description: "",
      sku: "",
      price: "",
      category: "",
    };
    req.flash("formdata", formdata);
  }
  console.log("req.params======>", req.params.productId);

  Product.findOne({ _id: req.params.productId }, function (
    err,
    productDataResult
  ) {
    if (err) {
      console.log(err);
      $message = { message: "Error occured" };
      req.flash("errors", $message);
    } else {
      console.log("productDataResult======>", productDataResult);
      var productData = productDataResult;

      Category.find(function (err, result) {
        if (err) {
          console.log(err);
          $message = { message: "Error occured" };
          req.flash("errors", $message);
        } else {
          formdata.name = productData.name;
          formdata.description = productData.description;
          formdata.sku = productData.sku;
          formdata.price = productData.price;
          formdata.category = productData.category_id;
          formdata.filePath =
            process.env.URL + "uploads/" + productData.product_img;
          formdata.featured = productData.featured;
          formdata.id = productData._id;

          if (result) {
            res.render("products/edit-products", {
              formdata: req.flash("formdata"),
              categoryData: result,
              errors: req.flash("errors"),
              reset: req.flash("reset"),
              success: req.flash("success"),
            });
          }
        }
      });
    }
  });
};

module.exports.createProduct = (req, res) => {
  let id = req.session.user_data.user_id;
  // Validate request
  var formdata = {
    name: "",
    description: "",
    sku: "",
    price: "",
    category: "",
  };
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    let errorsData = {
      name: "",
      description: "",
      sku: "",
      price: "",
      category: "",
    };
    if (errors.array().length > 0) {
      errors.array().forEach((value) => {
        errorsData[value.param] = value.msg;
      });
      req.flash("errors", errorsData);
      req.flash("formdata", formdata);
      return res.redirect("/products/product/add");
    }
  }

  if (!req.body) {
    return res.status(400).send({
      message: "Note content can not be empty",
    });
  }

  // Create a User
  const Products = new Product({
    name: req.body.name,
    category_id: req.body.category,
    added_by: id,
    sku: req.body.sku,
    price: req.body.price,
    description: req.body.description,
    product_img: req.file.filename,
    featured:
      req.body.featured !== "undefined" && req.body.featured === "1"
        ? true
        : false,
    created_at: created_date,
    updated_at: created_date,
  });

  Products.save()
    .then((data) => {
      $message = { msg: "Product added successfully" };
      req.flash("errors", $message);
      return res.redirect("/products/product/add");
    })
    .catch((err) => {
      $errors = { message: "Something went wrong!" };
      req.flash("errors", $errors);
      req.flash("formdata", formdata);
      return res.redirect("/products/product/add");
    });
};

module.exports.updateProduct = (req, res) => {
  console.log("req.body =========>", req.body);
  console.log("req.params =========>", req.params);
  console.log("req.file =========>", req.file);

  let id = req.session.user_data.user_id;
  // Validate request
  var formdata = {
    name: "",
    description: "",
    sku: "",
    price: "",
    category: "",
  };
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    let errorsData = {
      name: "",
      description: "",
      sku: "",
      price: "",
      category: "",
    };
    if (errors.array().length > 0) {
      errors.array().forEach((value) => {
        errorsData[value.param] = value.msg;
      });
      req.flash("errors", errorsData);
      req.flash("formdata", formdata);
      return res.redirect(`/products/product/edit/${req.params.productId}`);
    }
  }

  if (!req.body) {
    return res.status(400).send({
      message: "Note content can not be empty",
    });
  }

  let query = {
    _id: req.params.productId,
  };
  let options = {
    returnNewDocument: true,
  };
  let newData = {
    name: req.body.name,
    category_id: req.body.category,
    sku: req.body.sku,
    price: req.body.price,
    description: req.body.description,
    featured:
      req.body.featured !== "undefined" && req.body.featured === "1"
        ? true
        : false,
    updated_at: created_date,
  };
  if (req.file) {
    newData.product_img = req.file.filename;
  }

  Product.findOneAndUpdate(query, newData, options)
    .then((data) => {
      console.log("updated dat===========", data);
      $message = { msg: "Product updated successfully" };
      req.flash("errors", $message);
      return res.redirect(`/products/product/edit/${req.params.productId}`);
    })
    .catch((err) => {
      $errors = { message: "Something went wrong!" };
      req.flash("errors", $errors);
      req.flash("formdata", formdata);
      return res.redirect(`/products/product/edit/${req.params.productId}`);
    });
};

module.exports.listProducts = async (req, res) => {
  console.log("--------listProducts--------");
  let id = req.session.user_data.user_id;
  const data = await Product.find()
    .where({ added_by: id, isDeleted: false })
    .populate("category_id");

  console.log("--------listProducts--------", data);

  if (!data) {
    return res.render("products/product-list", {
      data,
      baseUrl: process.env.URL,
      added: "No data is available",
      message: req.flash("message"),
      errors: req.flash("errors"),
      success: req.flash("success"),
    });
  } else {
    console.log(data);
    return res.render("products/product-list", {
      data,
      baseUrl: process.env.URL,
      errors: req.flash("errors"),
      message: req.flash("message"),
    });
  }
};

module.exports.deleteProduct = async (req, res) => {
  console.log("-----------deleteProduct---------");
  let query = {
    _id: req.params.productId,
  };
  let newData = {
    isDeleted: true,
    updated_at: created_date,
  };
  options = {
    returnNewDocument: true,
  };
  Product.findOneAndUpdate(query, newData, options)
    .then((data) => {
      console.log("updated data------------->", data);
      $message = { msg: "Product Deleted successfully" };
      req.flash("errors", $message);
      return res.redirect(`/products/product/list`);
    })
    .catch((error) => {
      console.log("error==========>", error.message);
      $errors = { msg: "Something went wrong!" };
      req.flash("errors", $errors);
      return res.redirect(`/products/product/list`);
    });
};

module.exports.updateCategory = (req, res) => {
  console.log("req.body =========>", req.body);
  console.log("req.params =========>", req.params);
  console.log("req.file =========>", req.file);

  let id = req.session.user_data.user_id;
  var formdata = {
    category: req.body.category,
    description: req.body.description,
  };
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    let errorsData = { category: "" };
    if (errors.array().length > 0) {
      errors.array().forEach((value) => {
        errorsData[value.param] = value.msg;
      });
      req.flash("errors", errorsData);
      req.flash("formdata", formdata);
      return res.redirect(`/products/category/edit/${req.params.categoryId}`);
    }
  }

  let query = {
    _id: req.params.categoryId,
  };
  let options = {
    returnNewDocument: true,
  };
  let newData = {
    updated_at: created_date,
    category: req.body.category,
    description: req.body.description,
  };
  if (req.file) {
    newData.category_img = req.file.filename;
  }
 

  Category.findOneAndUpdate(query, newData, options)
    .then((data) => {
      console.log("updated dat===========", data);
      $message = { msg: "Category updated successfully" };
      req.flash("errors", $message);
      return res.redirect(`/products/category/edit/${req.params.categoryId}`);
    })
    .catch((err) => {
      $errors = { message: "Something went wrong!" };
      req.flash("errors", $errors);
      req.flash("formdata", formdata);
      return res.redirect(`/products/category/edit/${req.params.categoryId}`);
    });
  
};

module.exports.deleteProductCategory = async (req, res) => {
  console.log("-----------deleteProductCategory---------");
  let query = {
    _id: req.params.categoryId,
  };
  let newData = {
    isDeleted: true,
    updated_at: created_date,
  };
  options = {
    returnNewDocument: true,
  };
  Category.findOneAndUpdate(query, newData, options)
    .then((data) => {
      console.log("updated data------------->", data);
      $message = { msg: "Product category deleted successfully" };
      req.flash("errors", $message);
      return res.redirect(`/products/category/list`);
    })
    .catch((error) => {
      console.log("error==========>", error.message);
      $errors = { msg: "Something went wrong!" };
      req.flash("errors", $errors);
      return res.redirect(`/products/category/list`);
    });
};

