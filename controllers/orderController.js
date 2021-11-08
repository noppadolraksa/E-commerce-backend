const Order = require("../models/Order");

const createOrder = async (req, res) => {
  const newOrder = new Order(req.body);
  try {
    const savedOrder = await newOrder.save();
    res.status(200).json(savedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateOrder = async (req, res) => {
  try {
    const updateOrder = await Order.findByIdAndUpdate(
      req.params._id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updateOrder);
  } catch (err) {
    res.status(403).json(err);
  }
};

const deleteOrder = async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params._id);
    res.status(200).json("Order has been deleted!");
  } catch (err) {
    res.status(500).json(err);
  }
};

const getUserOrder = async (req, res) => {
  try {
    const order = await Order.find({ userId: req.params.user_id });
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json({ orders });
  } catch (err) {
    res.status(500).json(err);
  }
};

// GET MONTHLY INCOME
const getMonthlyIncome = async (req, res) => {
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const PreviousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));
  try {
    const incomeLastMonth = await Order.aggregate([
      { $match: { createdAt: { $gte: PreviousMonth } } },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);
    res.status(200).json(incomeLastMonth);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  updateOrder,
  createOrder,
  deleteOrder,
  getUserOrder,
  getUserOrders,
  getMonthlyIncome,
};
