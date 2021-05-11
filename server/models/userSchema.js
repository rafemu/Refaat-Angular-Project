const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const userSchema = mongoose.Schema({
  email: { type: String, require: true },
  firstName: { type: String, require: true },
  lastName: { type: String, require: true },
  password: { type: String, require: true },
  identify: { type: Number, require: true },
  cart: [],
  orders: [],
  address: [
    {
      city: {
        type: String,
        default: "",
      },
      streetAddress: {
        type: String,
        default: "",
      },
    },
  ],
  role: {
    type: String,
    enum: ["Admin", "User"],
    default: "User",
  },
  created: { type: Date, default: Date.now },
});
userSchema.statics.encryptPassword = async (password) => {
  const hash = await bcrypt.hash(password, 10);
  return hash;
};

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
