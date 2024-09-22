const express = require('express');
const userController = require("../controllers/user");
const { protect, allowedTo, verifyToken } = require("../middlewares/authorization");

require('dotenv').config();
const router = express.Router();

router.get("/users",protect,allowedTo('admin'), userController.getAllUsers);

router.get("/user/:id",protect,allowedTo('admin'),userController.getUser);

router.post("/register", userController.register);

router.post("/login", userController.login);

router.post('/verifyToken', verifyToken);

router.put("/user/update/:id",protect,allowedTo('user'), userController.updateUser);

router.put("/user/updatepw/:id",protect,allowedTo('user'), userController.changeUserPassword);

router.delete("/user/:id",protect,allowedTo('admin'), userController.deleteUserById);

module.exports = router;
