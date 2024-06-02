const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userController = require("../controllers/user");
const User = require('../models/User');
require('dotenv').config();

const router = express.Router();

router.get("/users",userController.getAllUsers);
router.get("/user/:id",userController.getUser);
router.delete("/user/:id", userController.deleteUserById);
router.post("/register", userController.register);
router.post("/login", userController.login);
router.put("/user/update/:id", userController.updateUser);
router.put("/user/updatepw/:id", userController.changeUserPassword);
router.post('/verifyToken', (req, res) => {
    try {
        const token = req.body.token;
        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                console.error('Failed to authenticate token:', err);
                return res.status(403).json({ message: 'Failed to authenticate token' });
            }
            res.status(200).json({ message: 'Token is valid' });
        });
    } catch (error) {
        console.error('Error verifying token:', error);
        res.status(500).json({ message: 'Error verifying token', error });
    }
});

module.exports = router;
