const express = require("express");
const router = express.Router();
const {
  createProduct,
  getProduct,
  getProducts,
} = require("../controllers/productController");
const { verifyTokenAndAdmin } = require("../controllers/userController");

//CREATE
router.post("/", verifyTokenAndAdmin, createProduct);

//UPDATE
router.put("/:_id", verifyTokenAndAdmin);

//DELETE
router.delete("/:_id", verifyTokenAndAdmin);

//GetProduct
router.get("/find/:_id", verifyTokenAndAdmin, getProduct);

//GetAllProduct
router.get("/", verifyTokenAndAdmin, getProducts);

module.exports = router;
