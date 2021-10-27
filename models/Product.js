const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    desc: { type: String, required: true },
    img: { type: String, required: true },
    categories: { type: Array },
    color: { type: String, required: true },
    size: { type: String, required: true },
    price: { type: Number, required: true },
    actualPrice: { type: Number },
    brand: { type: String, default: "none" },
    discount: { type: Number },
  },
  { timestamps: true } // privillege for mongoose for timestamp
);

module.exports = mongoose.model("Product", ProductSchema);
