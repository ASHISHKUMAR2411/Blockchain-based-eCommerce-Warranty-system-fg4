require("dotenv").config();
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var fs = require("fs");
var path = require("path");
var fileupload = require("express-fileupload");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var sellerRouter = require("./routes/sellers");
var productRouter = require("./routes/products");
var cartRouter = require("./routes/carts");
var orderRouter = require("./routes/orders");

var app = express();
app.use(
  fileupload({
    createParentPath: true,
  })
);
//Set up mongoose connection
var mongoose = require("mongoose");
var mongoDB = process.env.MONGO;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// app.use(
//   "/images",
//   express.static(path.join(__dirname, "./smart-contract/images/"))
// );

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/sellers", sellerRouter);
app.use("/products", productRouter);
app.use("/cart", cartRouter);
app.use("/orders", orderRouter);

module.exports = app;