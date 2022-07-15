import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";

// import { setIsAuthenticate, setUserInfo } from "../actions/userActions";
import authentication from "../adapters/authentication";


import Login from "../components/auth/Login";
// import Signup from "../components/auth/Signup";
// import ToastMessageContainer from "../components/ToastMessageContainer";

import "../styles/AuthPage.css";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

function AuthPage({
  popup = false,
  updateIsAuthenticate,
  updateIsModalOpen,
  isAuthenticate,
  updateUserInfo,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  // const [isAuthenticate, setIsAuthenticate] = useState(false);
  // const [userInfo, setUserInfo] = useState({});
  const history = useNavigate();
  const classes = useStyles();

  function updateIsLogin(value) {
    setIsLogin(value);
  }

  useEffect(() => {
    if (!isAuthenticate) {
      setIsOpen(true);

      authentication()
        .then((res) => {
          updateIsAuthenticate(res.isAuth);
          updateUserInfo(res.user);
          setIsOpen(false);
          history.push("/");
        })
        .catch((err) => {
          setIsOpen(false);
        });
    }
  }, [isAuthenticate]);

  const handleChange = React.useCallback((isLoginNew) => {
    console.log("Logged In");
    popup = true;
  }, []);

  return (
    <div className={popup ? "login_popup" : "login"}>
      <div className="container_left">
        <div>
          <span className="title">
            {isLogin ? "Login" : "Looks like you're new here!"}
          </span>
          <p className="subtitle">
            {isLogin
              ? "Get access to your Orders, Wishlist and Recommendations"
              : "Sign up with your mobile number to get started"}
          </p>
        </div>
      </div>
      <div className="container_right">
        {isLogin ? (
          <Login
            // onLogin={handleChange}
            updateIsAuthenticate={updateIsAuthenticate}
            updateIsModalOpen={updateIsModalOpen}
            updateIsLogin={updateIsLogin}
            updateUserInfo={updateUserInfo}
          />
        ) : (
          <h1>Sign up kar bsdk</h1>
        )}
      </div>
      <Backdrop className={classes.backdrop} open={isOpen}>
        <CircularProgress color="inherit" />
      </Backdrop>
      {/* <ToastMessageContainer /> */}
    </div>
  );
}

export default AuthPage;