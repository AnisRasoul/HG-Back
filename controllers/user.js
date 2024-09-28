const { createUser,validatePassword,findAllUser,findUser,deleteUser,updateUser } = require("../services/user.service");
require('dotenv').config
const { signJwt, verifyJwt } = require("../util/jwt");
const bcrypt = require("bcrypt");
const sendMail = require("../util/nodemailer");

exports.register = async (req, res, next) => {
  try {
      const { username, email, password, address, phone } = req.body;
      if (await findUser({ email }))
          return res.status(400).json({ message: "Email already exists" });
      else if (await findUser({ username }))
          return res.status(400).json({ message: "Username already exists" });

      const user = await createUser({
          username,
          email,
          password,
          address,
          phone,
      });

      if (user) {
          delete user.password;
          token = signJwt(user);
          const verificationUrl = `${process.env.BASE_URL}/verifyMail/${user._id}/${token}`;
          const message = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
              <h2 style="color: #333;">Welcome to HigherGravity, ${user.username}!</h2>
              <p style="font-size: 16px; color: #555;">
                Please complete your registration by clicking the button below:
              </p>
              <a href="${verificationUrl}" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px;">
                Verify Email
              </a>
              <p style="font-size: 14px; color: #999; margin-top: 20px;">
                If you did not sign up for this account, please ignore this email.
              </p>
            </div>
          `;
          
          // Use 'message' as the HTML content here
          await sendMail(user.email, 'Email Verification', message);
          return res.status(201).json({ message: "An Email sent to your account please verify" });
      } else {
          return res.status(400).json({ message: "Failed to add User" });
      }
  } catch (err) {
      next(err);
  }
};

  exports.verifyMail = async (req, res) => {
    try {
      const user = await findUser({ _id: req.params.id });
      if (!user) return res.status(400).send("Invalid link");
  
      // Verify the token directly
      const token = verifyJwt(req.params.token, process.env.JWT_SECRET);
      if (!token) return res.status(400).send("Invalid or expired token");
  
      await updateUser({ _id: user._id }, { isVerified: true });
      res.status(200).send(`
        <div style="display: flex; justify-content: center; align-items: center; height: 100vh; background-color: #f4f4f4; font-family: Arial, sans-serif;">
          <div style="text-align: center; padding: 20px; background-color: #fff; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
        <h2 style="color: #28a745;">Email Verified Successfully!</h2>
        <p style="font-size: 16px; color: #333;">You will be redirected to the login page in a moment...</p>
        <p style="font-size: 14px; color: #999; margin-top: 20px;">Thank you for verifying your email.</p>
          </div>
        </div>
        <script>
          setTimeout(function() {
        window.location.href = 'https://highergravity.vercel.app/login';
          }, 1000);
        </script>
      `);
    } catch (error) {
      log
      res.status(400).send("An error occurred");
    }
  };
  
  exports.login = async (req, res, next) => {
    try {
      const user = await validatePassword(req.body);
      if (!user)
        return res.status(400).json({ message: "Email or Password is invalid" });
      delete user.password;
      delete user.email;
      return res.status(200).json({ user, token: signJwt(user) });
    } catch (err) {
      next(err);
    }
  };
  exports.getAllUsers = async (req, res, next) => {
    try {
      const allUsers = await findAllUser();
      if (!allUsers) {
        return res.status(400).json({ message: "Failed to get users" });
      }
  
      return res.status(200).json(allUsers);
    } catch (err) {
      next(err);
    }
  };
   
  exports.getUser = async (req, res, next) => {
    try {
      const user = await findUser({ _id: req.params.id });
      if (!user) return res.status(400).json({ message: "User is invalid" });
      delete user._doc.password;
      delete user._doc.email;
      return res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  };
  
  exports.deleteUserById = async (req, res, next) => {
    try {
      const user = await deleteUser(req.params.id);
      if (user.deletedCount === 1)
        return res.status(200).json({ message: "User deleted successfully" });
      if (user.deletedCount === 0)
        return res.status(400).json({ message: "The user has not been deleted" });
    } catch (err) {
      next(err);
    }
  };

  exports.changeUserPassword = async (req, res, next) => {
    try {
      const oldUser = await findUser({ _id: req.params.id });
      if (!oldUser)
        return res
          .status(400)
          .json({ message: `No user for this id ${req.params.id}` });
  
      comparePw = await bcrypt.compare(req.body.oldPassword, oldUser.password);
      if (!comparePw)
        return res.status(400).json({ message: "Old password is invalid" });
  
      const user = await updateUser(req.params.id, {
        password: await bcrypt.hash(req.body.password, 11),
        passwordChangedAt: Date.now(),
      });
      if (!user)
        return res
          .status(400)
          .json({ message: `No user for this id ${req.params.id}` });
      res.status(201).json({ message: "Password changed successfully" });
    } catch (err) {
      next(err);
    }
  };
  
  exports.updateUser = async (req, res, next) => {
    try {
      const user = await updateUser(req.params.id, {
        username: req.body.username,
        address: req.body.address,
        phone: req.body.phone,
      });
      if (!user)
        return res
          .status(400)
          .json({ message: `No user for this id ${req.params.id}` });
      res.status(201).json({ message: "User updated successfully" });
    } catch (err) {
      next(err);
    }
  };