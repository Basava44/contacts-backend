// Schemaa is a structure of a object which defines contents of a object

const mongoose = require("mongoose");

const contactSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      // required: [true/false, 'Error Message in case of not sent in payload']
      required: [true, "Please add Contact Name"],
    },
    email: {
      type: String,
      required: [true, "Please add the Email Address"],
    },
    phone: {
      type: String,
      required: [true, "Please add the Phone Number"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Contact", contactSchema);
