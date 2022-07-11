require("dotenv").config();
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var productRouter = require("./routes/products");

var app = express();

//Set up mongoose connection
var mongoose = require("mongoose");
var mongoDB =
  "mongodb://database_anurag:Anu122504@ac-m6cvwyv-shard-00-00.mjtdslt.mongodb.net:27017,ac-m6cvwyv-shard-00-01.mjtdslt.mongodb.net:27017,ac-m6cvwyv-shard-00-02.mjtdslt.mongodb.net:27017/?ssl=true&replicaSet=atlas-qa2kl6-shard-0&authSource=admin&retryWrites=true&w=majority";
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/products", productRouter);

module.exports = app;
