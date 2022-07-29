import React, { useEffect, useState } from "react";
import { Grid, makeStyles } from "@material-ui/core";
import { Route, Routes, useNavigate } from "react-router";
import Sidebar from "../components/account/SellerSidebar";
import LoaderSpinner from "../components/LoaderSpinner";
import ToastMessageContainer from "../components/ToastMessageContainer";
import authentication from "../adapters/authentication";
import PersonalInfo from "../components/account/PersonalInfo";
import ProductList from "../components/account/ProductList";

const useStyles = makeStyles((theme) => ({
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
}));

function SellersPage({
  userInfo,
  updateUserInfo,
  updateIsAuthenticate,
  walletAddress,
}) {
  const classes = useStyles();
  return (
    <>
      <Grid container className={classes.component}>
        <Grid
          item
          lg={3}
          md={3}
          sm={12}
          xs={12}
          className={classes.leftComponent}
        >
          <Sidebar
            userInfo={userInfo}
            updateUserInfo={updateUserInfo}
            updateIsAuthenticate={updateIsAuthenticate}
          />
        </Grid>
        <Grid
          style={{ background: "#fff", overflow: "scroll" }}
          item
          lg={9}
          md={9}
          sm={12}
          xs={12}
        >
          <Routes>
            <Route
              exact
              path="/account"
              element={<PersonalInfo walletAddress={walletAddress} />}
            />
            <Route exact path="/account/products" element={<ProductList />} />
          </Routes>
        </Grid>
      </Grid>
      
      <ToastMessageContainer />
    </>
  );
}

export default SellersPage;