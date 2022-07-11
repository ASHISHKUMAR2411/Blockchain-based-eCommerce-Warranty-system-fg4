const User = require("../models/userSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const signin = async (req, res) => {
  const user = new User(req.body);
  try {
    const token = await user.generateAuthenticationToken();
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
      res.json({ isLogin: true, message: "User Login Successfully" });
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
module.exports = {
  signin,
  login,
};