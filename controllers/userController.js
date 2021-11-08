const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.token;
    if (authHeader) {
      const token = authHeader.split(" ")[1];
      jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) res.status(403).json("Token is not valid!");
        req.user = user; //assign my user to my request
        next();
      });
    } else {
      return res.status(401).json("you are not authenticated!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user._id === req.params._id || req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("you are not allowed to do that!");
    }
  });
};

const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("you are not an admin!");
    }
  });
};

const updateUser = async (req, res) => {
  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SECRET
    ).toString();
  }
  try {
    const updateUser = await User.findByIdAndUpdate(
      req.params._id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updateUser);
  } catch (err) {
    res.status(403).json(err);
  }
};

const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params._id);
    res.status(200).json("User has been deleted!");
  } catch (err) {
    res.status(500).json(err);
  }
};

const getUser = async (req, res) => {
  try {
    const findUser = await User.findById(req.params._id);
    const { password, ...others } = findUser._doc; //_doc contain data
    res.status(200).json({ ...others });
  } catch (err) {
    res.status(500).json(err);
  }
};

const getUsers = async (req, res) => {
  const query = req.query.new;
  try {
    const findUsers = query
      ? await User.find().sort({ _id: -1 }).limit(5)
      : await User.find();

    res.status(200).json({ findUsers });
  } catch (err) {
    res.status(500).json(err);
  }
};

const userStats = async (req, res) => {
  const date = new Date();
  //lastYear = date - 1 year
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  try {
    const data = await User.aggregate([
      //match data that have createdAt greaterThan($gte) lastYear
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        //sum total register for each month
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  verifyTokenAndAuthorization,
  verifyToken,
  updateUser,
  verifyTokenAndAdmin,
  deleteUser,
  getUser,
  getUsers,
  userStats,
};
