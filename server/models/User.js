const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config.js");

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;


const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    require: true,
    validate: {
      validator: function (value) {
        return emailRegex.test(value);
      },
      message: "Please enter a valid email",
    },
  },
  password: {
    type: String,
    require: [true, ["Please enter your password"]],
    minLength: [6, "Password must be at least 6 characters"],
  },

  photo: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },

});
// Hash the password before saving and updating
userSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) {
      return next();
    }
    const hashed = await bcrypt.hash(this.password, 10);
    this.password = hashed;
    return next();
  } catch (err) {
    return next(err);
  }
});

userSchema.methods.generateAuthToken = async function () {
  try {
    const token = jwt.sign(
      {
        _id: this._id,
        username: this.username,
      },
      JWT_SECRET
    );
    return token;
  } catch (err) {
    throw new Error(err);
  }
};

userSchema.methods.comparePassword = async function (password) {
  try {
    const isMatch = await bcrypt.compare(password, this.password);
    return isMatch;
  } catch (err) {
    throw new Error(err);
  }
};

const User = model("User", userSchema);

module.exports = User;
