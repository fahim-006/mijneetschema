const Lead = require("../../../../models/Leads");
const timestamp = require("time-stamp");
created_date = timestamp.utc("YYYY-MM-DD HH:mm:ss");
const { validationResult } = require("express-validator");
var md5 = require("md5");
const ejs = require("ejs");
const { getUserDataByToken } = require("../../../../helpers/helper");

module.exports.leadSave = async (req, res) => {
  var params = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    let errorsData = {
      gender: "",
      target: "",
      physical_activity: "",
      meat_products: "",
      vegetables: "",
      fruits: "",
      other_products: "",
      allergies_intolerances: "",
      personal_mesurement: "",
    };
    if (errors.array().length > 0) {
      errors.array().forEach((value) => {
        errorsData[value.param] = value.msg;
      });
      console.log("in error cal")
      console.log(errorsData);
	  console.log("in error cal end")

      return res.json({
        status: 400,
        message: "validation error",
        errors: errorsData,
      });
    }
  }

  try {
    const Leads = new Lead({
      gender: params.gender,
      target: params.target,
      physical_activity: params.physical_activity,
      meat_products: params.meat_products,
      vegetables: params.vegetables,
      fruits: params.vegetables,
      other_products: params.other_products,
      allergies_intolerances: params.allergies_intolerances,
      personal_mesurement: params.personal_mesurement,
      created_at: created_date,
      updated_at: created_date,
    });

    Leads.save()
      .then((data) => {
		  console.log("in cal save")
          console.log(data);
          console.log("in cal save end.")
        return res.send({ status: 200, message: "Data added successfully" });
      })
      .catch((err) => {
        return res.json({
          status: 500,
          message: "something went wrong",
          errors: err,
        });
      });
  } catch (err) {
    return res.json({
      status: 404,
      message: "Error occured",
    });
  }
};


module.exports.calculatorSave = async (req, res) => {
  var params = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    let errorsData = {
      gender: "",
      target: "",
      physical_activity: "",
      meat_products: "",
      vegetables: "",
      fruits: "",
      other_products: "",
      allergies_intolerances: "",
      personal_mesurement: "",
      userId: "",
      dailyPerfect: "",
      basalMetabolic: "",
    };
    if (errors.array().length > 0) {
      errors.array().forEach((value) => {
        errorsData[value.param] = value.msg;
      });
      console.log("in error cal")
      console.log(errorsData);
	  console.log("in error cal end")

      return res.json({
        status: 400,
        message: "validation error",
        errors: errorsData,
      });
    }
  }

  try {
    const Calculators = new Calculator({
      gender: params.gender,
      userId: params.userId,
      target: params.target,
      physical_activity: params.physical_activity,
      meat_products: params.meat_products,
      vegetables: params.vegetables,
      fruits: params.vegetables,
      other_products: params.other_products,
      allergies_intolerances: params.allergies_intolerances,
      personal_mesurement: params.personal_mesurement,
      dailyPerfect: params.dailyPerfect,
      basalMetabolic: params.basalMetabolic,
      created_at: created_date,
      updated_at: created_date,
    });

    Calculators.save()
      .then((data) => {
		  console.log("in cal save")
          console.log(data);
          console.log("in cal save")
        return res.send({ status: 200, message: "Data added successfully" });
      })
      .catch((err) => {
        return res.json({
          status: 500,
          message: "something went wrong",
          errors: err,
        });
      });
  } catch (err) {
    return res.json({
      status: 404,
      message: "Error occured",
    });
  }
};

module.exports.fetchCalculator = async (req, res) => {
  console.log("-----------fetchCalculator---------------");
  try {
    console.log("bearer_token------", req.headers["token"]);
    let bearer_token = req.headers["token"];
    let token = bearer_token.split(" ")[1];
    var userData = await getUserDataByToken(token);
    console.log("userData======+++++++++++>", userData);
    let query = {
      userId: userData._id,
    };
    const calData = await Calculator.find(query);
    res.send({
      status: 200,
      message: "Data fetched",
      data: calData,
    });
  } catch (error) {
    console.log("error======>", error.message);
    res.send({
      status: 400,
      message: error.message,
      data: {},
    });
  }
};
