const express = require("express");
const { restrict, protect } = require("../controller/authController");
const {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} = require("../controller/category");
const subCategoryRoute = require("./subCategoryRoute");
const app = express();
var router = express.Router();

// middleware to send any request on this endpoint to subcategory route

router.use("/:categoryId/subcategories", subCategoryRoute);

router.post("/", createCategory);
router.get("/", getCategories);
router.get("/:id", getCategoryById);
router.patch("/:id", updateCategory);
router.delete("/:id", protect, deleteCategory);

module.exports = router;

// protect, restrict("admin")
