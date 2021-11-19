const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, max: 50 },
    desc: { type: String, required: true, max: 200 },
    img: { type: String, required: true },
    categories: { type: Array },
    floorPrice: { type: Number },
    ceilPrice: { type: Number },
    brand: { type: String, default: "none" },
    sold: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    userLikes: { type: Array },
    condition: { type: String },
    inStock: { type: Boolean, default: true },
    filterTitleOne: { type: String },
    filterTitleTwo: { type: String },
    promotion: { type: Array },
    product: [
      {
        price: { type: Number, required: true },
        priceBeforeDiscount: { type: Number },
        stock: { type: Number, default: 0 },
        img: { type: String },
        filterProductsOne: { type: String },
        filterProductsTwo: { type: String },
        inStock: { type: Boolean, default: true },
        sku: { type: String, unique: true },
      },
    ],
  },
  { timestamps: true } // privillege for mongoose for timestamp
);

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
