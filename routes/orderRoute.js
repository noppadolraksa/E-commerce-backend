const express = require("express");
const router = express.Router();
const {
  createOrder,
  updateOrder,
  deleteOrder,
  getUserOrder,
  getUserOrders,
  getMonthlyIncome,
} = require("../controllers/orderController");
const {
  verifyTokenAndAdmin,
  verifyToken,
  verifyTokenAndAuthorization,
} = require("../controllers/userController");

//CREATE
router.post("/", verifyToken, createOrder);

//UPDATE
router.put("/:_id", verifyTokenAndAdmin, updateOrder);

//DELETE
router.delete("/:_id", verifyTokenAndAdmin, deleteOrder);

//GetUserOrder
router.get("/find/:user_id", verifyTokenAndAuthorization, getUserOrder);

//GetAllUserOrders
router.get("/", verifyTokenAndAdmin, getUserOrders);

//GET MONTHLY STATS INCOME
router.get("/income", verifyTokenAndAdmin, getMonthlyIncome);

module.exports = router;
