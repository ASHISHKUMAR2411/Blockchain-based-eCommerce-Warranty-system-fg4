var mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
      unique: true,
    },
    gender: String,
    email: String,
    role: {
      type: String,
      enum: ["user", "seller"],
    },
    WalletAddress: String,
    tokens: [
      {
        token: {
          type: String,
        },
      },
    ],
  },
  { collection: "users" }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    try {
      this.password = await bcrypt.hash(this.password, 12);
    } catch (error) {
      throw error;
    }
  }
  next();
});


//Generate a jwt auth token
userSchema.methods.generateAuthenticationToken = async function () {
  try {
    //create Token
    const token = jwt.sign(
      { _id: this._id.toString() },
      process.env.SECRET_KEY
    );

    //Store created token into database
    this.tokens = this.tokens.concat([{ token: token }]);
    await this.save();
    return token;
  } catch (error) {
    throw error;
  }
};

const User = new mongoose.model("user", userSchema);

module.exports = User;