const express = require("express");
const bcrypt = require("bcryptjs");
const { signJWT, isAdmin } = require("../controllers/jwt");
const router = express.Router();
const logger = require("../logger");
const moment = require("moment");

const currentTime = moment().utc();

const {
  isUserRegistered,
  createUser,
  changePassword,
} = require("../controllers/users");

const getValidationFunction = require("../validations/login.validation");

router.post(
  "/login",
  getValidationFunction("login"),
  async (req, res, next) => {
    const { email, password } = req.body;

    try {
      logger.info(`tring to login - userName: ${email} - ${currentTime}`);
      if (!email || !password) res.send("no empty fields allowed");
      const result = await isUserRegistered(email);

      if (!result) throw new Error('Invalid UserName!"');
      const passwordIsValid = bcrypt.compareSync(password, result.password);
      if (!passwordIsValid) throw new Error('Invalid Password!"');
      if (result && passwordIsValid) {
        const token = await signJWT(result);
        logger.info(
          `currentTime: ${currentTime} ###### Logged User :${result.firstName}  Role : ${result.role}`
        );
        res.cookie("auth", token);
        let data = result.toJSON();
        delete data.password;
        return res.status(200).json({
          message: "login successful",
          data,
          accessToken: token,
        });
      }
    } catch (error) {
      logger.error(`${currentTime} - Login Failed - ${error.message} `);
      return res.json({
        message: `Login Failed - ${error.message}`,
        status: 500,
      });
    }
  }
);

router.post(
  `/register`,
  //getValidationFunction("register"),
  async (req, res, next) => {
    const { email } = req.body;
    try {
      // const result = await isUserRegistered(email);
      // if (result) throw new Error(`User ${result.email} is already exist`);
      const createNewUser = await createUser(req.body);
      if (createNewUser) {
        logger.info(
          `currentTime: ${currentTime} ###### Register New User :${email}`
        );
        return res.json({
          message: `Registration completed`,
          result: createNewUser,
        });
      } else throw new Error("Registration Failed");
    } catch (error) {
      logger.error(`${currentTime} - Registration Failed - ${error.message} `);
      return next({ message: error.message, status: 500 });
    }
  }
);

module.exports = router;
