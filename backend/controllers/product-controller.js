const Product = require("../models/productSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");

const getProducts = async (req, res) => {
  try {
    const key = req.params.key;
    const result = await Product.find({
      "title.longTitle": {
        $regex: new RegExp(key),
        $options: "i",
      },
    });
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const addProducts = async (req, res) => {
  const token = req.cookies.auth_token;
    
    try{
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
      }else{
        throw new error();
      }
        const product = new Product(req.body);
        await product.save();
        res.status(201).json({ code: 201, productAdded: true });
    }catch(error){
        console.log(error);
        res
          .status(400)
          .json({ code: 400, message: "invalid data or invalid syntax" });
    }
}

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
};

