const express = require("express");

const {
  createSubCategory,
  getSubCategories,
  getSubCategoryById,
  updateSubCategory,
  setCategoryIdToBody,
  subcategoryProducts,
  deleteSubCategory,
} = require("../controller/subCategory");
const { tokenValidate } = require("../middlewares/isTokenValid");
// merge params allow us to access paramters on other routers
// we need to access categoryId from category router
const router = express.Router({ mergeParams: true });

router.post("/", tokenValidate, createSubCategory);
router.get("/", getSubCategories);
router.get("/products/:id", subcategoryProducts);
router.get("/:id", getSubCategoryById);
router.patch("/:id", tokenValidate, updateSubCategory);
router.delete("/:id", tokenValidate, deleteSubCategory);

module.exports = router;
