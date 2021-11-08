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
    res.status(500).json(err);
  }
};

const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params._id);

    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getProducts = async (req, res) => {
  const queryNew = req.query.new;
  const queryCategory = req.query.category;
  try {
    let products;
    if (queryNew) {
      //find products by createAt date and limit 1 item
      products = await Product.find().sort({ createdAt: -1 }).limit(1);
    } else if (queryCategory) {
      //find products by category
      products = await Product.find({
        categories: {
          $in: [queryCategory],
        },
      });
    } else {
      //find all products
      products = await Product.find();
    }
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  updateProduct,
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
};
