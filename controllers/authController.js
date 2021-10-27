const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

//register
const createNewUser = async (req, res) => {
  try {
    const { username, password, email } = req.body;
    const encrypted = CryptoJS.AES.encrypt(
      password,
      process.env.PASS_SECRET
    ).toString();
    const findUser = await User.findOne({ username: username });
    if (findUser) {
      return res.status(400).json("User Already Exist!");
    } else {
      const newUser = await new User({
        username: username,
        email: email,
        password: encrypted,
      });
      await newUser.save();
      res.status(201).json(newUser);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

//login
const loginUser = async (req, res) => {
  try {
    const findUser = await User.findOne({ username: req.body.username });
    !findUser && res.status(401).json("Wrong Username!");
    const decrypted = CryptoJS.AES.decrypt(
      findUser.password,
      process.env.PASS_SECRET
    ).toString(CryptoJS.enc.Utf8);
    decrypted !== req.body.password && res.status(401).json("Wrong Password!");

    const accessToken = jwt.sign(
      {
        _id: findUser._id,
        isAdmin: findUser.isAdmin,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    const { password, ...others } = findUser._doc; //_doc contain data
    res.status(200).json({ ...others, accessToken });
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = { createNewUser, loginUser };
