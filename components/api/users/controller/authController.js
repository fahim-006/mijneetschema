const User = require("./../../../../models/User");
const Video = require("./../../../../models/Video");
const Dietplan = require("./../../../../models/Dietplan");
const { getUserDataByToken } = require("../../../../helpers/helper");
const timestamp = require("time-stamp");
created_date = timestamp.utc("YYYY-MM-DD HH:mm:ss");
const { validationResult } = require("express-validator");
var md5 = require("md5");
const ejs = require("ejs");
const jwt = require("jsonwebtoken");

const { createMollieClient } = require("@mollie/api-client");

const mollieClient = createMollieClient({
  apiKey: process.env.MOLLIE_TEST_KEY,
});

module.exports.login = async (req, res) => {
  console.log(req.body.email);
  var params = req.body;
  var privateKey = "vnrvjrekrke";
  var token_key = jwt.sign({ user: "user" }, privateKey, { expiresIn: "14h" });

  var isExist = await User.findOne({
    email: params.email,
    isDeleted: false,
  }).exec();

  if (!isExist) {
    return res.json({
      status: 404,
      message: "User not found",
    });
  } else if (isExist.password !== md5(params.password)) {
    return res.json({
      status: 403,
      message: "Incorrect password",
    });
  } else if (Number(params.role) !== Number(isExist.role)) {
    return res.json({
      status: 402,
      message: "You are not authurize role",
    });
  } else {
    if (Number(params.role) === 2) {
      if (isExist.payment_status !== true) {
        return res.json({
          status: 402,
          message: "You have to make subscription first",
          errors: "payment status false",
          user_id: isExist._id,
        });
      }
      if (isExist.end_date < created_date) {
        return res.json({
          status: 405,
          message: "Your subscription is expired",
          errors: "subscription expired",
          user_id: isExist._id,
        });
      }
    }

    await User.findOneAndUpdate(
      { email: params.email },
      { token: token_key }
    ).exec();

    user = {
      name: isExist.fullname,
      email: isExist.email,
      mobile_number: isExist.mobile_number,
      role: isExist.role,
      _id: isExist._id,
      token: token_key,
    };
    return res.json({
      status: 200,
      message: "Login successfully",
      user: user,
    });
  }
};

module.exports.registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    let errorsData = { email: "", password: "", name: "", mobile_number: "" };
    if (errors.array().length > 0) {
      errors.array().forEach((value) => {
        errorsData[value.param] = value.msg;
      });
      console.log(errorsData);

      return res.json({
        status: 400,
        message: "validation error",
        errors: errorsData,
      });
    }
  }

  try {
    $where = { email: req.body.email };
    await User.findOne($where, function (err, user) {
      if (user) {
        return res.json({
          status: 400,
          message: "Email already exit",
        });
      } else {
        // Create a User
        const Users = new User({
          fullname: req.body.name,
          email: req.body.email,
          mobile_number: req.body.mobile_number,
          added_by: 0,
          role: req.body.role,
          profile_img: ['trainer-1.png'],
          password: md5(req.body.password),
          created_at: created_date,
          updated_at: created_date,
        });
        console.log(Users);
        Users.save()
          .then((data) => {
            return res.send({
              status: 200,
              message: "User added successfully",
              data: data,
            });
          })
          .catch((err) => {
            return res.json({
              status: 500,
              message: "something went wrong",
              errors: err,
            });
          });
      }
    });
  } catch (err) {
    return res.json({
      status: 404,
      message: "Error occured",
    });
  }
};

module.exports.registerTrainer = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    let errorsData = {
      email: "",
      password: "",
      name: "",
      mobile_number: "",
      address: "",
      latitude: "",
      longitude: "",
      job_role: "",
    };
    if (errors.array().length > 0) {
      errors.array().forEach((value) => {
        errorsData[value.param] = value.msg;
      });
      console.log(errorsData);

      return res.json({
        status: 400,
        message: "validation error",
        errors: errorsData,
      });
    }
  }

  try {
    $where = { email: req.body.email };
    await User.findOne($where, function (err, user) {
      if (user) {
        return res.json({
          status: 400,
          message: "Email already exit",
        });
      } else {
        // Create a User
        const Users = new User({
          fullname: req.body.name,
          email: req.body.email,
          mobile_number: req.body.mobile_number,
          address: req.body.address,
          latitude: req.body.latitude,
          longitude: req.body.longitude,
          job_role: req.body.job_role,
          added_by: 0,
          profile_img: ['trainer-1.png'],
          payment_status: false,
          role: req.body.role,
          password: md5(req.body.password),
          created_at: created_date,
          updated_at: created_date,
        });

        console.log(Users);

        Users.save()
          .then((data) => {
            return res.send({
              status: 200,
              message: "Trainer added successfully",
              data: data,
            });
          })
          .catch((err) => {
            return res.json({
              status: 500,
              message: "something went wrong",
              errors: err,
            });
          });
      }
    });
  } catch (err) {
    return res.json({
      status: 404,
      message: "Error occured",
    });
  }
};

module.exports.updateUser = async (req, res) => {
  let bearer_token = req.headers["token"];
  let token = bearer_token.split(" ")[1];
  var userData = await getUserDataByToken(token);

  ///////////// Validate request//////////////////////////
  const errors = validationResult(req);

  let errorsData = { name: "", mobile_number: "" };
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
  ////////////////////////////////////////////////////////////
  if (!req.body) {
    return res.status(400).send({
      message: "Note content can not be empty",
    });
  }
  var where = {
    fullname: req.body.name,
    mobile_number: req.body.mobile_number,
  };
  User.findByIdAndUpdate({ _id: userData._id }, where, { new: true }, function (
    err,
    result
  ) {
    if (err) {
      return res.json({
        status: 400,
        errors: err,
        message: "Something went wrong !",
      });
    } else {
      return res.send({
        status: 200,
        message: "User updated successfully",
        data: result,
      });
    }
  });
};

module.exports.addVideo = async (req, res) => {
  let bearer_token = req.headers["token"];
  let token = bearer_token.split(" ")[1];
  var userData = await getUserDataByToken(token);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    let errorsData = { video_type: "" };
    if (errors.array().length > 0) {
      errors.array().forEach((value) => {
        errorsData[value.param] = value.msg;
      });
      console.log(errorsData);

      return res.json({
        status: 400,
        message: "validation error",
        errors: errorsData,
      });
    }
  }

  if (req.file) {
    // Create a Video
    var Videos = new Video({
      video_type: req.body.video_type,
      video: req.file.filename,
      added_by: userData._id,
      created_at: created_date,
      updated_at: created_date,
    });
    console.log(Videos);
    Videos.save()
      .then((data) => {
        return res.send({ status: 200, message: "Video added successfully" });
      })
      .catch((err) => {
        return res.json({
          status: 500,
          message: "something went wrong",
          errors: err,
        });
      });
  } else {
    // Create a Video
    var Videos = new Video({
      video_type: req.body.video_type,
      video_url: req.body.video_url,
      added_by: userData._id,
      created_at: created_date,
      updated_at: created_date,
    });

    console.log(Videos);

    Videos.save()
      .then((data) => {
        return res.send({ status: 200, message: "Video added successfully" });
      })
      .catch((err) => {
        return res.json({
          status: 500,
          message: "something went wrong",
          errors: err,
        });
      });
  }
};

module.exports.updateVideo = async (req, res) => {
  let bearer_token = req.headers["token"];
  let token = bearer_token.split(" ")[1];
  var userData = await getUserDataByToken(token);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    let errorsData = { video_type: "" };
    if (errors.array().length > 0) {
      errors.array().forEach((value) => {
        errorsData[value.param] = value.msg;
      });
      console.log(errorsData);

      return res.json({
        status: 400,
        message: "validation error",
        errors: errorsData,
      });
    }
  }

  if (req.file) {
    let query = {
      _id: req.params.videoId
    }
    newData = {
      video_type: req.body.video_type,
      video: req.file.filename,
      updated_at: created_date,
    }

    Video.findOneAndUpdate(query, newData, { returnNewDocument: true })
      .then((data) => {
        return res.send({ status: 200, message: "Video updated successfully", data: data });
      })
      .catch((err) => {
        return res.json({
          status: 500,
          message: "something went wrong",
          errors: err,
          data: {}
        });
      });
  } else {
    let query = {
      _id: req.params.videoId
    }
    newData = {
      video_type: req.body.video_type,
      video_url: req.body.video_url,
      updated_at: created_date,
    }

    Video.findOneAndUpdate(query, newData, { returnNewDocument: true })
      .then((data) => {
        return res.send({ status: 200, message: "Video added successfully", data: data });
      })
      .catch((err) => {
        return res.json({
          status: 500,
          message: "something went wrong",
          errors: err,
          data: {}
        });
      });
  }
};

module.exports.listVideo = async (req, res) => {
  let bearer_token = req.headers["token"];
  let token = bearer_token.split(" ")[1];
  var userData = await getUserDataByToken(token);

  $where = { added_by: userData._id, isDeleted: false };
  var videoExist = await Video.find($where).exec();

  if (videoExist) {
    return res.json({
      status: 200,
      data: videoExist,
    });
  } else {
    return res.json({
      status: 400,
      message: "No video available",
    });
  }
};

module.exports.subscriptionPayment = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    let errorsData = { price: "", description: "" };
    if (errors.array().length > 0) {
      errors.array().forEach((value) => {
        errorsData[value.param] = value.msg;
      });
      console.log(errorsData);

      return res.json({
        status: 400,
        message: "validation error",
        errors: errorsData,
      });
    }
  }

  let num = Number(req.body.price);
  let price = num.toFixed(2);

  var data = await mollieClient.payments
    .create({
      amount: {
        value: price,
        currency: "EUR",
      },
      description: req.body.description,
      redirectUrl: process.env.MOLLIE_RESITER_REDIRECT_URL,
      webhookUrl: process.env.MOLLIE_REGISTER_WEBHOOK,
    })
    .then((payment) => {
      var paymentData = {
        id: payment.id,
        checkout_url: payment.getCheckoutUrl(),
      };
      return res.json({
        status: 200,
        data: paymentData,
      });
      // Forward the customer to the payment.getCheckoutUrl()
    })
    .catch((error) => {
      return res.json({
        status: 400,
        errors: error,
      });
    });
};

module.exports.subscriptionComplete = async (req, res) => {
  var privateKey = "vnrvjrekrke";
  var token_key = jwt.sign({ user: "user" }, privateKey, { expiresIn: "14h" });

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    let errorsData = {
      payment_id: "",
      user_id: "",
      plan_name: "",
      start_date: "",
      end_date: "",
      payment_amount: "",
    };
    if (errors.array().length > 0) {
      errors.array().forEach((value) => {
        errorsData[value.param] = value.msg;
      });
      console.log(errorsData);

      return res.json({
        status: 400,
        message: "validation error",
        errors: errorsData,
      });
    }
  }

  let params = req.body;

  let payment_status = await mollieClient.payments
    .get(params.payment_id)
    .then((payment) => {
      if (payment.isPaid()) {
        return true;
      } else {
        return false;
      }
      // E.g. check if the payment.isPaid()
    })
    .catch((error) => {
      return res.json({ status: 400, message: "error", errors: error });
    });

  if (payment_status) {
    var where = {
      payment_id: params.payment_id,
      plan_name: params.plan_name,
      start_date: params.start_date,
      end_date: params.end_date,
      payment_amount: params.payment_amount,
      payment_status: true,
      token: token_key,
    };
    User.findByIdAndUpdate(
      { _id: params.user_id },
      where,
      { new: true },
      function (err, result) {
        if (err) {
          return res.json({
            status: 400,
            errors: err,
            message: "Something went wrong !",
          });
        } else {
          return res.send({
            status: 200,
            message: "Subscribed successfully",
            data: result,
          });
        }
      }
    );
  } else {
    return res.json({
      status: 500,
      message: "something went wrong with payment",
    });
  }
};

module.exports.dierplanPayment = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    let errorsData = { price: "", description: "" };
    if (errors.array().length > 0) {
      errors.array().forEach((value) => {
        errorsData[value.param] = value.msg;
      });
      console.log(errorsData);

      return res.json({
        status: 400,
        message: "validation error",
        errors: errorsData,
      });
    }
  }

  let num = Number(req.body.price);
  let price = num.toFixed(2);
  var data = await mollieClient.payments
    .create({
      amount: {
        value: price,
        currency: "EUR",
      },
      description: req.body.description,
      redirectUrl: process.env.MOLLIE_DIET_PURCHASE_REDIRECT_URL,
      webhookUrl: process.env.MOLLIE_DIET_PURCHASE_WEBHOOK,
    })
    .then((payment) => {
      var paymentData = {
        id: payment.id,
        checkout_url: payment.getCheckoutUrl(),
      };
      return res.json({
        status: 200,
        data: paymentData,
      });
      // Forward the customer to the payment.getCheckoutUrl()
    })
    .catch((error) => {
      return res.json({
        status: 400,
        errors: error,
      });
    });
};

module.exports.dierplanPaymentComplete = async (req, res) => {
  console.log("req.body=========================>", req.body);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    let errorsData = {
      // user_id: "",
      method_name: "",
      //   r1: "",
      //   r2: "",
      //   r3: "",
      //   r4: "",
      //   r5: "",
      //   r6: "",
      //   r7: "",
      //   r8: "",
      payment_id: "",
    };
    if (errors.array().length > 0) {
      errors.array().forEach((value) => {
        errorsData[value.param] = value.msg;
      });
      console.log(errorsData);

      return res.json({
        status: 400,
        message: "validation error",
        errors: errorsData,
      });
    }
  }

  let params = req.body;
  let payment_status = await mollieClient.payments
    .get(params.payment_id)
    .then((payment) => {
      if (payment.isPaid()) {
        return true;
      } else {
        return false;
      }
      // E.g. check if the payment.isPaid()
    })
    .catch((error) => {
      return res.json({ status: 400, message: "error", errors: error });
    });

  console.log("payment_status=================>", payment_status);
  console.log("in complete")
  console.log(params);
  console.log("in complete end")
  if (payment_status) {
    var where = { payment_status: true };
    if (params.user_id) {
      let userUpdate = await User.findByIdAndUpdate(
        { _id: params.user_id },
        where,
        { new: true },
        function (err, result) {
          if (err) {
            console.log("paymentsttus not updated error===========>", err)

            return res.json({
              status: 400,
              errors: err,
              message: "Something went wrong !",
            });
          } else {
            console.log("paymentsttus updated===========>", result)
            return res.send({
              status: 200,
              message: "Purchased successfully",
              data: result,
            });
          }
        }
      );

    } else {
      const Users = new User({
        fullname: req.body.name,
        email: req.body.email,
        added_by: 0,
        role: req.body.role,
        password: md5(req.body.password),
        payment_status: true,
        created_at: created_date,
        updated_at: created_date,
      });

      Users.save()
        .then((data) => {
          return res.send({
            status: 200,
            message: "Purchased successfully",
            data: data,
          });
        })
        .catch((err) => {
          return res.json({
            status: 400,
            errors: err,
            message: "Something went wrong !",
          });
        })


    }


    // Create a Video
    var Diet = new Dietplan({
      user_id: params.user_id,
      email: params.email,
      method_name: params.method_name,
      r1: params.r1,
      r2: params.r2,
      r3: params.r3,
      r4: params.r4,
      r5: params.r5,
      r6: params.r6,
      r7: params.r7,
      r8: params.r8,
      created_at: created_date,
      updated_at: created_date,
    });

    Diet.save()
      .then((data) => {
        console.log("dietplan saved===========>", data)

        return res.send({
          status: 200,
          message: "Diet plan added successfully",
        });
      })
      .catch((err) => {
        console.log("dierplan not saved error===========>", err)

        return res.json({
          status: 500,
          message: "something went wrong",
          errors: err,
        });
      });
  } else {
    return res.json({
      status: 500,
      message: "something went wrong with payment",
    });
  }
};
