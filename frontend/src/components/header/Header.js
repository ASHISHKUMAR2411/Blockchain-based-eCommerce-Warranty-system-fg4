import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  makeStyles,
  Box,
  Typography,
  IconButton,
  Drawer,
} from "@material-ui/core";
import { Menu } from "@material-ui/icons";

import SearchBar from "./SearchBar";
import HeaderMenu from "./HeaderMenu";

const useStyle = makeStyles((theme) => ({
  header: {
    backgroundColor: "#2874f0",
    height: 60,
    paddingLeft: "10%",
    lineHeight: 0,
    display: "flex",
    justifyContent: "center",
    boxShadow: "none",
    [theme.breakpoints.down("md")]: {
      justifyContent: "space-between",
    },
  },

  header_logo: {
    objectFit: "contain",
    width: 75,
    marginTop: 5,
  },
  header_container: {
    display: "flex",
    alignItems: "center",
  },
  header_subtitle: {
    fontSize: 11,
    fontStyle: "italic",
    fontWeight: 600,
    textDecoration: "none",
  },
  header_icon: {
    objectFit: "contain",
    height: 10,
    marginLeft: 3,
    alignSelf: "start",
  },
  menuButton: {
    display: "none",
    [theme.breakpoints.down("md")]: {
      display: "block",
      marginRight: "7%",
      marginLeft: "-10%",
    },
  },
}));

function Header({
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
  const classes = useStyle();

  const [open, setOpen] = useState(false);
  //   const [isAuthenticate, setIsAuthenticate] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div className="header">
      {walletAddress != "" ? (
        <AppBar className={classes.header}>
          <Toolbar>
            <IconButton
              color="inherit"
              className={classes.menuButton}
              onClick={handleOpen}
            >
              <Menu />
            </IconButton>

            <Link to="/">
              <Box className={classes.logo_Container}>
                {/* logo */}
                <img
                  className={classes.header_logo}
                  src="https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/flipkart-plus_8d85f4.png"
                  alt="Flipkart"
                />
                {/* Explore plus part  */}
              </Box>
            </Link>
            <SearchBar />
            <HeaderMenu
              updateIsAuthenticate={updateIsAuthenticate}
              isAuthenticate={isAuthenticate}
              updateUserInfo={updateUserInfo}
              cartItems={cartItems}
              updateIsUser={updateIsUser}
              userInfo={userInfo}
              updateCartItems={updateCartItems}
              cartLength={cartLength}
              updateCartLength={updateCartLength}
              walletAddress={walletAddress}
            />
          </Toolbar>
        </AppBar>
      ) : (
        <AppBar className={classes.header}>
          <Toolbar>
            <IconButton
              color="inherit"
              className={classes.menuButton}
              onClick={handleOpen}
            >
              <Menu />
            </IconButton>

            <Link to="/">
              <Box className={classes.logo_Container}>
                {/* logo */}
                <img
                  className={classes.header_logo}
                  src="https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/flipkart-plus_8d85f4.png"
                  alt="Flipkart"
                />
                {/* Explore plus part  */}
              </Box>
            </Link>
            <SearchBar />
            <a href="https://metamask.io/download/">
              <h2>Install Metamask Extension First</h2>
            </a>
          </Toolbar>
        </AppBar>
      )}
    </div>
  );
}

export default Header;
