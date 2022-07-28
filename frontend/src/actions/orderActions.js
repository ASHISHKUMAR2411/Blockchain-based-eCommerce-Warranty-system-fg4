import * as actionType from "../action-type/orderActionType";
import axios from "axios";

export const setOrderItems = (cartItems) => {
  let orderItems = [];
  if (cartItems) {
    cartItems.map((item) => {
      orderItems.push({
        productId: item._id,
        qty: item.qty,
        price: item.price?.cost,
      });
    });
  }
  return {
    type: actionType.SET_ORDER_ITEMS,
    payload: {
      orderItems,
    },
  };
};

export const getOrderDetails = async (isAuthenticate, user) => {
  if (isAuthenticate) {
    try {
      const { data } = await axios.post("/orders/get-order-details", {
        userId: user._id,
      });
      return data;
    } catch (error) {
      console.log(error);
      return [];
    }
  }
};

export const setTotalAmount = (totalAmount) => {
  return {
    type: actionType.SET_TOTAL_AMOUNT,
    payload: {
      price: totalAmount,
    },
  };
};