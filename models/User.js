const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  passwordChangedAt: {
    type: Date,
    default: Date.now(),
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  address: {
    city: String,
    street: String,
    zipcode: String,
  },
  phone: {
    type: String,
  },
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    },
  ],
});

UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    try {
      this.password = await bcrypt.hash(this.password, 10);
      next();
    } catch (error) {
      next(error);
    }
  } else {
    next();
  }
});

UserSchema.statics.findOrCreate = async function (profile) {
  let user = await this.findOne({ email: profile.emails[0].value });
  if (!user) {
    user = await this.create({
      username: profile.displayName,
      email: profile.emails[0].value,
      password: bcrypt.hashSync(profile.id, 10),
      isVerified: true,
    });
  }
  return user;
};

module.exports = mongoose.model("User", UserSchema);
