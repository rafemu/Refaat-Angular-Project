const userModel = require("../models/userSchema");
const bcrypt = require("bcryptjs");
const helpers = require("./../helpers/helper");

async function isUserRegistered(email) {
  const result = await userModel.findOne({ email: email.toLowerCase() });
  return result;
}

// async function isUserExist(id) {
//   const [rows] = await (
//     await connection()
//   ).execute("SELECT * FROM users where id = ?", [id]);
//   return rows[0];
// }

async function createUser(userValues) {
  const hashPassword = bcrypt.hashSync(userValues.password, 10);
  const userObj = {
    email: userValues.email,
    firstName: userValues.firstName,
    lastName: userValues.lastName,
    password: hashPassword,
    identify: userValues.identify,
  };
  const result = await userModel.create(userObj);
  return result;
}

module.exports = {
  isUserRegistered,
  // isUserExist,
  createUser,
};
