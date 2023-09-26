const APIFeatures = require("../utils/apiFeatures");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

const createOne = (Model) => {
  return catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);
    doc["__v"] = undefined;
    res.status(201).json({
      status: "success",
      data: doc,
    });
  });
};

const getAll = (Model) => {
  return catchAsync(async (req, res, next) => {
    const features = new APIFeatures(Model, req.query)
      .filter()
      .sort()
      .fieldsLimiting()
      .pagination();

    const doc = await features.query;
    res.status(200).json({
      status: "success",
      results: doc.length,
      data: doc,
    });
  });
};

const getOne = (Model, popOptions) => {
  return catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id).select("-__v");
    if (popOptions) query = query.populate(popOptions);
    const doc = await query;

    if (!doc) {
      return next(new AppError("No document found with that ID.", 404));
    }
    res.status(200).json({
      status: "success",
      data: doc,
    });
  });
};

const updateOne = (Model) => {
  return catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!doc) {
      return next(new AppError("No document found with that ID.", 404));
    }
    res.status(200).json({
      status: "success",
      data: doc,
    });
  });
};

const deleteOne = (Model) => {
  return catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);
    if (!doc) {
      return next(new AppError("No document found with that ID.", 404));
    }
    res.status(204).json({ status: "success", data: null });
  });
};

module.exports = {
  createOne,
  getAll,
  getOne,
  updateOne,
  deleteOne
};
