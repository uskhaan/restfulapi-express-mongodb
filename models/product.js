const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    // required: true,
  },
  gender: {
    type: String,
    // required: true,
  },
  email: {
    type: String,
    // required: true,
  },
  address: {
    street_address: { type: String },
    city: { type: String },
    country: { type: String },
  },
  course_code: {
    type: String,
  },
  phone_numbers: {
    type: Array,
    // required: true,
  },
});

const Product =
  mongoose.models.Product || mongoose.model("product", productSchema);

exports.Product = Product;
