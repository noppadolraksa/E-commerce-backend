const express = require("express");
const {
  verifyTokenAndAdmin,
  getUser,
  getUsers,
  userStats,
  verifyTokenAndAuthorization,
  deleteUser,
  updateUser,
} = require("../controllers/userController");
const router = express.Router();

//UPDATE
router.put("/:_id", verifyTokenAndAuthorization, updateUser);

//DELETE
router.delete("/:_id", verifyTokenAndAuthorization, deleteUser);

//GetUser
router.get("/find/:_id", verifyTokenAndAdmin, getUser);

//GetAllUser
router.get("/", verifyTokenAndAdmin, getUsers);

//GetUserStats
router.get("/stats", verifyTokenAndAdmin, userStats);

module.exports = router;
