const express = require("express");
const router = express.Router();
const orderController = require("../controllers/order");
const { protect, allowedTo } = require("../middlewares/authorization");


router.get("/orders",protect,allowedTo('admin','user'), orderController.getAllOrders);

router.get("/order/:id",protect,allowedTo('admin'), orderController.getOrderById);

router.post("/order",protect,allowedTo('admin','user'), orderController.createOrder);

router.put("/order/:id",protect,allowedTo('admin'), orderController.updateOrder);

router.delete("/order/:id",protect,allowedTo('admin'), orderController.deleteOrder);













module.exports = router;