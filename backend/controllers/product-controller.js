const Product = require("../models/productSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");
var fs = require("fs");
var path = require("path");

var multer = require("multer");

const getProducts = async (req, res) => {
  try {
    const key = req.params.key;
    const result = await Product.find({
      "title.longTitle": {
        $regex: new RegExp(key),
        $options: "i",
      },
    });
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const getSellersProducts = async (req, res) => {
  const token = req.cookies.auth_token;
  try {
    if (token) {
      const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
      const userInfo = await User.findOne(
        { _id: verifyToken._id, "tokens.token": token },
        { password: 0, tokens: 0 }
      );

      //get Result
      const user = userInfo._doc;
      if (user.role != "seller") {
        throw new error();
      }
      const result = await Product.find({
        sellerId: user._id,
      });
      console.log("products");
      res.status(201).json(result);
    } else {
      throw new error();
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const addProducts = async (req, res) => {
  const token = req.cookies.auth_token;

  try {
    if (token) {
      const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
      const userInfo = await User.findOne(
        { _id: verifyToken._id, "tokens.token": token },
        { password: 0, tokens: 0 }
      );
      const user = userInfo._doc;
      if (user.role != "seller") {
        throw new error();
      }
      const url = req.protocol + "://" + req.get("host");
      const file = req.files.file;
      console.log(file);
      file.mv("./public/images/" + file.name);
      const product = new Product(req.body);
      product.img = url + "/images/" + file.name;
      console.log(product);
      product.sellerId = user._id;
      await product.save();
      res.status(201).json({ code: 201, productAdded: true });
    } else {
      throw new error();
    }
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ code: 400, message: "invalid data or invalid syntax" });
  }
};

const getProductById = async (req, res) => {
  const productId = req.params.id;
  try {
    const result = await Product.findById(productId);
    console.log(result);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const getProductByCategory = async (req, res) => {
  const pCategory = req.params.categoryName;
  try {
    const result = await Product.find({ category: pCategory });
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

module.exports = {
  getProducts,
  addProducts,
  getProductById,
  getProductByCategory,
  getSellersProducts,
};
