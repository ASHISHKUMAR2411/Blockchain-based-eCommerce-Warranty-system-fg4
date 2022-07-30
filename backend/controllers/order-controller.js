const Order = require("../models/orderSchema");
const mongoose = require("mongoose");
const {mintNFT} = require("../smart-contract/contracts/scripts/mintNFT.js")
const {getMetadata} = require("../smart-contract/pinata/index.js");
const Product = require("../models/productSchema");
const User = require("../models/userSchema");

const completeOrder = async (req, res) => {
  // try {
    
  // } catch (error) {
  //   console.log(error);
  //   res.status(400).send();
  // }
  try {
    const itemId = req.body.items.productId;
    const userId = req.body.userId;
    const product = await Product.findById(itemId);
    const user = await User.findById(userId);
    const toAddress = user.WalletAddress;
    console.log("toAdress" + toAddress);
    const uniqueId = Date.now();
    const tokenURI = await  getMetadata(
      product.title.shortTitle,
      product.title.longTitle,
      product.price.cost,
      product.category,
      product.tagline,
      product.waranty,
      product.img.substring(22),
      uniqueId
    );
    const mint = await mintNFT(tokenURI, toAddress);
    // const order = new Order({ ...req.body, orderDate: Date.now() });
    // const result = await order.save();

    //Backend work for smart contract
    // res.json({ orderId: result._id });
  } catch (error) {
    console.log(error);
    res.status(400).send();
  }
};

const getOrderDetails = async (req, res) => {
  try {
    const uId = mongoose.Types.ObjectId(req.body.userId);
    const result = await Order.aggregate([
      {
        $match: {
          userId: uId,
          paymentStatus: "Completed",
        },
      },
      {
        $lookup: {
          from: "products",
          localField: "items.productId",
          foreignField: "_id",
          as: "productDetails",
        },
      },
      { $sort: { orderDate: -1 } },
    ]);
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(400).send();
  }
};

module.exports = { completeOrder, getOrderDetails };
