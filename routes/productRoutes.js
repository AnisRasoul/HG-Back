const express = require("express");
const router = express.Router();
const productController = require("../controllers/product");


router.get("/categories", productController.getAllCategories);
router.get("/products", productController.getAllProducts);
router.get("/products/:category", productController.getProductsByCategory);
router.get("/category/:id", productController.getProductsSpecificCategory);
router.get("/product/:id", productController.getProduct);
router.delete(
  "/product/:id",
  productController.deleteProduct
);
router.delete(
  "/category/:id",
  productController.deleteCategory
);
router.post(
  "/product/create",
  productController.createProduct
);
router.post(
  "/category/create",
  productController.createCategory
);
router.put(
  "/product/:id",
  productController.updateProduct
);

module.exports = router;