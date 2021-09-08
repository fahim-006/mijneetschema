const User = require("../../../../models/User");
const Category = require("../../../../models/Category");
const MealCategory = require("../../../../models/MealCategory");
const Meals = require("../../../../models/Meals");
const Wishlist = require("../../../../models/Wishlist");
const Product = require("../../../../models/Products");
const Coupons = require("../../../../models/Coupons");
const Rating = require("../../../../models/Rating");
const { getUserDataByToken } = require("../../../../helpers/helper");
const timestamp = require("time-stamp");
created_date = timestamp.utc("YYYY-MM-DD HH:mm:ss");
const { validationResult } = require("express-validator");
var md5 = require("md5");
const ejs = require("ejs");

module.exports.createCategory = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    let errorsData = { category: "" };
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

  if (!req.body) {
    return res.status(400).send({
      message: "Note content can not be empty",
    });
  }

  let bearer_token = req.headers["token"];
  let token = bearer_token.split(" ")[1];
  var userData = await getUserDataByToken(token);

  $where = { category: req.body.category, added_by: userData._id };
  var catyExist = await Category.findOne($where).exec();
  if (catyExist) {
    return res.json({
      status: 400,
      message: "Category already exist",
    });
  }

  // Create a category
  const Categories = new Category({
    category: req.body.category,
    added_by: userData._id,
    created_at: created_date,
    updated_at: created_date,
  });

  Categories.save()
    .then((data) => {
      return res.send({ status: 200, message: "Category added successfully" });
    })
    .catch((err) => {
      $errors = { message: "Something went wrong!" };
      return res.json({
        status: 500,
        message: "something went wrong",
        errors: err,
      });
    });
};

module.exports.listCategory = async (req, res) => {
  var catyExist = await MealCategory.find({isDeleted:false}).exec();
  if (catyExist) {
    return res.json({
      status: 200,
      data: catyExist,
    });
  } else {
    return res.json({
      status: 400,
      message: "No category available",
    });
  }
};

module.exports.listCategoryByLimit = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    let errorsData = { limit: "" };
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

  var catyExist = await Category.find().limit(parseInt(req.body.limit)).exec();
  if (catyExist) {
    return res.json({
      status: 200,
      data: catyExist,
    });
  } else {
    return res.json({
      status: 400,
      message: "No category available",
    });
  }
};

module.exports.createProduct = async (req, res) => {
  let bearer_token = req.headers["token"];
  let token = bearer_token.split(" ")[1];
  var userData = await getUserDataByToken(token);

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
      return res.json({
        status: 400,
        message: "validation error",
        errors: errorsData,
      });
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
    added_by: userData._id,
    sku: req.body.sku,
    price: req.body.price,
    description: req.body.description,
    product_img: req.file.filename,
    created_at: created_date,
    updated_at: created_date,
  });

  Products.save()
    .then((data) => {
      return res.send({ status: 200, message: "Product added successfully" });
    })
    .catch((err) => {
      return res.json({
        status: 500,
        message: "something went wrong",
        errors: err,
      });
    });
};

module.exports.listProducts = async (req, res) => {
  let bearer_token = req.headers["token"];
  let token = bearer_token.split(" ")[1];
  var userData = await getUserDataByToken(token);

  $where = { added_by: userData._id };
  var productExist = await Product.find().where($where).populate("category_id");
  if (productExist) {
    return res.json({
      status: 200,
      data: productExist,
    });
  } else {
    return res.json({
      status: 400,
      message: "No products available",
    });
  }
};

module.exports.listAllProducts = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    let errorsData = { page_no: "" };
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

  if (req.body.orderby === "name_asc") {
    var mealExist = await Meals.find({isDeleted:false})
      .limit(6)
      .skip(parseInt(req.body.page_no - 1) * 6)
      .sort({ name: 1 })
      .populate("ingredient")
      .populate('category_id');
  } else if (req.body.orderby === "name_desc") {
    var mealExist = await Meals.find({isDeleted:false})
      .limit(6)
      .skip(parseInt(req.body.page_no - 1) * 6)
      .sort({ name: -1 })
      .populate("ingredient")
      .populate('category_id');
      
  } else if (req.body.orderby === "price_asc") {
    var mealExist = await Meals.find({isDeleted:false})
      .limit(6)
      .skip(parseInt(req.body.page_no - 1) * 6)
      .sort({ price: 1 })
      .populate("ingredient")
      .populate('category_id');

  } else if (req.body.orderby === "price_desc") {
    var mealExist = await Meals.find({isDeleted:false})
      .limit(6)
      .skip(parseInt(req.body.page_no - 1) * 6)
      .sort({ price: -1 })
      .populate("ingredient")
      .populate('category_id');

  } else {
    var mealExist = await Meals.find({isDeleted:false})
      .limit(6)
      .skip(parseInt(req.body.page_no - 1) * 6)
      .populate("ingredient")
      .populate('category_id');

  }

  if (mealExist) {
    var mealCount = await Meals.find({isDeleted:false}).count();
    console.log("here it is: "+mealExist);

    return res.json({
      status: 200,
      data: mealExist,
      count: mealCount,
    });
  } else {
    return res.json({
      status: 400,
      message: "No meal available",
    });
  }
};


module.exports.listAllProductsByLimit = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    let errorsData = { limit: "" };
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

  var productExist = await Product.find()
    .limit(parseInt(req.body.limit))
    .populate("category_id")
    .populate('category_id');
    

  if (productExist) {
    return res.json({
      status: 200,
      data: productExist,
    });
  } else {
    return res.json({
      status: 400,
      message: "No products available",
    });
  }
};

module.exports.listAllProductsByCat = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    let errorsData = { page_no: "", category_id: "" };
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

  $where = { category_id: req.body.category };
  if (req.body.orderby === "name_asc") {
    var productExist = await Product.find($where)
      .limit(2)
      .skip(parseInt(req.body.page_no - 1) * 2)
      .sort({ name: 1 })
      .populate("category_id");
  } else if (req.body.orderby === "name_desc") {
    var productExist = await Product.find($where)
      .limit(2)
      .skip(parseInt(req.body.page_no - 1) * 2)
      .sort({ name: -1 })
      .populate("category_id");
  } else if (req.body.orderby === "price_asc") {
    var productExist = await Product.find($where)
      .limit(2)
      .skip(parseInt(req.body.page_no - 1) * 2)
      .sort({ price: 1 })
      .populate("category_id");
  } else if (req.body.orderby === "price_desc") {
    var productExist = await Product.find($where)
      .limit(2)
      .skip(parseInt(req.body.page_no - 1) * 2)
      .sort({ price: -1 })
      .populate("category_id");
  } else {
    var productExist = await Product.find($where)
      .limit(2)
      .skip(parseInt(req.body.page_no - 1) * 2)
      .populate("category_id");
  }

  if (productExist) {
    var productCount = await Product.find($where).count();
    return res.json({
      status: 200,
      data: productExist,
      count: productCount,
    });
  } else {
    return res.json({
      status: 400,
      message: "No products available",
    });
  }
};


module.exports.listAllMealsByCat = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    let errorsData = { page_no: "", category_id: "" };
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

  $where = { category_id: req.body.category ,isDeleted:false};
  if (req.body.orderby === "name_asc") {
    var productExist = await Meals.find($where)
      .limit(6)
      .skip(parseInt(req.body.page_no - 1) * 6)
      .sort({ name: 1 })
      .populate("category_id");
  } else if (req.body.orderby === "name_desc") {
    var productExist = await Meals.find($where)
      .limit(6)
      .skip(parseInt(req.body.page_no - 1) * 6)
      .sort({ name: -1 })
      .populate("category_id");
  } else if (req.body.orderby === "price_asc") {
    var productExist = await Meals.find($where)
      .limit(6)
      .skip(parseInt(req.body.page_no - 1) * 6)
      .sort({ price: 1 })
      .populate("category_id");
  } else if (req.body.orderby === "price_desc") {
    var productExist = await Meals.find($where)
      .limit(6)
      .skip(parseInt(req.body.page_no - 1) * 6)
      .sort({ price: -1 })
      .populate("category_id");
  } else {
    var productExist = await Meals.find($where)
      .limit(6)
      .skip(parseInt(req.body.page_no - 1) * 6)
      .populate("category_id");
  }

  if (productExist) {
    var productCount = await Meals.find($where).count();
    return res.json({
      status: 200,
      data: productExist,
      count: productCount,
    });
  } else {
    return res.json({
      status: 400,
      message: "No Meals available",
    });
  }
};


module.exports.listSingleMeal = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    let errorsData = { product_id: "" };
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

  $where = { _id: req.body.product_id , isDeleted:false};
      
      var productExist = await Meals.findOne().where($where).populate("ingredient").populate('category_id');
  if (productExist) {

    $where2={category_id:productExist.category_id._id,isDeleted:false}
    var categoryMealExist = await Meals.find()
                                       .where($where2)
                                       .limit(3)
                                       .populate('category_id');

    return res.json({
      status: 200,
      data: productExist,
      products: categoryMealExist,
    });
  } else {
    return res.json({
      status: 400,
      message: "No products available",
    });
  }
};

module.exports.listFeaturedProducts = async (req, res) => {
  $where = { featured: true };

  var productExist = await Product.find($where)
    .limit(5)
    .populate("category_id");

  if (productExist) {
    return res.json({
      status: 200,
      data: productExist,
    });
  } else {
    return res.json({
      status: 400,
      message: "No products available",
    });
  }
};

module.exports.createWishlist = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    let errorsData = { product_id: "" };
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

  if (!req.body) {
    return res.status(400).send({
      message: "Note content can not be empty",
    });
  }

  let bearer_token = req.headers["token"];
  let token = bearer_token.split(" ")[1];
  var userData = await getUserDataByToken(token);

  $where = { product_id: req.body.product_id, user_id: userData._id };
  var wishExist = await Wishlist.findOne($where).exec();
  if (wishExist) {
    return res.json({
      status: 400,
      message: "Product  already in wishlist",
    });
  }

  // Create a category
  const Wishlists = new Wishlist({
    product_id: req.body.product_id,
    user_id: userData._id,
    created_at: created_date,
    updated_at: created_date,
  });

  Wishlists.save()
    .then((data) => {
      return res.send({ status: 200, message: "Wish added successfully" });
    })
    .catch((err) => {
      $errors = { message: "Something went wrong!" };
      return res.json({
        status: 500,
        message: "something went wrong",
        errors: err,
      });
    });
};

module.exports.removeWishlist = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    let errorsData = { product_id: "" };
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

  if (!req.body) {
    return res.status(400).send({
      message: "Note content can not be empty",
    });
  }

  let bearer_token = req.headers["token"];
  let token = bearer_token.split(" ")[1];
  var userData = await getUserDataByToken(token);

  $where = { product_id: req.body.product_id, user_id: userData._id };
  var wishExist = await Wishlist.findOne($where).exec();
  if (!wishExist) {
    return res.json({
      status: 400,
      message: "Product  is not in wishlist",
    });
  }

  var rem = await Wishlist.remove({
    product_id: req.body.product_id,
    user_id: userData._id,
  }).exec();

  if (rem) {
    $where = { user_id: userData._id };
    var productExist = await Wishlist.find($where)
      .limit(2)
      .skip(parseInt(req.body.page_no - 1) * 2)
      .populate({
        path: "product_id",
        model: "Products",
        populate: {
          path: "category_id",
          model: "Category",
        },
      });

    if (productExist) {
      var productCount = await Wishlist.find($where).count();

      return res.json({
        status: 200,
        data: productExist,
        count: productCount,
        message: "Removed successfully",
      });
    } else {
      return res.json({
        status: 400,
        message: "No products available",
      });
    }
  } else {
    return res.json({
      status: 400,
      message: "Something went wrong",
    });
  }
};

module.exports.listWishProducts = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    let errorsData = { page_no: "" };
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

  let bearer_token = req.headers["token"];
  let token = bearer_token.split(" ")[1];
  var userData = await getUserDataByToken(token);

  $where = { user_id: userData._id };
  var productExist = await Wishlist.find($where)
    .limit(2)
    .skip(parseInt(req.body.page_no - 1) * 2)
    .populate({
      path: "product_id",
      model: "Products",
      populate: {
        path: "category_id",
        model: "Category",
      },
    });

  if (productExist) {
    var productCount = await Wishlist.find($where).count();

    return res.json({
      status: 200,
      data: productExist,
      count: productCount,
    });
  } else {
    return res.json({
      status: 400,
      message: "No products available",
    });
  }
};

module.exports.checkCoupon = async (req, res) => {
  console.log("req body"+req.body);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    let errorsData = { coupon: "" };
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

  $where = { coupon: req.body.coupon, expiry_date: { $gte: created_date } };
  var couponExist = await Coupons.findOne($where).exec();

  if (couponExist) {
    return res.json({
      status: 200,
      discount: couponExist.discount,
    });
  } else {
    return res.json({
      status: 400,
      message: "Not valid coupon",
    });
  }
};

/*********rating part start */

module.exports.createRating = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    let errorsData = { product_id: "", reviews: "", rating: "" };
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

  if (!req.body) {
    return res.status(400).send({
      message: "Note content can not be empty",
    });
  }

  let bearer_token = req.headers["token"];
  let token = bearer_token.split(" ")[1];
  var userData = await getUserDataByToken(token);

  $where = { product_id: req.body.product_id, user_id: userData._id };
  var ratingExist = await Rating.findOne($where).exec();
  if (ratingExist) {
    return res.json({
      status: 400,
      message: "You already give rating to this product",
    });
  }

  // Create a category
  const Ratings = new Rating({
    product_id: req.body.product_id,
    user_id: userData._id,
    reviews: req.body.reviews,
    rating: req.body.rating,
    created_at: created_date,
    updated_at: created_date,
  });

  var ratingQuery = await Ratings.save();

  if (ratingQuery) {
    var avgRating = await Rating.aggregate([
      { $group: { _id: null, pop: { $avg: "$rating" } } },
    ]).exec();

    await Product.findOneAndUpdate(
      { _id: req.body.product_id },
      { rating: avgRating[0].pop }
    ).exec();

    $where = { product_id: req.body.product_id };
    var ratingExist = await Rating.find($where).limit(5).populate("user_id");

    return res.json({
      status: 200,
      message: "Rating done successfully",
      data: ratingExist,
    });
  } else {
    return res.json({
      status: 500,
      message: "something went wrong",
    });
  }
};

module.exports.listRating = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    let errorsData = { product_id: "" };
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

  $where = { product_id: req.body.product_id };
  var ratingExist = await Rating.find($where).limit(5).populate("user_id");

  if (ratingExist) {
    return res.json({
      status: 200,
      data: ratingExist,
    });
  } else {
    return res.json({
      status: 400,
      message: "No rating available",
    });
  }
};
