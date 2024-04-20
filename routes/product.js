var express = require(`express`);
var router = express.Router();
var productController = require(`../controller/product`);
// const { protect } = require("../controller/authController");

router.get('/search', productController.searchProducts);
router.get(`/`, productController.getProducts);
router.get("/:id", productController.getProductById);
router.get('/category/:categoryName', productController.getProductsByCategory);
router.post(`/`, productController.saveProduct);
router.patch("/:id", productController.updateProduct);
router.delete("/:id", productController.deletProduct);

module.exports = router;
