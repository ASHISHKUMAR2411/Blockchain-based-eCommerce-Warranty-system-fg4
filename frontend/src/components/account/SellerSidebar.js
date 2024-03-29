import { React, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import {
  Avatar,
  Box,
  Divider,
  makeStyles,
  Typography,
} from "@material-ui/core";

import clsx from "clsx";
import PersonIcon from "@material-ui/icons/Person";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import FolderSharedIcon from "@material-ui/icons/FolderShared";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

import { maleAvatarUrl, femaleAvatarUrl } from "../../constants/data";
import toastMessage from "../../utils/toastMessage";

const useStyles = makeStyles((theme) => ({
  component: {
    marginTop: 55,
    padding: "30px 135px",
    display: "flex",
    [theme.breakpoints.down("sm")]: {
      padding: "15px 0",
    },
  },
  profileWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  leftComponent: {
    // width: '67%',
    paddingRight: 15,
    [theme.breakpoints.down("sm")]: {
      marginBottom: 15,
    },
  },
  header: {
    padding: "10px 24px",
    paddingLeft: 15,
    marginBottom: 15,
    background: "#fff",
    boxShadow: "0 2px 4px 0 rgb(0 0 0 / 8%)",
  },
  bottom: {
    minHeight: "500px",
    padding: "16px 22px",
    background: "#fff",
    borderTop: "1px solid #f0f0f0",
  },
  large: {
    width: theme.spacing(6.5),
    height: theme.spacing(6.5),
  },
  smallText: {
    fontSize: 12,
    opacity: 0.8,
  },
  boldText: {
    color: "#2C3E50",
    fontSize: 16,
    fontWeight: 600,
  },
  divider: {
    opacity: "0.6",
    marginBottom: 20,
  },
  sideBarLink: {
    display: "flex",
    alignItems: "center",
    color: "#878787",
    padding: "0 0 12px 5px",
    fontSize: 16,
    fontWeight: 500,
  },
  sideBarLinkIcon: {
    color: "#2874f0",
    marginRight: 15,
  },
  subMenu: {
    padding: "5px 0 10px 0",
  },
  subLink: {
    color: "#2C3E50",
    padding: "12px 5px 12px 45px",
    fontSize: 14,
  },
  hoverTab: {
    "&:hover": {
      fontWeight: 500,
      color: "#2874f0",
      backgroundColor: "#f5faff",
    },
  },
}));


function SellerSidebar({ userInfo, updateUserInfo, updateIsAuthenticate }) {
  const classes = useStyles();
  const location = useLocation();
  const currentPath = location.pathname;
  const activeStyle = {
    fontWeight: 500,
    color: "#2874f0",
    backgroundColor: "#f5faff",
  };
  const logout = async () => {
    try {
      console.log("before");
      await axios.get("/users/logout", {
        withCredentials: true,
      });
      console.log("after");
      updateUserInfo({});
      updateIsAuthenticate(false);
      // window.location.replace("/");
      window.location.replace("/");
    } catch (error) {
      toastMessage("Something went wrong. Please try again later", "error");
    }
  };
  return (
    <>
      <Box boxShadow={1} className={classes.header}>
        <Box className={classes.profileWrapper}>
          <Avatar
            alt="Avatar"
            src={userInfo.gender === "F" ? femaleAvatarUrl : maleAvatarUrl}
            className={classes.large}
          />
          <Box style={{ paddingLeft: 15 }}>
            <Typography className={classes.smallText}>Hello,</Typography>
            <Typography
              className={classes.boldText}
            >{`${userInfo.first_name} ${userInfo.last_name}`}</Typography>
          </Box>
        </Box>
      </Box>
      <Box className={classes.bottom}>
        {/* <Link to="/orders">
          <Box className={clsx(classes.sideBarLink, classes.hoverTab)}>
            <img src="/order-icon.svg" className={classes.sideBarLinkIcon} />
            <p>MY ORDERS</p>
            <ChevronRightIcon style={{ marginLeft: "auto" }} />
          </Box>
        </Link> */}
        <Divider className={classes.divider} style={{ marginTop: 5 }} />
        <Box className={classes.sideBarLink}>
          <PersonIcon className={classes.sideBarLinkIcon} />
          <p>Products</p>
        </Box>
        <Box className={classes.subMenu}>
          <Link to="/account">
            <Typography
              className={clsx(classes.subLink, classes.hoverTab)}
              style={currentPath === "/account" ? activeStyle : {}}
            >
              Create Product
            </Typography>
          </Link>
          <Link to="/account/products" aria-disabled={true}>
            <Typography
              className={clsx(classes.subLink, classes.hoverTab)}
              style={currentPath === "/account/products" ? activeStyle : {}}
            >
              Your Products
            </Typography>
          </Link>
        </Box>
        <Divider className={classes.divider} />

        <Divider className={classes.divider} />
        <Box
          className={clsx(classes.sideBarLink, classes.hoverTab)}
          style={{ cursor: "pointer" }}
          onClick={logout}
        >
          <PowerSettingsNewIcon className={classes.sideBarLinkIcon} />
          <p>Logout</p>
        </Box>
      </Box>
    </>
  );
}

export default SellerSidebar;
