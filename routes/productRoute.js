const express = require("express");
const router = express.Router();
const {
  createProduct,
  getProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  likeProduct,
  unlikeProduct,
} = require("../controllers/productController");
const {
  verifyTokenAndAdmin,
  verifyToken,
} = require("../controllers/userController");

//CREATE
router.post("/", verifyTokenAndAdmin, createProduct);

//UPDATE
router.put("/:_id", verifyTokenAndAdmin, updateProduct);

//like
router.post("/likeproduct", verifyToken, likeProduct);
router.post("/unlikeproduct", verifyToken, unlikeProduct);

//DELETE
router.delete("/:_id", verifyTokenAndAdmin, deleteProduct);

//GetProduct
router.get("/find/:_id", getProduct);

//GetAllProduct
router.get("/", getProducts);

module.exports = router;
