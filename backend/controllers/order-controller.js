const Order = require("../models/orderSchema");
const mongoose = require("mongoose");

const completeOrder = async (req, res) => {
  try {
    const order = new Order({ ...req.body, orderDate: Date.now() });
    const result = await order.save();
    const itemId = req.body.items.productId;
    const userId = req.body.userId;
    //Backend work for smart contract
    res.json({ orderId: result._id });
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
