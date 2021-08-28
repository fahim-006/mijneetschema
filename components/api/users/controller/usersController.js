const { validationResult } = require("express-validator");
const User = require("../../../../models/User");
const TrainerCategory = require("../../../../models/TrainerCategory");
const Video = require("../../../../models/Video");

module.exports.fetchTrainers = async (req, res) => {
  try {
    let limit = 9;
    let trainerList, totalPage;

    $where = {
      role: 2,
      isDeleted: false
    };
    if (req.query.trainerId != undefined || req.query.trainerId != null) {
      trainerList = await User.find({
        category_id: { $exists: 1 },
        _id: req.query.trainerId,
        isDeleted: false,
      }).populate("category_id");

      if (trainerList.length > 0) {
        res.send({
          status: 200,
          message: "Trainer fetched successfully",
          data: trainerList,
        });
      } else {
        throw new Error("user not found");
      }
    } else {
      if (req.query.category_id != undefined || req.query.category_id != null) {
        if (req.query.keyword != null || req.query.keyword != undefined) {
          console.log("-----both category and keyword-----");
          trainerList = await User.find({
            role: 2,
            category_id: { $exists: 1 },
            category_id: req.query.category_id,
            fullname: req.query.keyword,
            isDeleted: false
          })
            .populate("category_id")
            .limit(limit)
            .skip(parseInt(req.query.page_no - 1) * limit);

          totalPage = await User.find({
            role: 2,
            fullname: req.query.keyword,
            category_id: req.query.category_id,
            category_id: { $exists: 1 },
            isDeleted: false
          }).count();
        } else {
          console.log("-----only category-----");
          trainerList = await User.find({
            role: 2,
            category_id: { $exists: 1 },
            category_id: req.query.category_id,
            isDeleted: false
          })
            .populate("category_id")
            .limit(limit)
            .skip(parseInt(req.query.page_no - 1) * limit);
          totalPage = await User.find({
            role: 2,
            category_id: { $exists: 1 },
            category_id: req.query.category_id,
            isDeleted: false
          }).count();
        }
      } else if (req.query.keyword != null || req.query.keyword != undefined) {
        console.log("-----only keyword-----", req.query.keyword);
        trainerList = await User.find({
          role: 2,
          isDeleted: false,
          fullname: new RegExp(req.query.keyword, "i"),
        })
          .populate("category_id")
          .limit(limit)
          .skip(parseInt(req.query.page_no - 1) * limit);

        totalPage = await User.find({
          role: 2,
          fullname: new RegExp(req.query.keyword, "i"),
          isDeleted: false

        }).count();
      } else {
        console.log("-----only page-----");
        trainerList = await User.find($where)
          .populate("category_id")
          .limit(limit)
          .skip(parseInt(req.query.page_no - 1) * limit);

        totalPage = await User.find({ role: 2,isDeleted:false }).count();
      }

      return res.json({
        status: 200,
        message: "Trainer fetched succesfully",
        data: {
          trainer_list: trainerList,
          total_pages: Math.ceil(totalPage / limit),
        },
      });
    }
  } catch (error) {
    res.send({
      status: 400,
      message: error.message,
      data: {},
    });
  }
};

module.exports.fetchTrainerCategories = async (req, res) => {
  try {
    let trainerCategoryList = await TrainerCategory.find({isDeleted:false});

    return res.json({
      status: 200,
      message: "Trainer category list fetched successfully",
      data: {
        trainer_Category_list: trainerCategoryList,
      },
    });
  } catch (error) {
    res.send({
      status: 400,
      message: error.message,
      data: {},
    });
  }
};

module.exports.fetchTrainerVideo = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      let errorsData = { trainerId: "", pageNo: "" };
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

    let limit = 2;
    let skip = parseInt(req.query.pageNo - 1) * limit;
    console.log(limit, skip, "==============================");
    let trainerVideoList = await Video.find({ added_by: req.query.trainerId,isDeleted:false })
      .skip(skip)
      .limit(limit);

    let totalPages;
    let totalVideos = await Video.find({
      added_by: req.query.trainerId,
      isDeleted:false
    }).count();
    if (totalVideos) {
      totalPages = Math.ceil(totalVideos / limit);
    }
    return res.json({
      status: 200,
      message: "Trainer's video list fetched successfully",
      data: {
        trainer_Video_list: trainerVideoList,
        totalPages: totalPages,
      },
    });
  } catch (error) {
    res.send({
      status: 400,
      message: error.message,
      data: {},
    });
  }
};

module.exports.deleteVideo = async (req, res) => {
  console.log("-----------deleteVideo---------");
  let query = {
    _id: req.params.videoId,
  };
  let newData = {
    isDeleted: true,
    updated_at: created_date,
  };
  Video.findOneAndUpdate(query, newData, {
    returnNewDocument: true,
  })
    .then((data) => {
      res.send({
        status:200,
        message:"Video Deleted",
        data:data
      })
    })
    .catch((error) => {
      res.send({
        status:500,
        message:"Something went wrong.",
        data:{}
      })
    });
};

