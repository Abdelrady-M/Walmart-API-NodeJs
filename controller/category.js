const categoryModel = require("../models/category");
const subCategoryModel = require("../models/subCategory");
const asyncHandler = require("express-async-handler");

// @desc   Get list of categories
// @route  GET /categories
// @access Public
const getCategories = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 10;
  const skip = (page - 1) * limit;
  // (2-1)*5=5
  const returnedCategory = await categoryModel
    .find({})
    .populate("name")
    .skip(skip)
    .limit(limit);
  res
    .status(200)
    .json({ result: returnedCategory.length, page, data: returnedCategory });
});

// @desc   Create Category
// @route  POST /categories
// @access Private
const createCategory = async (req, res) => {
  const category = req.body;
  try {
    const createdCategory = await categoryModel.create(category);
    res.status(201).json({
      message: "Category has been created succesfully",
      data: createdCategory,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get specific category by ID
// @route   GET /categories/:id
// @access  Public
const getCategoryById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const foundCategoryById = await categoryModel.findById(id).exec();
    if (foundCategoryById) {
      res.status(200).json({ data: foundCategoryById });
    }
  } catch (error) {
    res.status(404).json({ message: `No category for this id ${id}` });
  }
});

// @desc   update specific category
// @route  PATCH /categories/:id
// @access Private

// new:true -> to return the updated category, NOT before the update.
const updateCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // const { name } = req.body;
  category = await categoryModel.findOneAndUpdate({ _id: id }, req.body);
  category
    ? res.status(200).json({ data: category })
    : res.status(404).json({ message: `No category for this id ${id}` });
});

// @desc   Delete specific category
// @route  DELETE /categories/:id
// @access Private
const deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const deletedCategory = await categoryModel.findByIdAndDelete({ _id: id });
  deletedCategory
    ? res.status(200).json({
        message: "Category has been deleted succesfully",
        data: deletedCategory,
      })
    : res.status(404).json({ message: `No category for this ${id}` });
});
module.exports = {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
