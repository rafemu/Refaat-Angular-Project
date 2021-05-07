require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const createConnection = require("./connection/index");

const cors = require("cors");
const api = express();
api.use(cookieParser());
api.use(express.json());
api.use(cors());
createConnection();

const logger = require("./logger");

const productsRouter = require("./routes/products");
const categoriesRouter = require("./routes/categories");
//routes
// const login = require("./routes/login");

logger.info("Server started!");

///Validate Env Params
const envParams = [
  "MAX_SESSION_TIME",
  "PORT",
  "MONGODB_HOST",
  "MONGODB_USER",
  "MONGODB_PASSWORD",
  "MONGODB_DATABASE_NAME",
  "MONGODB_PORT",
];

function validateEnvParams() {
  envParams.forEach((envParamName) => {
    if (!process.env[envParamName]) {
      console.log("\x1b[33m%s\x1b[0m", `Missing env param: ${envParamName}`);
      logger.error(`Missing env param: ${envParamName}`);
      setTimeout(() => {
        process.exit(1);
      }, 2000);
    }
  });
}

validateEnvParams();

api.use((req, res, next) => {
  var allowedOrigins = ["http://localhost:3000", "*"];
  var origin = req.headers.origin;
  if (allowedOrigins.indexOf(origin) > -1) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.setHeader(
    "Access-Control-Allow-Headers",
    "x-access-token, Content-Type, Accept"
  );
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});

api.use(bodyParser.urlencoded({ extended: false }));

api.use(bodyParser.json());

api.get("/health-check", (req, res, next) => {
  res.send("Api Vacation working ");
});

// api.use("/auth", login);
api.use("/products", productsRouter);
api.use("/categories", categoriesRouter);

api.use((error, req, res, next) => {
  console.log("error handler", error);
  const status = error.status || 500;
  res.status(status).json(error.message);
});

api.listen(process.env.PORT, () => {
  console.log(`Server is listening to Port ${process.env.PORT}`);
});
