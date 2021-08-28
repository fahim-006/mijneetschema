var Ingredients = require("../../../models/Ingredients");
var MealCategory = require("../../../models/MealCategory");
var Plan = require("../../../models/Plan");
const Lead = require("../../../models/Leads");

const timestamp = require("time-stamp");
created_date = timestamp.utc("YYYY-MM-DD HH:mm:ss");
const { validationResult } = require("express-validator");
var randomstring = require("randomstring");
var md5 = require("md5");
const ejs = require("ejs");
var fs = require("fs");
var path = require("path");






// ************** Create Plans *************** //


// ---------------  Get Plan --------------- //


module.exports.addPlan = (req, res) => {
    let id = req.session.user_data.user_id;
    if (typeof req.flash("formdata") == "undefined") {
      var formdata = { 
        name: "", 
        description: "", 
        price: "" 
      };
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
                res.render("plans/add-plan", {
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
          
        }
      }
    });
  };

module.exports.listPlans = async (req, res) => {
  let id = req.session.user_data.user_id;
    if (typeof req.flash("formdata") == "undefined") {
      var formdata = { 
        name: "", 
        description: "", 
        price: "" 
      };
      req.flash("formdata", formdata);
    }

    try{

      const result = await Plan.find().exec();

      if(result){
        res.render("plans/plan-list", {
          formdata: req.flash("formdata"),
          data: result,
        })
      }

    }catch (err){
      if (err) {
        $message = { message: "Error occured" };
        req.flash("errors", $message);
      }

    }
};

module.exports.createPlans = async (req, res) => {
    let id = req.session.user_data.user_id;
    const {name, description, price} = req.body;
    // Validate request
  
    var formdata = {
      name,
      description,
      price
    };
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      let errorsData = { 
        name: "",
        description: "",
        price: "" };
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


// ******************* get list of lead data ******************* //

module.exports.listLead = async (req, res) => {
  let id = req.session.user_data.user_id;
    if (typeof req.flash("formdata") == "undefined") {
      var formdata = { 
        name: "", 
        description: "",
        price: "" 
      };
      req.flash("formdata", formdata);
    }
  
    try{

      const result = await Lead.find().exec();
      const data = result.map(({gender, personal_mesurement}) => {
        return {
          gender,
          name: personal_mesurement.name,
          email: personal_mesurement.email,
          fat_percent: personal_mesurement.fat_percent,
          length: personal_mesurement.length,
          current_weight: personal_mesurement.current_weight,
          target_weight: personal_mesurement.target_weight,
          age: personal_mesurement.age,
        }
      });
      
      if (!data || data.length < 0) {
        console.log("No data available")
      return res.render("leadschema", {
        data,
        added: "No data is available",
        message: req.flash("message"),
        errors: req.flash("errors"),
        success: req.flash("success"),
      });
    } else {
      
      console.log("Lead Data", data);
      return res.render("leadschema", {
        data,
        errors: req.flash("errors"),
        message: req.flash("message"),
      });
    }

    }catch (err){
      console.log("An unknown error has been occured.");
      if (err) {
        $message = { message: "Error occured" };
        req.flash("errors", $message);
        res.render("leadschema", {
          message: req.flash("message"),
          errors: req.flash("errors"),
          success: req.flash("success"),
        }
        )
      }

    }
};

  