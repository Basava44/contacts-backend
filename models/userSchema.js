// Schemaa is a structure of a object which defines contents of a object

const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "please add username"],
    },
    email: {
      type: String,
      required: [true, "please add user email address"],
      unique: [true, "Email Address already taken"],
    },
    password: {
      type: String,
      required: [true, "Please add user password"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
