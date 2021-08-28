var Category = require("../../../models/Category");
var Product = require("../../../models/Products");
var Ingredients = require("../../../models/Ingredients");
var Meals = require("../../../models/Meals");
var MealCategory = require("../../../models/MealCategory");

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

module.exports.ingredients = (req, res) => {
  if (typeof req.flash("formdata") == "undefined") {
    var formdata = { name: "", 
    protien: "" };
    
    req.flash("formdata", formdata);
  }

  res.render("meals/ingredient", {
    formdata: req.flash("formdata"),
    errors: req.flash("errors"),
    reset: req.flash("reset"),
  });
};

module.exports.editIngredients = async (req, res) => {
  if (typeof req.flash("formdata") == "undefined") {
    var formdata = { name: "" , protien: ""};
    
    req.flash("formdata", formdata);
  }

  const ingredientData = await Ingredients.findOne({
    _id: req.params.ingredientId,
  });

  if (ingredientData) {
    formdata.name = ingredientData.name;
    formdata.protien = ingredientData.protien;
    formdata.id = ingredientData._id;

    res.render("meals/edit-ingredient", {
      formdata: req.flash("formdata"),
      errors: req.flash("errors"),
      reset: req.flash("reset"),
    });
  } else {
    req.flash("errors", "Invalid ingredientId");
    req.flash("formdata", formdata);
    return res.redirect("/meals/ingredients/list");
  }
};

module.exports.createIngredients = async (req, res) => {
  let id = req.session.user_data.user_id;
  const {name, protien, carbs, fat, fiber, unit, quantity, calories, source} = req.body;
  // Validate request

  var formdata = { 
  	
    source,
  	name,
    protien,
    carbs,
    fat,
    fiber,
    unit,
    quantity,
    calories,

  	//protien = req.body.protien
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
      return res.redirect("/meals/ingredient/add");
    }
  }

  if (!req.body) {
    return res.status(400).send({
      message: "Note content can not be empty",
    });
  }

  $where = { name: req.body.name, added_by: req.body.id };
  var ingredientExist = await Ingredients.findOne($where).exec();
  if (ingredientExist) {
    return res.json({
      status: 400,
      message: "Ingredient already exit",
    });
  }

  // Create a category
  const ingredient = new Ingredients({
    source,
    name,
    protien,
    carbs,
    fat,
    fiber,
    unit,
    quantity,
    calories,
    added_by: id,
    created_at: created_date,
    updated_at: created_date,
  });

  // ingredient
  //   .save()
  //   .then((data) => {
  //     $message = { msg: "Ingredients added successfully" };
  //     req.flash("errors", $message);
  //     return res.redirect("/meals/ingredient/add");
  //   })
  //   .catch((err) => {
  //     $errors = { message: "Something went wrong!" };
  //     req.flash("errors", $errors);
  //     req.flash("formdata", formdata);
  //     return res.redirect("/meals/ingredient/add");
  //   });

    try{
    	await ingredient.save();
    	$message = { msg: "Ingredients added successfully" };
      	req.flash("errors", $message);
      	return res.redirect("/meals/ingredient/add");
    }catch(err){
    	$errors = { message: "Something went wrong!" };
      	req.flash("errors", $errors);
      	req.flash("formdata", formdata);
      	return res.redirect("/meals/ingredient/add");
    }
};

module.exports.listIngredients = (req, res) => {
  Ingredients.find({isDeleted:false},function (err, ingredientObj) {
    if (err) {
      let err = err;
      res.render("pages/err", { err });
    } else {
      let data = ingredientObj;
      if (data.length) {
        return res.render("meals/ingredients-list", {
          data,
          baseUrl: process.env.URL,
          errors: req.flash("errors"),
          message: req.flash("message"),
        });
      }
      if (!data.length) {
        return res.render("meals/ingredients-list", {
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

module.exports.addMeal = (req, res) => {
  let id = req.session.user_data.user_id;
  if (typeof req.flash("formdata") == "undefined") {
    var formdata = { name: "", description: "", sku: "", price: "" };
    req.flash("formdata", formdata);
  }
  Ingredients.find({ added_by: id }, function (err, result) {
    if (err) {
      $message = { message: "Error occured" };
      req.flash("errors", $message);
    } else {
      if (result) {
        MealCategory.find({}, function (err, mealResult) {
          if (err) {
            $message = { message: "Error occured" };
            req.flash("errors", $message);
          } else {
            if (mealResult) {
              const foodSource = result.map((file) => file.source).filter((v, i, s) => s.indexOf(v) === i);
              const catData = mealResult.filter((item) => item.isDeleted !== true);
              console.log(result);
              res.render("meals/meal", {
                formdata: req.flash("formdata"),
                ingredientData: result,
                baseUrl: 'localhost:4333',
                categoryData: catData,
                foodSource: foodSource,
                errors: req.flash("errors"),
                reset: req.flash("reset"),
                success: req.flash("success"),
              });
            }
          }
        });
        // console.log(result);
        // res.render("meals/meal", {
        //   formdata: req.flash("formdata"),
        //   ingredientData: result,
        //   errors: req.flash("errors"),
        //   reset: req.flash("reset"),
        //   success: req.flash("success"),
        // });
      }
    }
  });
};

module.exports.editMeal = (req, res) => {
  let id = req.session.user_data.user_id;
  if (typeof req.flash("formdata") == "undefined") {
    var formdata = {
      name: "",
      description: "",
      sku: "",
      price: "",
    };
    req.flash("formdata", formdata);
  }
  Meals.findOne({ _id: req.params.mealId }, (err, mealData) => {
    console.log("mealsData=============>", mealData);
    if (err) {
      $message = { message: "Error occured" };
      req.flash("errors", $message);
    } else {
      Ingredients.find({ added_by: id }, function (err, result) {
        if (err) {
          $message = { message: "Error occured" };
          req.flash("errors", $message);
        } else {
          if (result) {
            console.log(" ====> Ingredients <==== ", result);

            MealCategory.find({isDeleted: false}, function (err, mealResult) {
              if (err) {
                $message = { message: "Error occured" };
                req.flash("errors", $message);
              } else {
                if (mealResult) {
                  console.log(result);
                  console.log(" ======> Meals Ingredients <===== ", mealData.ingredient);
                  formdata.id = mealData._id;
                  formdata.name = mealData.name;
                  formdata.sku = mealData.sku;
                  formdata.price = mealData.price;
                  formdata.description = mealData.description;
                  formdata.food_source = mealData.food_source;
                  formdata.quantity = mealData.quantity;
                  formdata.category = mealData.category_id;
                  formdata.filePath =
                    process.env.URL + "uploads/" + mealData.meal_img;
                  formdata.category = mealData.category_id;
                  formdata.ingredient = mealData.ingredient;
                  formdata.ingredient_price = mealData.ingredient_price;

                  res.render("meals/edit-meal", {
                    formdata: req.flash("formdata"),
                    ingredientData: result,
                    categoryData: mealResult,
                    errors: req.flash("errors"),
                    reset: req.flash("reset"),
                    success: req.flash("success"),
                  });
                }
              }
            });
            // console.log(result);
            // res.render("meals/meal", {
            //   formdata: req.flash("formdata"),
            //   ingredientData: result,
            //   errors: req.flash("errors"),
            //   reset: req.flash("reset"),
            //   success: req.flash("success"),
            // });
          }
        }
      });
    }
  });
};

module.exports.createMeal = async (req, res) => {
  let id = req.session.user_data.user_id;
  const {name, description, sku, price, category, quantity, ingredient, food_source} = req.body;
  console.log("-----body-of-the-creat-meal----", req.body);
  // Validate request
  var formdata = {
    name,
    description,
    sku,
    price,
    category,
    quantity,
    food_source
  };
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    let errorsData = {
      name: "",
      description: "",
      sku: "",
      price: "",
      category: "",
      quantity: "",
    };
    if (errors.array().length > 0) {
      console.log("error--->", errorsData);
      errors.array().forEach((value) => {
        errorsData[value.param] = value.msg;
      });
      req.flash("errors", errorsData);
      req.flash("formdata", formdata);
      return res.redirect("/meals/meal/add");
    }
  }

  if (!req.body) {
    return res.status(400).send({
      message: "Note content can not be empty",
    });
  }

  console.log("==> Snatpshot before saving <==", req.body);
  const ingItem = await Ingredients.findById(food_source).exec();
  console.log("======> Found Ingredient Item <=======", ingItem);
  const nutrition = (ingItem.protien/100*quantity) + (ingItem.carbs/100*quantity) + (ingItem.fat/100*quantity);
  const filteredIng = ingredient ? ingredient : []
  // Create a Meal
  const Meal = new Meals({
    name,
    category_id: category,
    added_by: id,
    sku,
    price,
    quantity,
    description,
    food_source,
    ingredient: filteredIng,
    meal_img: req.file.filename,
    ingredient_price: req.body.ingredient_price,
    nutrition: nutrition,
    created_at: created_date,
    updated_at: created_date,
    isDeleted: false,
  });

  Meal.save()
    .then((data) => {
      $message = { msg: "Meal added successfully" };
      console.log("========> Meal after saving <======= ", data);
      req.flash("errors", $message);
      return res.redirect("/meals/meal/add");
    })
    .catch((err) => {
      console.log("----------------", err);
      $errors = { message: "Something went wrong!" };
      req.flash("errors", $errors);
      req.flash("formdata", formdata);
      return res.redirect("/meals/meal/add");
    });
};

module.exports.updateMeal = (req, res) => {
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
    nutrition: "",
  };

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    let errorsData = {
      name: "",
      description: "",
      sku: "",
      price: "",
      category: "",
      nutrition: "",
    };

    if (errors.array().length > 0) {
      console.log("error--->", errorsData);
      errors.array().forEach((value) => {
        errorsData[value.param] = value.msg;
      });
      req.flash("errors", errorsData);
      req.flash("formdata", formdata);
      return res.redirect(`/meals/meal/edit/${req.params.mealId}`);
    }
  }

  if (!req.body) {
    return res.status(400).send({
      message: "Note content can not be empty",
    });
  }

  let query = {
    _id: req.params.mealId,
  };
  let options = {
    returnNewDocument: true,
  };

  const {name, category, sku, price, description, ingredient, food_source, ingredient_price} = req.body;
  let newData = {
    name,
    category_id: category,
    sku,
    price,
    description,
    ingredient,
    ingredient_price,
    food_source,
    updated_at: created_date,
  };
  if (req.file) {
    newData.meal_img = req.file.filename;
  }
  console.log("newData data===========>", newData);

  Meals.findOneAndUpdate(query, newData, options)
    .then((data) => {
      console.log("updated data===========>", data);
      $message = { msg: "Meal updated successfully" };
      req.flash("errors", $message);
      return res.redirect(`/meals/meal/edit/${req.params.mealId}`);
    })
    .catch((err) => {
      console.log("----------------", err);
      $errors = { message: "Something went wrong!" };
      req.flash("errors", $errors);
      req.flash("formdata", formdata);
      return res.redirect(`/meals/meal/edit/${req.params.mealId}`);
    });
};

module.exports.listMeals = async (req, res) => {
  let id = req.session.user_data.user_id;
  const data = await Meals.find()
    .where({ added_by: id, isDeleted: false })
    .populate("ingredient food_source");

  const foodSource = data.map(item => item.food_source);

    console.log("==========> Meal List Data <=========",data);
    // console.log("==========> Food Source <=========", foodSource);

  if (!data) {
    return res.render("meals/meals-list", {
      data,
      baseUrl: process.env.URL,
      added: "No data is available",
      message: req.flash("message"),
      errors: req.flash("errors"),
      success: req.flash("success"),
    });
  } else {
    
    return res.render("meals/meals-list", {
      data,
      baseUrl: process.env.URL,
      errors: req.flash("errors"),
      message: req.flash("message"),
    });
  }
};

module.exports.deleteMeal = async (req, res) => {
  console.log("-----------deleteMeal---------");
  let query = {
    _id: req.params.mealId,
  };
  let newData = {
    isDeleted: true,
    updated_at: created_date,
  };
  options = {
    returnNewDocument: true,
  };
  Meals.findOneAndUpdate(query, newData, options)
    .then((data) => {
      console.log("data=============>data", data);
      // return res.redirect("/meals/meal/list", {
      //   data,
      //   baseUrl: process.env.URL,
      //   errors: req.flash("errors"),
      //   message: req.flash("message"),
      // });
      console.log("updated data------------->", data);
      $message = { msg: "Meal Deleted successfully" };
      req.flash("errors", $message);
      return res.redirect(`/meals/meal/list`);
    })
    .catch((error) => {
      console.log("error======================================>", error);
      console.log("error==========>", error.message);
      $errors = { msg: "Something went wrong!" };
      req.flash("errors", $errors);
      return res.redirect(`/meals/meal/list`);
    });
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

  res.render("meals/category", {
    formdata: req.flash("formdata"),
    errors: req.flash("errors"),
    reset: req.flash("reset"),
  });
};

module.exports.listCategory = (req, res) => {
  MealCategory.find({ isDeleted: false }, function (err, categoryObj) {
    if (err) {
      let err = err;
      res.render("pages/err", { err });
    } else {
      let data = categoryObj;
      if (data.length) {
        return res.render("meals/category-list", {
          data,
          baseUrl: process.env.URL,
          errors: req.flash("errors"),
          message: req.flash("message"),
        });
      }
      if (!data.length) {
        return res.render("meals/category-list", {
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
      return res.redirect("/meals/category/add");
    }
  }

  if (!req.body) {
    return res.status(400).send({
      message: "Note content can not be empty",
    });
  }

  $where = { category: req.body.category, added_by: req.body.id };
  var catyExist = await MealCategory.findOne($where).exec();
  if (catyExist) {
    $message = { msg: "Category already exists" };
    req.flash("errors", $message);
  }

  // Create a category
  const Categories = new MealCategory({
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
      return res.redirect("/meals/category/add");
    })
    .catch((err) => {
      $errors = { message: "Something went wrong!" };
      req.flash("errors", $errors);
      req.flash("formdata", formdata);
      return res.redirect("/meals/category/add");
    });
};

module.exports.categoryEdit = async (req, res) => {
  if (typeof req.flash("formdata") == "undefined") {
    var formdata = { email: "", password: "" };
    req.flash("formdata", formdata);
  }

  try {
    let categoryData = await MealCategory.findOne({
      _id: req.params.categoryId,
    });
    if (categoryData) {
      formdata.id = categoryData._id;
      formdata.category = categoryData.category;
      formdata.description = categoryData.description;
      formdata.filePath =
        process.env.URL + "uploads/" + categoryData.category_img;
      console.log("foemData 3==========>", formdata);

      res.render("meals/edit-category", {
        formdata: req.flash("formdata"),
        errors: req.flash("errors"),
        reset: req.flash("reset"),
      });
    } else {
      req.flash("errors", "Invalid category Id");
      req.flash("formdata", formdata);
      return res.redirect("/meals/category/list");
    }
  } catch (error) {
    req.flash("errors", "Invalid category Id");
    req.flash("formdata", formdata);
    return res.redirect("/meals/category/list");
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

  MealCategory.findOneAndUpdate(query, newData, options)
    .then((data) => {
      console.log("updated dat===========", data);
      $message = { msg: "Category updated successfully" };
      req.flash("errors", $message);
      return res.redirect(`/meals/category/edit/${req.params.categoryId}`);
    })
    .catch((err) => {
      $errors = { message: "Something went wrong!" };
      req.flash("errors", $errors);
      req.flash("formdata", formdata);
      return res.redirect(`/meals/category/edit/${req.params.categoryId}`);
    });
};

module.exports.deleteMealCategory = async (req, res) => {
  console.log("-----------deleteMealCategory---------");
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
  MealCategory.findOneAndUpdate(query, newData, options)
    .then((data) => {
      console.log("updated data------------->", data);
      $message = { msg: "Meal category deleted successfully" };
      req.flash("errors", $message);
      return res.redirect(`/meals/category/list`);
    })
    .catch((error) => {
      console.log("error==========>", error.message);
      $errors = { msg: "Something went wrong!" };
      req.flash("errors", $errors);
      return res.redirect(`/meals/category/list`);
    });
};


module.exports.updateIngredient= async (req,res)=>{
  console.log("req.body =========>", req.body);
  console.log("req.params =========>", req.params);
  console.log("req.file =========>", req.file);
  let id = req.session.user_data.user_id;
  // Validate request
  var formdata = {
    name: ""
  };
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    let errorsData = {
      name: ""
    };
    if (errors.array().length > 0) {
      console.log("error--->", errorsData);
      errors.array().forEach((value) => {
        errorsData[value.param] = value.msg;
      });
      req.flash("errors", errorsData);
      req.flash("formdata", formdata);
      return res.redirect(`/meals/ingredient/edit/${req.params.ingredientId}`);
    }
  }

  let query = {
    _id: req.params.ingredientId,
  };
  let options = {
    returnNewDocument: true,
  };
  let newData = {
    name: req.body.name
  };

  console.log("newData data===========>", newData);

  Ingredients.findOneAndUpdate(query, newData, options)
    .then((data) => {
      console.log("updated data===========>", data);
      $message = { msg: "Ingredient updated successfully" };
      req.flash("errors", $message);
      return res.redirect(`/meals/ingredient/edit/${req.params.ingredientId}`);
    })
    .catch((err) => {
      console.log("----------------", err);
      $errors = { message: "Something went wrong!" };
      req.flash("errors", $errors);
      req.flash("formdata", formdata);
      return res.redirect(`/meals/ingredient/edit/${req.params.ingredientId}`);
    });
}

module.exports.deleteIngredient = async (req, res) => {
  console.log("-----------deleteIngredient---------");
  let query = {
    _id: req.params.ingredientId,
  };
  let newData = {
    isDeleted: true,
    updated_at: created_date,
  };
  options = {
    returnNewDocument: true,
  };
  Ingredients.findOneAndUpdate(query, newData, options)
    .then((data) => {
      console.log("data=============>data", data);
      // return res.redirect("/meals/meal/list", {
      //   data,
      //   baseUrl: process.env.URL,
      //   errors: req.flash("errors"),
      //   message: req.flash("message"),
      // });
      console.log("updated data------------->", data);
      $message = { msg: "Ingredient Deleted successfully" };
      req.flash("errors", $message);
      return res.redirect(`/meals/ingredients/list`);
    })
    .catch((error) => {
      console.log("error======================================>", error);
      console.log("error==========>", error.message);
      $errors = { msg: "Something went wrong!" };
      req.flash("errors", $errors);
      return res.redirect(`/meals/ingredients/list`);
    });
};

//-------------------------25 aug-------
