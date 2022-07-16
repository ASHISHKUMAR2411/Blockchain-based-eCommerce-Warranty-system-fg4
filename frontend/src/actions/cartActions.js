// import * as actionType from "../action-type/cartActionType";
import axios from "axios";

export const addToCart = async (item, isAuthenticate, user, cartItems) => {
  const existItem = cartItems.find((product) => product._id === item._id);
  
  if (!existItem) {
    if (isAuthenticate) {
      try {
        await axios.post("/cart/add-item", {
          userId: user._id,
          productId: item._id,
        });
      } catch (error) {}
    }
  }
};

// export const removeFromCart = (id) => async (dispatch, getState) => {
//   const { isAuthenticate, user } = getState().userReducer;
//   if (isAuthenticate) {
//     try {
//       await axios.delete("/cart/remove-item", {
//         data: {
//           userId: user._id,
//           productId: id,
//         },
//       });
//     } catch (error) {}
//   }
//   dispatch({
//     type: actionType.REMOVE_FROM_CART,
//     payload: {
//       id: id,
//     },
//   });
// };

// export const clearCart = () => async (dispatch, getState) => {
//   const { isAuthenticate, user } = getState().userReducer;

//   if (isAuthenticate) {
//     try {
//       await axios.delete("/cart/clear-cart", {
//         data: {
//           userId: user._id,
//         },
//       });
//     } catch (error) {}
//   }
//   dispatch({
//     type: actionType.CLEAR_CART,
//     payload: {},
//   });
// };

export const getCartItems = async (isAuthenticate, cartItems, userId) => {
  console.log(isAuthenticate);
  console.log(cartItems);
  console.log(userId);
    try {
      const { data } = await axios.get(`/cart/get-items/${userId._id}`);
      if (data.length > 0) {
        data?.map((value) => {
          var isExist = false;
          cartItems.forEach((item) => {
            if (item._id == value.productDetails[0]._id) {
              isExist = true;
            }
          });
          if (!isExist) {
            cartItems.push(value.productDetails[0]);
          }
        });
        return cartItems;
      }
    } catch (error) {
      console.log(error);
      return cartItems;
    }
};

export const updateQty = (productId, qty) => {
  return {
    
  };
};
