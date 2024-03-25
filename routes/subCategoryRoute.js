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

// merge params allow us to access paramters on other routers
// we need to access categoryId from category router
const router = express.Router({ mergeParams: true });

router.post("/", createSubCategory);
router.get("/", getSubCategories);
router.get("/product/:id", subcategoryProducts);
router.get("/:id", getSubCategoryById);
router.patch("/:id", updateSubCategory);
router.delete("/:id", deleteSubCategory);

module.exports = router;
