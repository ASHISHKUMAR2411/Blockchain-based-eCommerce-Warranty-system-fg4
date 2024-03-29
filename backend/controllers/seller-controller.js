const User = require("../models/userSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const signin = async (req, res) => {
  const user = new User(req.body);
  try {
    const token = await user.generateAuthenticationToken();
    user.role = "seller";
    await user.save();
    res.cookie("auth_token", token, {
      maxAge: 2629800000,
      httpOnly: true,
    });
    res.status(201).json({ code: 201, isComplete: true });
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ code: 400, message: "invalid data or invalid syntax" });
  }
};

const login = async (req, res) => {
  try {
    const { phone, password } = req.body;
    const userLogin = await User.findOne({ phone: phone });
    if (!userLogin) {
      return res
        .status(401)
        .json({ isLogin: false, message: "login/invalid-phone-or-password" });
    }
    let isMatch = await bcrypt.compare(password, userLogin.password);
    if (isMatch) {
      const token = await userLogin.generateAuthenticationToken();
      res.cookie("auth_token", token, {
        maxAge: 2629800000,
        httpOnly: true,
      });

      if (userLogin.role != "seller") {
        return res.status(401).json({
          isLogin: false,
          message: "login/invalid-not-seller",
        });
      }
      res.json({ isLogin: true, message: "Seller Login Successfully" });
    } else {
      res
        .status(401)
        .json({ isLogin: false, message: "login/invalid-phone-or-password" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ isLogin: false, error: error });
  }
};

const logout = async (req, res) => {
  // console.log("Logout");
  try {
    const token = req.cookies.auth_token;

    if (token) {
      //get user id from jwt token
      const checkToken = jwt.verify(token, process.env.SECRET_KEY);
      //get user id from jwt verified token
      const userDetails = await User.findOne({ _id: checkToken._id });
      //delete token from user database
      userDetails.tokens = userDetails.tokens.filter(
        (dbToken) => dbToken.token !== token
      );
      //save updated user details
      await userDetails.save();
      //delete token from cookie
      res.clearCookie("auth_token", { path: "/" });
      //send response as logout succeded
      res.status(200).json({
        code: 200,
        isLogout: true,
      });
    } else {
      //if no token is found
      //logout failed as user already not logged in
      res.status(401).json({
        code: 401,
        isLogout: false,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      code: 500,
      isLogout: false,
    });
  }
};

const authentication = async (req, res) => {
  try {
    //get token from cookies
    const token = req.cookies.auth_token;
    if (token) {
      const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
      const userInfo = await User.findOne(
        { _id: verifyToken._id, "tokens.token": token },
        { password: 0, tokens: 0 }
      );

      //get Result
      const user = userInfo._doc;
      // if (user.role != "seller") {
      //   res.status(401).json({
      //     code: 401,
      //     isAuthenticate: false,
      //     message: "not seller. Please login first",
      //   });
      // }
      res.status(200).json({
        code: 200,
        isAuthenticate: true,
        user: {
          ...user,
          _id: user._id.toString(),
        },
      });
    } else {
      res.status(401).json({
        code: 401,
        isAuthenticate: false,
        message: "invalid provided token. Test",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(401).json({
      code: 401,
      isAuthenticate: false,
      message: "invalid provided token.",
    });
  }
};

const checkphone = async (req, res) => {
  try {
    const { phone } = req.body;
    const userInfo = await User.findOne({ phone: phone });
      if (userInfo && userInfo.role == "seller") {
        res.status(200).json({
          code: 200,
          isExist: true,
          message: "Seller registered..",
        });
      } else {
        res.status(200).json({
          code: 200,
          isExist: false,
          message: "Seller not registered. Please sign up first.",
        });
      }
  } catch (error) {
    console.log(error);
    res.status(401).json({
      code: 401,
      message: "invalid provided token.",
    });
  }
};

module.exports = {
  signin,
  login,
  logout,
  authentication,
  checkphone,
};
