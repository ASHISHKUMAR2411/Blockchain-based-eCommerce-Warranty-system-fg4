import React, { useEffect, useState } from "react";
import { Box, makeStyles, Typography, Button, Grid } from "@material-ui/core";
// import { useSelector, useDispatch } from "react-redux";

import { getCartItems } from "../actions/cartActions";
import { Route, Switch, useNavigate } from "react-router";
import CartItem from "../components/cart/CartItem";
// import TotalView from "../components/cart/TotalView";
// import EmptyCart from "../components/cart/EmptyCart";
import LoaderSpinner from "../components/LoaderSpinner";
import Footer from "../components/footer/Footer";
import ToastMessageContainer from "../components/ToastMessageContainer";
import authentication from "../adapters/authentication";

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

const Cart = ({ isAuthenticate, cartItems, userInfo }) => {
  const classes = useStyle();
  const [isLoading, setIsLoading] = useState(true);
  const history = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
    // if (isAuthenticate) {
    //   getCartItems(isAuthenticate, cartItems, userInfo).then((data) => {
    //     updateCartItems(data);
    //     setCartLength(data.length);
    //   });
    // }
  }, [isAuthenticate]);

  const placeOrder = () => {
    window.location.replace("/checkout?init=true");
  };

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
            {/* <TotalView /> */}
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
