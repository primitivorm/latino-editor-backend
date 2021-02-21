if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

import "@babel/polyfill";

const express = require("express");
const bodyParser = require("body-parser");
const winston = require("winston");

if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  require("dotenv").config();
}

const myWinstonOptions = {
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "errors.log" }),
  ],
};
const logger = new winston.createLogger(myWinstonOptions);

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// routes
const runRoutes = require("./src/routes/run-latino");

app.get("/", (req, res, next) => res.send("It works!"));
app.get("/ping", (req, res, next) => res.send(JSON.stringify({ pong: true })));

app.use("/run", runRoutes.routes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  const err = new Error("Not Found");
  err.status = 404;
  return res.status(err.status).send(err);
});

// error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = err;
  logger.info(req.body);
  logger.error({ message: err.message, stack: err.stack });
  res.status(err.status || err.statusCode || 500);
  console.log(err);
  res.send(err);
});

module.exports = app;
