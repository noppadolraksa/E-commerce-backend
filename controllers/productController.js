const Product = require("../models/Product");

const createProduct = async (req, res) => {
  const newProduct = new Product(req.body);
  try {
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateProduct = async (req, res) => {
  try {
    const updateProduct = await Product.findByIdAndUpdate(
      req.params._id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updateProduct);
  } catch (err) {
    res.status(403).json(err);
  }
};

const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params._id);
    res.status(200).json("Product has been deleted!");
  } catch (err) {
    err.status(500).json(err);
  }
};

const getProduct = async (req, res) => {
  try {
    const findProduct = await Product.findById(req.params._id);
    const { password, ...others } = findProduct._doc; //_doc contain data
    res.status(200).json({ ...others });
  } catch (err) {
    err.status(500).json(err);
  }
};

const getProducts = async (req, res) => {
  const query = req.query.new;
  try {
    const findProducts = query
      ? await Product.find().sort({ _id: -1 }).limit(5)
      : await Product.find();

    res.status(200).json({ findProducts });
  } catch (err) {
    err.status(500).json(err);
  }
};

module.exports = {
  updateProduct,
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
};
