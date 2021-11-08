const express = require("express");
const router = express.Router();
const {
  createProduct,
  getProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const { verifyTokenAndAdmin } = require("../controllers/userController");

//CREATE
router.post("/", verifyTokenAndAdmin, createProduct);

//UPDATE
router.put("/:_id", verifyTokenAndAdmin, updateProduct);

//DELETE
router.delete("/:_id", verifyTokenAndAdmin, deleteProduct);

//GetProduct
router.get("/find/:_id", getProduct);

//GetAllProduct
router.get("/", getProducts);

module.exports = router;
