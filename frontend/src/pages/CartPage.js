import React, { useEffect, useState } from "react";
import { Box, makeStyles, Typography, Button, Grid } from "@material-ui/core";
import axios from "axios";

import { getCartItems } from "../actions/cartActions";
import { Route, Switch, useNavigate } from "react-router";
import CartItem from "../components/cart/CartItem";
import TotalView from "../components/cart/TotalView";
import LoaderSpinner from "../components/LoaderSpinner";
import Footer from "../components/footer/Footer";
import ToastMessageContainer from "../components/ToastMessageContainer";
import authentication from "../adapters/authentication";
import toastMessage from "../utils/toastMessage";

const useStyle = makeStyles((theme) => ({
  component: {
    marginTop: 55,
    padding: "30px 6%",
    display: "flex",
  },
  leftComponent: {
    paddingRight: 15,
    [theme.breakpoints.between(0, 960)]: {
      paddingRight: 0,
      marginBottom: 20,
    },
  },
  header: {
    padding: "15px 24px",
    background: "#fff",
  },
  bottom: {
    padding: "16px 22px",
    background: "#fff",
    boxShadow: "0 -2px 10px 0 rgb(0 0 0 / 10%)",
    borderTop: "1px solid #f0f0f0",
  },
  placeOrder: {
    display: "flex",
    marginLeft: "auto",
    background: "#fb641b",
    color: "#fff",
    borderRadius: 2,
    width: 250,
    height: 51,
  },
}));

const Cart = ({
  isAuthenticate,
  cartItems,
  userInfo,
  updateCart,
  walletAddress,
  walletBalance,
}) => {
  const classes = useStyle();
  const [isLoading, setIsLoading] = useState(true);
  const [orderItems, setorderItems] = useState();
  const [TotalAmount, settotalAmount] = useState(0);
  const history = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
    // updateCart();
    console.log(cartItems);
    // cartItems.map((item) => {
    //   setorderItems({
    //     productId: item._id,
    //     price: item.mrp
    //   });
    // });
  }, [isAuthenticate]);
  function updateTotalAmount(value) {
    settotalAmount(value);
  }
  const placeOrder = async () => {
    if (walletBalance < 0.01) {
      toastMessage("Insufficient Metamask Balance!");
    } else {
      try {
        await axios.post("/orders/complete-order", {
          items: {
            productId: cartItems[0]._id,
            price: cartItems[0].price.cost,
          },
          userId: userInfo._id,
          totalAmount: cartItems[0].price.cost,
          paymentStatus: "Completed",
        });
        clearCart();
        window.location.replace("/");
        toastMessage("Order Placed!");
      } catch (error) {
        toastMessage("Order Failed! Please Try again");
      }
    }
  };

  const clearCart = async () => {
    await axios.delete("/cart/clear-cart", {
      userId: userInfo._id,
    });
  }

  return isLoading ? (
    <LoaderSpinner />
  ) : (
    <>
      {cartItems.length ? (
        <Grid container className={classes.component}>
          <Grid
            item
            lg={9}
            md={9}
            sm={12}
            xs={12}
            className={classes.leftComponent}
          >
            <Box className={classes.header}>
              <Typography style={{ fontWeight: 600, fontSize: 18 }}>
                My Cart ({cartItems?.length})
              </Typography>
            </Box>
            {cartItems.map((item) => (
              <CartItem
                item={item}
                isAuthenticate={isAuthenticate}
                userInfo={userInfo}
                updateCart={updateCart}
              />
            ))}
            <Box className={classes.bottom}>
              <Button
                onClick={placeOrder}
                variant="contained"
                className={classes.placeOrder}
                style={{ backgroundColor: "#fb641b" }}
              >
                Place Order
              </Button>
            </Box>
          </Grid>
          <Grid item lg={3} md={3} sm={12} xs={12}>
            <TotalView
              cartItems={cartItems}
              totalAmount={TotalAmount}
              updateTotalAmount={updateTotalAmount}
            />
          </Grid>
        </Grid>
      ) : (
        <>
          <h1>Cart Page</h1>
          {/* <EmptyCart /> */}
          <Footer />
        </>
      )}
      <ToastMessageContainer />
    </>
  );
};

export default Cart;
