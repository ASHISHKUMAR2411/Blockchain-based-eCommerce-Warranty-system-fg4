import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";

import clsx from "clsx";
import { Button, Box, makeStyles } from "@material-ui/core";
import { ShoppingCart as Cart, FlashOn as Flash } from "@material-ui/icons";
import FavoriteIcon from "@material-ui/icons/Favorite";

import toastMessage from "../../utils/toastMessage";
import { addToCart } from "../../actions/cartActions";
// import {
//   addToWishlist,
//   getWishlistItems,
//   removeFromWishlist,
// } from "../../actions/wishlistActions";

const useStyle = makeStyles((theme) => ({
  leftContainer: {
    minWidth: "40%",

    textAlign: "center",
    padding: "20px 40px 0 20px",
    [theme.breakpoints.down("md")]: {
      padding: "20px 40px",
    },
  },
  imageBox: {
    padding: "10px",
    border: "1px solid #f0f0f0",
    width: "100%",
    height: 350,
  },
  image: {
    objectFit: "contain",
    height: "90%",
    width: "90%",
  },
  favorite: {
    cursor: "pointer",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    left: "91%",
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    border: "1px solid #f0f0f0",
    boxShadow: "0 1px 4px 0 rgb(0 0 0 / 10%)",
    background: "#fff",
    color: "#c2c2c2",
  },
  button: {
    width: "40%",
    borderRadius: 2,
    height: 50,
  },
  addToCart: {
    background: "#ff9f00",
    color: "#FFF",
  },
  buyNow: {
    background: "#fb641b",
    color: "#FFF",
  },
  red: {
    color: "#ff4343",
  },
}));

const ProductImageSlider = ({
  product,
  isAuthenticate,
  user,
  cartItems,
}) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const classes = useStyle();
  const history = useNavigate();
  const { id } = useParams();

  const addItemToCart = () => {
    addToCart(product, isAuthenticate, user, cartItems);
    history("/cart");
  };
  
  return (
    <Box className={classes.leftContainer}>
      <Box className={classes.imageBox}>
        <img
          src={product.detailUrl}
          className={classes.image}
          alt={product.title.longTitle}
        />
      </Box>
      <br />  
      <Button
        onClick={() => addItemToCart()}
        className={clsx(classes.button, classes.addToCart)}
        style={{ marginRight: 10, backgroundColor: "#ff9f00" }}
        variant="contained"
      >
        <Cart />
        Add to Cart
      </Button>
      <Button
        onClick={() => addItemToCart()}
        className={clsx(classes.button, classes.buyNow)}
        variant="contained"
        style={{ backgroundColor: "#fb641b" }}
      >
        <Flash /> Buy Now
      </Button>
    </Box>
  );
};

export default ProductImageSlider;
