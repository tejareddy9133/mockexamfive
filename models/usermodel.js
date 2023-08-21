const mongoose = require("mongoose");
const UserSchema = mongoose.Schema(
  {
    email: String,
    password: String,
    confirmpassword: String,
  },
  {
    versionKey: false,
  }
);
const UserModel = mongoose.model("users", UserSchema);
module.exports = { UserModel };
