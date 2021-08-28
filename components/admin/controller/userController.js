var User = require("../../../models/User");
var TrainerCategory = require("../../../models/TrainerCategory");
const timestamp = require("time-stamp");
created_date = timestamp.utc("YYYY-MM-DD HH:mm:ss");
const { validationResult } = require("express-validator");
var randomstring = require("randomstring");
var md5 = require("md5");
const ejs = require("ejs");
//var Mail = require('../../../utilities/mail');
var fs = require("fs");
var path = require("path");
var generate_token = require("../../../utilities/rest");
const { user } = require("../../../helpers/admin/auth");

/////////////////////////

module.exports.editUser = (req, res) => {
  let id = req.session.user_data.user_id;
  User.findOne({ _id: id }, function (err, user) {
    if (err) {
      $message = { msg: "Something went wrong" };
      req.flash("errors", $message);
      return res.redirect("/institution/editInstitution");
    } else {
      let data = user;
      //const filePath = req.protocol + "://" + req.hostname +':3000' + '/' + 'uploads/' + data.profile_img;
      const filePath = process.env.URL + "uploads/" + data.profile_img;
      console.log("kjhjkh", req.flash("errors"));
      res.render("user/editUser", {
        errors: req.flash("errors"),
        id,
        img: filePath,
        email: data.email,
        name: data.fullname,
        mobileNumber: data.mobile_number,
      });
    }
  });
};
module.exports.updateUser = (req, res) => {
  let id = req.params.id;
  ///////////// Validate request//////////////////////////
  const errors = validationResult(req);

  let errorsData = { name: "", phone: "" };
  if (errors.array().length > 0) {
    errors.array().forEach((value) => {
      errorsData[value.param] = value.msg;
    });

    req.flash("errors", errorsData);
    return res.redirect("/user/edit-admin");
  }
  ////////////////////////////////////////////////////////////
  if (!req.body) {
    return res.status(400).send({
      message: "Note content can not be empty",
    });
  }
  if (req.file) {
    var where = {
      fullname: req.body.name,
      mobile_number: req.body.phone,
      profile_img: req.file.filename,
    };
  } else {
    var where = { fullname: req.body.name, mobile_number: req.body.phone };
  }
  User.findByIdAndUpdate({ _id: id }, where, { new: true }, function (
    err,
    result
  ) {
    if (err) {
      $message = { msg: "Something went wrong" };
      req.flash("errors", $message);
      return res.redirect("/user/edit-admin");
    } else {
      req.session.user_data = {
        user_id: result._id,
        profile_img: result.profile_img,
        fullname: result.fullname,
      };
      $message = { msg: "User updated successfully" };
      req.flash("errors", $message);
      return res.redirect("/user/edit-admin");
    }
  });
};
////////////////////////
module.exports.resetPassword = (req, res) => {
  res.render("user/resetPassword", {
    errors: req.flash("errors"),
    success: req.flash("success"),
  });
};

module.exports.updatePassword = (req, res) => {
  let id = req.session.user_data.user_id;
  ///////////// Validate request//////////////////////////
  const errors = validationResult(req);

  let errorsData = { old_password: "", new_password: "", confirm_password: "" };
  if (errors.array().length > 0) {
    errors.array().forEach((value) => {
      errorsData[value.param] = value.msg;
    });
    req.flash("errors", errorsData);
    return res.redirect("/user/reset-password");
  }
  if (req.body.new_password != req.body.confirm_password) {
    $message = {
      message: "New password and confirm password must be matched!",
    };
    req.flash("errors", $message);
    return res.redirect("/user/reset-password");
  }
  ////////////////////////////////////////////////////////////
  if (!req.body) {
    return res.status(400).send({
      message: "Note content can not be empty",
    });
  }
  $where = { password: md5(req.body.old_password) };
  User.findOne($where, function (err, user) {
    if (user) {
      //update Password of institute
      User.findByIdAndUpdate(
        { _id: id },
        { password: md5(req.body.confirm_password) },
        function (err, result) {
          if (err) {
            $message = { msg: "Something went wrong" };
            req.flash("errors", $message);
            return res.redirect("/user/reset-password");
          } else {
            $success = { message: "Password changed successfully!" };
            req.flash("success", $success);
            return res.redirect("/user/reset-password");
          }
        }
      );
    } else {
      $errors = { message: "Old password must be matched!" };
      req.flash("errors", $errors);
      return res.redirect("/user/reset-password");
    }
  });
};

module.exports.addTrainer = (req, res) => {
  if (typeof req.flash("formdata") == "undefined") {
    var formdata = { email: "", password: "", name: "", mobile_number: "" };
    req.flash("formdata", formdata);
  }

  TrainerCategory.find(function (err, result) {
    if (err) {
      console.log(err);
      $message = { message: "Error occured" };
      req.flash("errors", $message);
    } else {
      if (result) {
        res.render("user/addTrainer", {
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

module.exports.createTrainer = (req, res) => {
  let id = req.session.user_data.user_id;

  console.log(req.file);
  // Validate request
  var formdata = {
    email: req.body.email,
    new_password: req.body.new_password,
    confirm_password: req.body.old_password,
    name: req.body.name,
    mobile_number: req.body.mobile_number,
    category: req.body.category,
    bio: req.body.bio,
  };
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    let errorsData = {
      email: "",
      new_password: "",
      confirm_password: "",
      name: "",
      mobile_number: "",
      avtar: [],
      category: "",
      bio: "",
    };
    if (errors.array().length > 0) {
      errors.array().forEach((value) => {
        errorsData[value.param] = value.msg;
      });
      console.log(errorsData);
      req.flash("errors", errorsData);
      req.flash("formdata", formdata);
      return res.redirect("/users/add-trainer");
    }
  }

  if (!req.body) {
    return res.status(400).send({
      message: "Note content can not be empty",
    });
  }

  let token = generate_token.generaterandom_Token();
  console.log(req.files);
  const images = req.files.length > 0 ? req.files.map( file => file.filename): req.file.filename;
  // Create a User
  const Users = new User({
    fullname: req.body.name,
    email: req.body.email,
    mobile_number: req.body.mobile_number,
    added_by: id,
    role: 2,
    token: token,
    password: md5(req.body.new_password),
    profile_img: images ,
    category_id: req.body.category,
    bio: req.body.bio,
    created_at: created_date,
    updated_at: created_date,
  });

  Users.save()
    .then((data) => {
      $message = { msg: "Trainer added successfully" };
      req.flash("errors", $message);
      return res.redirect("/users/add-trainer");
    })
    .catch((err) => {
      console.log(err);
      $errors = { msg: "Something went wrong!" };
      req.flash("errors", $errors);
      req.flash("formdata", formdata);
      return res.redirect("/users/add-trainer");
    });
};

module.exports.listTrainers = (req, res) => {
  User.find({ role: 2, isDeleted: false }, function (err, usersObj) {
    if (err) {
      let err = err;
      res.render("pages/err", { err });
    } else {
      let data = usersObj;
      if (data.length) {
        console.log("trainer list------------->", data);
        return res.render("user/trainers-list", {
          data,
          baseUrl: process.env.URL,
          errors: req.flash("errors"),
          message: req.flash("message"),
        });
      }
      if (!data.length) {
        return res.render("user/trainers-list", {
          data,
          added: "No data is available",
          message: req.flash("message"),
          errors: req.flash("errors"),
          success: req.flash("success"),
        });
      }
    }
  }).populate("category_id");
};

//-------------------------meals 25 aug---------
module.exports.category = (req, res) => {
  if (typeof req.flash("formdata") == "undefined") {
    var formdata = {
      email: "",
      password: "",
    };
    req.flash("formdata", formdata);
  }
  if (req.cookies) {
    var formdata = { email: req.cookies.email, password: req.cookies.password };
    req.flash("formdata", formdata);
  }

  res.render("user/category", {
    formdata: req.flash("formdata"),
    errors: req.flash("errors"),
    reset: req.flash("reset"),
  });
};

module.exports.listCategory = (req, res) => {
  TrainerCategory.find({isDeleted:false},function (err, categoryObj) {
    if (err) {
      let err = err;
      res.render("pages/err", { err });
    } else {
      let data = categoryObj;
      if (data.length) {
        return res.render("user/category-list", {
          baseUrl: process.env.URL,
          data,
          errors: req.flash("errors"),
          message: req.flash("message"),
        });
      }
      if (!data.length) {
        return res.render("user/category-list", {
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
      return res.redirect("/trainers/category/add");
    }
  }

  if (!req.body) {
    return res.status(400).send({
      message: "Note content can not be empty",
    });
  }

  $where = { category: req.body.category, added_by: req.body.id };
  var catyExist = await TrainerCategory.findOne($where).exec();
  if (catyExist) {
    $message = { msg: "Category already exists" };
    req.flash("errors", $message);
  }

  // Create a category
  const Categories = new TrainerCategory({
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
      return res.redirect("/user/category/add");
    })
    .catch((err) => {
      $errors = { message: "Something went wrong!" };
      req.flash("errors", $errors);
      req.flash("formdata", formdata);
      return res.redirect("/user/category/add");
    });
};

//-------------------------25 aug-------

//-----------------------------8 sep ----------------------
module.exports.editTrainer = (req, res) => {
  console.log("req.params===========>", req.params);
  let admin_id = req.session.user_data.user_id;
  let id = req.params.trainerId;

  User.findOne({ _id: id }, function (err, user) {
    if (err) {
      $message = { msg: "Something went wrong" };
      req.flash("errors", $message);
      return res.redirect("/users/trainers/list");
    } else {
      let data = user;
      console.log("userData============>", user);
      //const filePath = req.protocol + "://" + req.hostname +':3000' + '/' + 'uploads/' + data.profile_img;
      const filePath = process.env.URL + "uploads/" + data.profile_img;
      console.log("kjhjkh", req.flash("errors"));
      TrainerCategory.find(function (err, result) {
        if (err) {
          console.log(err);
          $message = { message: "Error occured" };
          req.flash("errors", $message);
        } else {
          if (result) {
            res.render("user/editTrainer", {
              errors: req.flash("errors"),
              id,
              name: data.fullname,
              email: data.email,
              img: filePath,
              categoryData: result,
              mobile_number: data.mobile_number,
              category: data.category_id,
              bio: data.bio,
            });
          }
        }
      });
    }
  });
};

module.exports.updateTrainer = (req, res) => {
  console.log("updateTrainer body============>", req.body);
  console.log("updateTrainer params============>", req.params);
  console.log("updateTrainer file============>", req.file);

  let id = req.session.user_data.user_id;
  // Validate request
  var formdata = {
    email: req.body.email,
    // new_password: req.body.new_password,
    // confirm_password: req.body.old_password,
    name: req.body.name,
    mobile_number: req.body.mobile_number,
    category: req.body.category,
    bio: req.body.bio,
  };
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    let errorsData = {
      email: "",
      // new_password: "",
      // confirm_password: "",
      name: "",
      mobile_number: "",
      // avtar: "",
      category: "",
      bio: "",
    };
    if (errors.array().length > 0) {
      errors.array().forEach((value) => {
        errorsData[value.param] = value.msg;
      });
      console.log(errorsData);
      req.flash("errors", errorsData);
      req.flash("formdata", formdata);
      return res.redirect(`/users/edit-trainer/${req.params.id}`);
    }
  }

  if (!req.body) {
    return res.status(400).send({
      message: "Note content can not be empty",
    });
  }

  // update user
  let query = {
    _id: req.params.id,
  };
  let options = {
    returnNewDocument: true,
  };
  let newData = {
    fullname: req.body.name,
    email: req.body.email,
    mobile_number: req.body.mobile_number,
    category_id: req.body.category,
    bio: req.body.bio,
    updated_at: created_date,
  };
  if (req.body.password) {
    newData.password = md5(req.body.new_password);
  }
  if (req.file) {
    newData.profile_img = req.file.filename;
  }

  User.findOneAndUpdate(query, newData, options)
    .then((data) => {
      console.log("updated data------------->", data);
      $message = { msg: "Trainer updated successfully" };
      req.flash("errors", $message);
      return res.redirect(`/users/edit-trainer/${req.params.id}`);
    })
    .catch((error) => {
      console.log("error==========>", error.message);
      $errors = { msg: "Something went wrong!" };
      req.flash("errors", $errors);
      req.flash("formdata", formdata);
      return res.redirect(`/users/edit-trainer/${req.params.id}`);
    });
};

module.exports.updateCategory = (req, res) => {
  console.log("--------updateCategory----------");
  console.log("updateTrainer body============>", req.body);
  console.log("updateTrainer params============>", req.params);
  console.log("updateTrainer file============>", req.file);
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
      return res.redirect("/trainers/category/add");
    }
  }

  if (!req.body) {
    return res.status(400).send({
      message: "Note content can not be empty",
    });
  }

  let query = {
    _id: req.params.categoryId,
  };
  options = {
    returnNewDocument: true,
  };
  newData = {
    category: req.body.category,
    description: req.body.description,
    updated_at: created_date,
  };
  if (req.file) {
    newData.category_img = req.file.filename;
  }
  TrainerCategory.findOneAndUpdate(query, newData, options)
    .then((data) => {
      $message = { msg: "Category Updated successfully" };
      req.flash("errors", $message);
      return res.redirect(`/user/category/edit/${req.params.categoryId}`);
    })
    .catch((err) => {
      $errors = { message: "Something went wrong!" };
      req.flash("errors", $errors);
      req.flash("formdata", formdata);
      return res.redirect(`/user/category/edit/${req.params.categoryId}`);
    });
};

module.exports.deleteTrainer = async (req, res) => {
  console.log("-----------deleteTrainer---------");
  let query = {
    _id: req.params.trainerId,
  };
  let newData = {
    isDeleted: true,
    updated_at: created_date,
  };
  options = {
    returnNewDocument: true,
  };
  User.findOneAndUpdate(query, newData, options)
    .then((data) => {
      console.log("updated data------------->", data);
      $message = { msg: "Trainer Deleted successfully" };
      req.flash("errors", $message);
      return res.redirect(`/users/trainers/list`);
    })
    .catch((error) => {
      console.log("error==========>", error.message);
      $errors = { msg: "Something went wrong!" };
      req.flash("errors", $errors);
      req.flash("formdata", formdata);
      return res.redirect(`/users/trainers/list`);
    });
};

module.exports.categoryEdit = async (req, res) => {
  if (typeof req.flash("formdata") == "undefined") {
    var formdata = { email: "", password: "" };
    req.flash("formdata", formdata);
  }

  try {
    let categoryData = await TrainerCategory.findOne({
      _id: req.params.categoryId,
    });
    if (categoryData) {
      formdata.id = categoryData._id;
      formdata.category = categoryData.category;
      formdata.description = categoryData.description;
      formdata.filePath = process.env.URL + "uploads/" + categoryData.category_img;
      console.log("foemData 2==========>",formdata)

      res.render("user/edit-category", {
        formdata: req.flash("formdata"),
        errors: req.flash("errors"),
        reset: req.flash("reset"),
      });
    } else {
      req.flash("errors", "Invalid category Id");
      req.flash("formdata", formdata);
      return res.redirect("/user/category/list");
    }
  } catch (error) {
    req.flash("errors", "Invalid category Id");
    req.flash("formdata", formdata);
    return res.redirect("/user/category/list");
  }
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
 

  TrainerCategory.findOneAndUpdate(query, newData, options)
    .then((data) => {
      console.log("updated dat===========", data);
      $message = { msg: "Category updated successfully" };
      req.flash("errors", $message);
      return res.redirect(`/user/category/edit/${req.params.categoryId}`);
    })
    .catch((err) => {
      $errors = { message: "Something went wrong!" };
      req.flash("errors", $errors);
      req.flash("formdata", formdata);
      return res.redirect(`/user/category/edit/${req.params.categoryId}`);
    });
  
};

module.exports.deleteUserCategory = async (req, res) => {
  console.log("-----------deleteUserCategory---------");
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
  TrainerCategory.findOneAndUpdate(query, newData, options)
    .then((data) => {
      console.log("updated data------------->", data);
      $message = { msg: "User category deleted successfully" };
      req.flash("errors", $message);
      return res.redirect(`/user/category/list`);
    })
    .catch((error) => {
      console.log("error==========>", error.message);
      $errors = { msg: "Something went wrong!" };
      req.flash("errors", $errors);
      return res.redirect(`/user/category/list`);
    });
};



// ***************** Users Section ******************** //


module.exports.addUser = (req, res) => {
  if (typeof req.flash("formdata") == "undefined") {
    var formdata = { email: "", password: "", name: "", mobile_number: "" };
    req.flash("formdata", formdata);
  }

  TrainerCategory.find(function (err, result) {
    if (err) {
      console.log(err);
      $message = { message: "Error occured" };
      req.flash("errors", $message);
    } else {
      if (result) {
        res.render("user/addUser", {
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

module.exports.createTrainer = (req, res) => {
  let id = req.session.user_data.user_id;

  console.log(req.file);
  // Validate request
  var formdata = {
    email: req.body.email,
    new_password: req.body.new_password,
    confirm_password: req.body.old_password,
    name: req.body.name,
    mobile_number: req.body.mobile_number,
    category: req.body.category,
    bio: req.body.bio,
  };
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    let errorsData = {
      email: "",
      new_password: "",
      confirm_password: "",
      name: "",
      mobile_number: "",
      avtar: [],
      category: "",
      bio: "",
    };
    if (errors.array().length > 0) {
      errors.array().forEach((value) => {
        errorsData[value.param] = value.msg;
      });
      console.log(errorsData);
      req.flash("errors", errorsData);
      req.flash("formdata", formdata);
      return res.redirect("/users/add-trainer");
    }
  }

  if (!req.body) {
    return res.status(400).send({
      message: "Note content can not be empty",
    });
  }

  let token = generate_token.generaterandom_Token();
  console.log(req.files);
  const images = req.files.length > 0 ? req.files.map( file => file.filename): req.file.filename;
  // Create a User
  const Users = new User({
    fullname: req.body.name,
    email: req.body.email,
    mobile_number: req.body.mobile_number,
    added_by: id,
    role: 2,
    token: token,
    password: md5(req.body.new_password),
    profile_img: images ,
    category_id: req.body.category,
    bio: req.body.bio,
    created_at: created_date,
    updated_at: created_date,
  });

  Users.save()
    .then((data) => {
      $message = { msg: "Trainer added successfully" };
      req.flash("errors", $message);
      return res.redirect("/users/add-trainer");
    })
    .catch((err) => {
      console.log(err);
      $errors = { msg: "Something went wrong!" };
      req.flash("errors", $errors);
      req.flash("formdata", formdata);
      return res.redirect("/users/add-trainer");
    });
};

module.exports.listUsers = (req, res) => {
  User.find({ role: 3, isDeleted: false }, function (err, usersObj) {
    if (err) {
      let err = err;
      res.render("pages/err", { err });
    } else {
      let data = usersObj;
      if (data.length) {
        console.log("trainer list------------->", data);
        return res.render("user/user-list", {
          data,
          baseUrl: process.env.URL,
          errors: req.flash("errors"),
          message: req.flash("message"),
        });
      }
      if (!data.length) {
        return res.render("user/user-list", {
          data,
          added: "No data is available",
          message: req.flash("message"),
          errors: req.flash("errors"),
          success: req.flash("success"),
        });
      }
    }
  }).populate("category_id");
};

