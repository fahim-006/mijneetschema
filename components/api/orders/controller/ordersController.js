const User = require("./../../../../models/User");
const Video = require("./../../../../models/Video");
const Dietplan = require("./../../../../models/Dietplan");
const Orders = require("./../../../../models/Orders");
const Coupons = require("./../../../../models/Coupons");
const Orders_details = require("./../../../../models/Orders_details");
const { getUserDataByToken } = require("../../../../helpers/helper");
const { sendMailer } = require("./../../../../utilities/mail");
const timestamp = require("time-stamp");
created_date = timestamp.utc("YYYY-MM-DD HH:mm:ss");
const { validationResult } = require("express-validator");
var md5 = require("md5");
const ejs = require("ejs");
const jwt = require("jsonwebtoken");

const { createMollieClient } = require("@mollie/api-client");
const fs = require("fs");

const mollieClient = createMollieClient({
  apiKey: process.env.MOLLIE_TEST_KEY,
});

module.exports.ordersPayment = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    let errorsData = {
      address: "",
      email: "",
      contact_no: "",
      name: "",
      total: "",
      product_description,
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

  var params = req.body;
  var user_id = params.user_id;
  if (user_id === "") {
    var isExist = await User.findOne({ email: params.email }).exec();
    if (isExist) {
      return res.json({
        status: 404,
        message: "Email already exist",
      });
    } else {
      // Create a User
      const Users = new User({
        fullname: req.body.name,
        email: req.body.email,
        mobile_number: req.body.contact_no,
        added_by: 0,
        role: 3,
        created_at: created_date,
        updated_at: created_date,
      });

      var userData = await Users.save();

      if (userData) {
        user_id = userData._id;
      } else {
        return res.json({
          status: 404,
          message: "Something went wrong",
        });
      }
    }
  }

  if (user_id !== "") {
    let num = Number(params.total);
    let price = num.toFixed(2);
    console.log(price);
    var data = await mollieClient.payments
      .create({
        amount: {
          value: price,
          currency: "EUR",
        },
        description: "product purchase",
        redirectUrl: process.env.MOLLIE_CHECKOUT_REDIRECT_URL,
        webhookUrl: process.env.MOLLIE_CHECKOUT_WEBHOOK,
      })
      .then((payment) => {
        var paymentData = {
          id: payment.id,
          checkout_url: payment.getCheckoutUrl(),
          user_id: user_id,
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
  } else {
    return res.json({
      status: 404,
      message: "Something went wrong",
    });
  }
};

module.exports.ordersPaymentComplete = async (req, res) => {
  console.log(req.body);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    let errorsData = {
      user_id: "",
      name: "",
      email: "",
      contact_no: "",
      address: "",
      amount_without_tax: "",
      amount_with_tax: "",
      total: "",
      payment_id: "",
      landmark: "",
      pincode: "",
      state: "",
      city: "",
      // couponCode: "",
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

  console.log(payment_status);

  //get couponCode details

  let discountPercentage = 0;
  if (params.couponCode != "" || params.couponCode != undefined) {
    let couponDetails = await Coupons.findOne({
      coupon: params.couponCode,
    }).exec();
    console.log(
      "++++++++++++++++++++++++++++++++++++couponDetails====>",
      couponDetails
    );
    if (couponDetails) {
      discountPercentage = couponDetails.discount;
    }
  }
  console.log(
    "++++++++++++++++++++++++++++++++++++discountPercentage====>",
    discountPercentage
  );

  if (payment_status) {
    var lastProduct = await Orders.findOne().sort({ order_id: -1 }).exec();
    var order_id = 0;

    console.log(lastProduct);
    if (lastProduct) {
      order_id = lastProduct.order_id + 1;
    } else {
      order_id = 1001;
    }

    console.log(order_id);
    // Create a Orders
    var Order = new Orders({
      user_id: params.user_id,
      order_id: order_id,
      name: params.name,
      email: params.email,
      contact_no: params.contact_no,
      alternate_contact_no: params.alternate_contact_no,
      address: params.address,
      state: params.state,
      city: params.city,
      landmark: params.landmark,
      pincode: params.pincode,
      amount_without_tax: params.amount_without_tax,
      amount_with_tax: params.amount_with_tax,
      total: params.total,
      payment_id: params.payment_id,
      created_at: created_date,
      updated_at: created_date,
      coupon_code: params.couponCode,
      discountPercentage: discountPercentage,
    });

    console.log("++++++++++++++++++++++++++++++++++++Order Data====>", Order);

    var orderData = await Order.save();

    if (orderData) {
      console.log(orderData);
      //var pp = [{_id:"5f290e320181340c7c488604",type:""}];
      var pp = [];
      var pp = params.products;
      var table_order_id = orderData._id;
      var order_id_fordetails = orderData.order_id;
      var cc = pp.length;
      console.log("cc" + cc);
      for (let i = 0; i < cc; i++) {
        console.log(pp[i]);
        var Orders_detail = new Orders_details({
          table_order_id: table_order_id,
          order_id: order_id_fordetails,
          user_id: params.user_id,
          product_id: pp[i].id,
          onModel: pp[i].product_type,
          ingredient: pp[i].ingredientArr,
          total: params.total,
          created_at: created_date,
          updated_at: created_date,
        });
        var orderDetails = await Orders_detail.save();
      }

      sendInvoiceToAdmin(orderData._id);

      if (orderDetails) {
        return res.json({
          status: 200,
          message: "Payment done successfully",
        });
      }
    } else {
      return res.json({
        status: 500,
        message: "something went wrong with payment",
      });
    }
  } else {
    return res.json({
      status: 500,
      message: "something went wrong with payment",
    });
  }
};

module.exports.fetchOrder = async (req, res) => {
  console.log("---------fetchOrder COnt---------------");
  try {
    let bearer_token = req.headers["token"];
    let token = bearer_token.split(" ")[1];
    let userData = await getUserDataByToken(token);
    let limit = 10;


    let ordersList2 = await Orders.aggregate([
      {
        $match: {
          user_id: userData._id,
          isUserRemovedOrder: false
        },
      },
      {
        $lookup: {
          from: "orders_details",
          localField: "order_id",
          foreignField: "order_id",
          as: "product_details",
        },
      },
    ])
      .skip(parseInt(req.query.page_no - 1) * limit)
      .limit(limit);
      console.log("------ordersList2------------->",ordersList2)


    let ordersCount = await Orders.aggregate([
      {
        $match: {
          user_id: userData._id,
          isUserRemovedOrder: false
        },
      },
      {
        $lookup: {
          from: "orders_details",
          localField: "order_id",
          foreignField: "order_id",
          as: "product_details",
        },
      },
    ]);

    console.log("------ordersCount------------->",ordersCount.length)

    res.send({
      status: 200,
      message: "Order list fetched",
      data: {
        ordersList: ordersList2,
        totalOrder: ordersCount.length,
        page: Math.ceil(ordersCount.length / limit),
      },
    });
  } catch (error) {
    console.log("err-------->", error.message);
    res.send({
      status: 500,
      message: "something went wrong",
      data: {},
    });
  }
};

module.exports.removeOrder = async (req, res) => {
  console.log("--------removeOrder contr----------");

  try {
    let query = {
      order_id: req.query.orderId,
    };
    let options = {
      returnNewDocument: true,
    };
    let newData = {
      isUserRemovedOrder: true,
    };
    let orderData = await Orders.findOneAndUpdate(query, newData, {
      returnNewDocument: true,
    });

    if (orderData) {
      res.send({
        status: 200,
        message: "Order removed",
        data: orderData,
      });
    } else {
      res.send({
        status: 200,
        message: "Inavalid orderId",
        data: {},
      });
    }
  } catch (error) {
    console.log("err-------->", error.message);
    res.send({
      status: 500,
      message: "something went wrong",
      data: {},
    });
  }
};

module.exports.testEmail = async (req, res) => {
  try {
    const data = await sendInvoiceToAdmin(req.params.orderId);
    res.send(data);
  } catch (error) {
    res.send("error");
  }
};

const sendInvoiceToAdmin = async (orderId) => {
  console.log("-----------sendInvoiceToAdmin-----------", orderId);
  try {
    let orderDetail = await Orders.findOne({ order_id: orderId });
    console.log("orderDetail=====>", orderDetail);
    if (!orderDetail) {
      throw new Error("Invalid orderId");
    }

    let orderedProduct = await Orders_details.find({
      order_id: orderId,
    }).populate("product_id");
    console.log("orderedProduct=====>", orderedProduct);

    let tableBody = "";
    let index = 1;
    for (let product of orderedProduct) {
      tableBody = `${tableBody} <tr> 
        <td>${index} </td>
        <td>${product.product_id.name} </td>
        <td>${product.product_id.price} </td>
      </tr>`;
      index = index + 1;
    }
    console.log("tableBody========>", tableBody);

    let template = fs
      .readFileSync(`${__dirname}/../../../../templates/invoice.html`)
      .toString();

    let template1 = template.replace(/#orderId#/g, orderDetail.order_id);
    template1 = template1.replace(/#tableBody#/g, tableBody);
    template1 = template1.replace(/#name#/g, orderDetail.name);
    template1 = template1.replace(
      /#addressy#/g,
      `${orderDetail.address}, ${orderDetail.city}, ${orderDetail.state}, Landmark: ${orderDetail.landmark}, Pincode: ${orderDetail.pincode}`
    );
    template1 = template1.replace(/#email#/g, orderDetail.email);
    template1 = template1.replace(/#total#/g, orderDetail.amount_without_tax);
    template1 = template1.replace(
      /#tax#/g,
      orderDetail.amount_with_tax - orderDetail.amount_without_tax
    );
    template1 = template1.replace(
      /#discount#/g,
      orderDetail.discountPercentage
    );
    template1 = template1.replace(/#gtotal#/g, orderDetail.amount_with_tax);
    console.log("template1", template1);

    sendMailer({
      email: "aashish.emi@yopmail.com",
      subject: "Invoice",
      body: template1,
    });
  } catch (error) {
    console.log("error sendInvoiceToAdmin========>", error.message);
    console.log("order-id========>", orderId);
  }
};
