const express = require("express");
const app = express();
const morgan = require("morgan"); //logs the request
const bodyParser = require("body-parser"); //Formatting url encoded data and json
const mongoose = require("mongoose");

const productsRoute = require("./api/routes/products");
const orderRoute = require("./api/routes/orders");

mongoose.connect(
  `mongodb+srv://kakwiri:${process.env.MONGO_ATLAS_PW}@node-shop.gkf7qor.mongodb.net/?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
  }
);

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Handling  cors error
app.use((req, res, next) => {
  res.header("Access-Controll-Allow-Origin", "*");
  res.header(
    "Access-Controll-Allow-Headers",
    "Origin,X-Requsted-With,Content-Type,Accept,Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT,POST,PATCH,DELETE,GET");
    return res.status(200).json({});
  }
  next();
});

app.use("/products", productsRoute);
app.use("/orders", orderRoute);

//handling errors
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
