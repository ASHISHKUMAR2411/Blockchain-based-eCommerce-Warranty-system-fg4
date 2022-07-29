const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  items: [
    {
      productId: {
        type: mongoose.Schema.ObjectId,
        required: true,
      },
      price: Number,
    },
  ],
  userId: {
    type: mongoose.Schema.ObjectId,
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  transactionId: String,
  paymentStatus: String,
  orderDate: Date,
});

const Order = new mongoose.model("order", orderSchema);

module.exports = Order;
