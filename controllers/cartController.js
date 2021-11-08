const Cart = require("../models/Cart");

const createCart = async (req, res) => {
  const newCart = new Cart(req.body);
  try {
    const savedCart = await newCart.save();
    res.status(200).json(savedCart);
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateCart = async (req, res) => {
  try {
    const updateCart = await Cart.findByIdAndUpdate(
      req.params._id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updateCart);
  } catch (err) {
    res.status(403).json(err);
  }
};

const deleteCart = async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params._id);
    res.status(200).json("Cart has been deleted!");
  } catch (err) {
    res.status(500).json(err);
  }
};

const getUserCart = async (req, res) => {
  try {
    const cart = await Cart.find({ userId: req.params.user_id });

    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getUserCarts = async (req, res) => {
  try {
    const carts = await Cart.find();
    res.status(200).json({ carts });
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  updateCart,
  createCart,
  deleteCart,
  getUserCart,
  getUserCarts,
};
