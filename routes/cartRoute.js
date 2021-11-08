const express = require("express");
const {
  createCart,
  updateCart,
  deleteCart,
  getUserCart,
  getUserCarts,
} = require("../controllers/cartController");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../controllers/userController");
const router = express.Router();

//CREATE
router.post("/", verifyToken, createCart);

//UPDATE
router.put("/:_id", verifyTokenAndAuthorization, updateCart);

//DELETE
router.delete("/:_id", verifyTokenAndAuthorization, deleteCart);

//GetUserCart
router.get("/find/:user_id", verifyTokenAndAuthorization, getUserCart);

//GetUserAllCarts
router.get("/", verifyTokenAndAdmin, getUserCarts);

module.exports = router;
