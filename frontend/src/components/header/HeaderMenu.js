import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Button,
  makeStyles,
  Box,
  Typography,
  Badge,
  Dialog,
  DialogContent,
} from "@material-ui/core";
import { Link, useLocation } from "react-router-dom";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { getCartItems } from "../../actions/cartActions";
import authentication from "../../adapters/authentication";
// import toastMessage from "../../utils/toastMessage";

import AuthPage from "../../pages/AuthPage";
import ProfileMenu from "./ProfileMenu";
// import { clearCart } from "../../actions/cartActions";

const useStyles = makeStyles((theme) => ({
  headerMenu: {
    display: "flex",
    alignItems: "center",
    margin: "0 7% 0 auto",
    "& > *": {
      marginRight: 30,
    },
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
  login_btn: {
    color: "#2874f0",
    marginLeft: "7%",
    fontWeight: 600,
    textTransform: "capitalize",
    cursor: "pointer",
    borderRadius: 2,
    height: 35,
    padding: "5px 35px",
    border: "1px solid #dbdbdb",
    boxShadow: "none",
  },
  menu_link: {
    display: "flex",
  },
  menu_more: {
    fontSize: "1rem",
    fontWeight: 500,
    TextDecoration: "none",
  },
  menu_cart: {
    marginLeft: "5px",
    fontSize: "1rem",
    fontWeight: 500,
    TextDecoration: "none",
  },
}));

function HeaderMenu({
  updateIsAuthenticate,
  isAuthenticate,
  updateUserInfo,
  cartItems,
  updateIsUser,
  userInfo,
  updateCartItems,
  cartLength,
  updateCartLength,
  walletAddress,
}) {
  const [open, setOpen] = useState(false);
  const [popupLogin, setPopupLogin] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [cartLength, setCartLength] = useState(0);

  function updateOpen(value) {
    setOpen(value);
  }
  function updatePopupLogin(value) {
    setPopupLogin(value);
  }
  function updateIsModalOpen(value) {
    setIsModalOpen(value);
  }
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === "/login") {
      setPopupLogin(false);
    } else {
      setPopupLogin(true);
    }
    // if (!isAuthenticate) {
    //   authentication().then((res) => {
    //     updateIsAuthenticate(res.isAuth);
    //     updateUserInfo(res.user);
    //   });
    // }
  }, [location.pathname, isAuthenticate]);

  useEffect(() => {
    if (isAuthenticate) {
      getCartItems(isAuthenticate, cartItems, userInfo).then((data) => {
        updateCartItems(data);
        updateCartLength(data.length);
      });
    }
  }, [userInfo]);

  const classes = useStyles();

  const logout = async () => {
    try {
      await axios.get("/users/logout", {
        withCredentials: true,
      });
      updateUserInfo({});
      updateIsAuthenticate(false);
      window.location.replace("/");
    } catch (error) {
      //   toastMessage("Something went wrong. Please try again later", "error");
    }
  };

  const handleClickOpen = () => {
    setIsModalOpen(true);
  };
  const handleClose = () => {
    setIsModalOpen(false);
  };

  return (
    <Box className={classes.headerMenu}>
      {isAuthenticate ? (
        <ProfileMenu logout={logout} />
      ) : (
        <Button
          variant="contained"
          style={{ backgroundColor: "#fff" }}
          className={classes.login_btn}
          onClick={() => {
            if (popupLogin) handleClickOpen();
          }}
        >
          Login
        </Button>
      )}

      <Link to="/games">
        <Box className={classes.menu_link}>
          <Typography className={classes.menu_more}>Games</Typography>
          {/* <ExpandMoreIcon /> */}
        </Box>
      </Link>
      <Link to="/cart">
        <Box className={classes.menu_link}>
          <ShoppingCartIcon />
          {cartLength > 0 && (
            <Badge badgeContent={cartItems.length} color="secondary"></Badge>
          )}
          <Typography className={classes.menu_cart}>Cart</Typography>
        </Box>
      </Link>

      {/* ########## Login Dialog Box  #########*/}
      <Dialog onClose={handleClose} open={isModalOpen}>
        <DialogContent style={{ width: "100%" }}>
          <AuthPage
            popup={true}
            updateIsAuthenticate={updateIsAuthenticate}
            updateIsModalOpen={updateIsModalOpen}
            isAuthenticate={isAuthenticate}
            updateUserInfo={updateUserInfo}
            updateIsUser={updateIsUser}
            userInfo={userInfo}
            updateCartItems={updateCartItems}
            cartItems={cartItems}
            walletAddress={walletAddress}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
}

export default HeaderMenu;
