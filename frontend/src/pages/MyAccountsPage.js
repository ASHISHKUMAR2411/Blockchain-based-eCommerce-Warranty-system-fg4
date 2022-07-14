import React, { useEffect, useState } from "react";
import { Grid, makeStyles } from "@material-ui/core";
import { Route, Switch, useNavigate } from "react-router";

// import Wishlist from "../components/wishlist/Wishlist";
// import Sidebar from "../components/account/Sidebar";
// import PersonalInfo from "../components/account/PersonalInfo";
// import ManageAddresses from "../components/address/ManageAddresses";
import LoaderSpinner from "../components/LoaderSpinner";
import ToastMessageContainer from "../components/ToastMessageContainer";
import authentication from "../adapters/authentication";

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

function MyAccountsPage({ isAuthenticate, userInfo,updateIsAuthenticate, updateUserInfo }) {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(true);
  //   const { isAuthenticate } = useSelector((state) => state.userReducer);
  const history = useNavigate();
  useEffect(() => {
    if (!isAuthenticate) {
      authentication().then((res) => {
        updateIsAuthenticate(res.isAuth);
        updateUserInfo(res.user);
      });
    }
    setIsLoading(false);
  }, [isAuthenticate]);

  return isLoading ? (
    <LoaderSpinner />
  ) : (
    <div>
      <Grid container className={classes.component}>
        <Grid
          item
          lg={3}
          md={3}
          sm={12}
          xs={12}
          className={classes.leftComponent}
        >
          <h1>My accounts page</h1>
          <h2>{userInfo._id}</h2>
          {/* <Sidebar /> */}
        </Grid>
        {/* <Grid style={{ background: "#fff" }} item lg={9} md={9} sm={12} xs={12}>
          <Switch>
            <Route exact path="/account">
              <PersonalInfo />
            </Route>
            <Route exact path="/wishlist">
              <Wishlist />
            </Route>
            <Route exact path="/account/addresses">
              <ManageAddresses />
            </Route>
            <Route>
              <PersonalInfo />
            </Route>
          </Switch>
        </Grid> */}
      </Grid>
      <ToastMessageContainer />
    </div>
  );
}

export default MyAccountsPage;