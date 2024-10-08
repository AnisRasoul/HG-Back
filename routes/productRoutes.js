const express = require("express");
const router = express.Router();
const productController = require("../controllers/product");
const { protect, allowedTo } = require("../middlewares/authorization");
const upload = require("../middlewares/multer");

router.get("/products",protect,allowedTo('user', 'admin'), productController.getAllProducts);

router.get("/products/:category",protect,allowedTo('admin', 'user'), productController.getProductsByCategory);

router.get("/category/:id",protect,allowedTo('admin'), productController.getProductsSpecificCategory);

router.get("/product/:id",protect,allowedTo('admin', 'user'), productController.getProduct);

router.post("/product/create",protect,allowedTo('admin'), productController.createProduct);

router.post("/category/create",protect,allowedTo('admin'), productController.createCategory);

router.put("/product/:id",protect,allowedTo('admin'), productController.updateProduct);

router.delete("/product/:id",protect,allowedTo('admin'), productController.deleteProduct);

router.delete("/category/:id",protect,allowedTo('admin'),productController.deleteCategory);

router.post('/upload',upload, productController.uploadProductImages);

module.exports = router;