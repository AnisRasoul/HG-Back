const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const auth = require("./routes/Auth");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const passport = require("./util/passport"); // Requiring the configured passport
const session = require("express-session");
require("dotenv").config(); // Ensure to load environment variables from .env file

const app = express();
app.use(cors());
app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

const mongoDBUri = process.env.MONGODB_URI;
mongoose
  .connect(mongoDBUri)
  .then(() => {
    console.log("Successfully connected");
  })
  .catch((error) => {
    console.error("Error connecting", error);
  });

app.get("/", (req, res) => {
  res.send("<a href='/google/login'>Login with Google</a>");
});

app.use(auth);
app.use(productRoutes);
app.use(orderRoutes);
app.use(paymentRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on: ${PORT}`);
});
