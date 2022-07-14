import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { CircularProgress } from "@material-ui/core";
import toastMessage from "../../utils/toastMessage";
import useQuery from "../../hooks/useQuery";

import authentication from "../../adapters/authentication";

const useStyles = makeStyles((theme) => ({
  inputs: {
    margin: "15px 0px",
  },
  signupInputs: {
    margin: "15px 0px",
  },
  btn: {
    border: "none",
    textTransform: "capitalize",
    fontWeight: 600,
    padding: "10px 20px",
  },
  para: {
    color: "#878787",
    fontSize: 12,
    fontWeight: 400,
    marginTop: 20,
    marginBottom: 10,
  },
  buttonProgress: {
    color: "white",
    margin: "0 10px",
  },
  reqBtnProgress: {
    color: "primary",
    margin: "0 10px",
  },
}));


function Login({
  updateIsAuthenticate,
  updateIsModalOpen,
  updateIsLogin,
  updateUserInfo,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [values, setValues] = useState({
    phone: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    phone: false,
    password: false,
  });

  const [errorMsg, setErrorMsg] = useState({
    phone: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [requestBtnLoading, setRequestBtnLoading] = useState(false);
  const [submitCount, setSubmitCount] = useState(0);
  const [isLoginComponent, setIsLoginComponent] = useState(true);
  const [popupLogin, setPopupLogin] = useState(true);

  const initial = useRef(true);

  useEffect(() => {
    if (initial.current === true) {
      initial.current = false;
    } else {
      let formError = false;
      const errorValues = Object.values(errors);
      errorValues.forEach((value) => {
        if (value) formError = true;
      });
      if (!formError) {
        setLoading(true);
        completeLogin();
      }
    }
  }, [submitCount]);

  const classes = useStyles();
  const history = useNavigate();
  const query = useQuery();

  const regNumeric = /^[0-9\b]+$/;
  const regPhone = /^[6-9]\d{9}$/;

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const validatePhone = (phoneNumber) => {
    if (phoneNumber === "") {
      return {
        isError: true,
        errorMsg: "Mobile number can not be empty",
      };
    } else if (phoneNumber.length < 10 || !regPhone.test(phoneNumber)) {
      return {
        isError: true,
        errorMsg: "Please enter valid mobile number",
      };
    } else {
      return {
        isError: false,
        errorMsg: "",
      };
    }
  };

  const validatePassword = (pass) => {
    if (pass === "") {
      return {
        isError: true,
        errorMsg: `Password can not be empty`,
      };
    } else if (pass.length < 6) {
      return {
        isError: true,
        errorMsg: "Minimum 6 charterers required",
      };
    } else if (pass.length > 20) {
      return {
        isError: true,
        errorMsg: "Maximum 20 charterers allowed",
      };
    } else {
      return {
        isError: false,
        errorMsg: "",
      };
    }
  };

  const numericOnly = (e) => {
    let preval = e.target.value;
    if (
      e.target.value === "" ||
      (regNumeric.test(e.target.value) && e.target.value.length <= 10)
    ) {
      setValues({ ...values, phone: e.target.value });
    } else {
      e.target.value = preval.substring(0, preval.length - 1);
      setValues({ ...values, phone: e.target.value });
    }
  };

  const handleInputs = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const completeLogin = async () => {
    setLoading(true);
    try {
      const res = await axios.post("/users/check-phone", {
        phone: values.phone,
      });
      const isRegistered = res.data.isExist;
      if (!isRegistered) {
        setLoading(false);
        toastMessage("You are not registered. Please Signup", "info");
      } else {
        const { data } = await axios.post("/users/login", {
          phone: values.phone,
          password: values.password,
        });
        console.log(data);
        const { isAuth, user } = await authentication();
        updateIsAuthenticate(isAuth);
        updateUserInfo(user);
        //Modal Close
        if (popupLogin) {
          updateIsModalOpen(false);
        }
      }
    } catch (error) {
      setLoading(false);
      const { data } = error.response;
      //console.log(data);
      if (data.message === "login/invalid-phone-or-password") {
        toastMessage("Invalid Mobile Number or Password.", "info");
      } else {
        toastMessage("Something went wrong. Please login later.", "error");
      }
    }
  };

  const onLoginClick = () => {
    const validatedPhone = validatePhone(values.phone);
    const validatedPassword = validatePassword(values.password);

    //Set Error
    setErrorMsg({
      phone: validatedPhone.errorMsg,
      password: validatedPassword.errorMsg,
    });

    setErrors({
      phone: validatedPhone.isError,
      password: validatedPassword.isError,
    });
    setSubmitCount((cnt) => cnt + 1);
    //checkout useEffect
  };

  const loginWithMobileNumber = async () => {
    const validatedPhone = validatePhone(values.phone);

    //Set Error Status
    setErrorMsg({
      phone: validatedPhone.errorMsg,
    });
    setErrors({
      phone: validatedPhone.isError,
    });

    if (!validatedPhone.isError) {
      setRequestBtnLoading(true);
      try {
        setRequestBtnLoading(false);
        setIsLoginComponent(false);
      } catch (error) {
        setRequestBtnLoading(false);
        toastMessage("Something went wrong.", "error");
      }
    }
  };

  return (
    <>
      {isLoginComponent ? (
        <>
          <TextField
            error={errors.phone}
            id={
              errors.phone
                ? "standard-error-helper-text"
                : "standard-start-adornment"
            }
            label="Enter Mobile number"
            className={classes.signupInputs}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">+91</InputAdornment>
              ),
            }}
            onChange={numericOnly}
            value={values.phone}
            name="phone"
            helperText={errors.phone && `${errorMsg.phone}`}
          />
          <FormControl
            className={clsx(
              classes.margin,
              classes.textField,
              classes.signupInputs
            )}
            error={errors.password}
          >
            <InputLabel htmlFor="standard-adornment-password">
              Enter Password
            </InputLabel>
            <Input
              id={
                errors.password
                  ? "standard-adornment-password"
                  : "standard-start-adornment"
              }
              type={showPassword ? "text" : "password"}
              onChange={handleInputs}
              value={values.password}
              name="password"
              error={errors.password}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
            {errors.password && (
              <FormHelperText id="standard-helper-text" error={true}>
                {errorMsg.password}
              </FormHelperText>
            )}
          </FormControl>
          <p className={classes.para}>
            By continuing, you agree to Flipkart's Terms of Use and Privacy
            Policy.
          </p>
          <Button
            variant="contained"
            className={classes.btn}
            style={{ background: "#fb641b", color: "#fff" }}
            color="primary"
            disabled={loading}
            onClick={onLoginClick}
          >
            {loading ? (
              <CircularProgress size={24} className={classes.buttonProgress} />
            ) : (
              "Login"
            )}
          </Button>
          <a className="signup_text" onClick={() => updateIsLogin(false)}>
            New to Flipkart? Create an account
          </a>
        </>
      ) : (
        <h1>otp</h1>
      )}
    </>
  );
}

export default Login;
