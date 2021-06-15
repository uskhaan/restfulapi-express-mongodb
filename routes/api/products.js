const express = require("express");
let router = express.Router();
var { Product } = require("../../models/product.js");

//getting mult prod
router.get("/", async (req, res) => {
  let products = await Product.find();
  return res.send(products);
});

//getting single prod
router.get("/:id", async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);
    if (!product)
      return res.status(400).send("Product With given ID is not present");
    return res.send(product);
  } catch (err) {
    return res.status(400).send("Invalid ID");
  }
});

//update a record
router.put("/:id", async (req, res) => {
  let product = await Product.findById(req.params.id);

  let phoneNo = [req.body.phone1, req.body.phone2];
  product.name = req.body.name;
  product.gender = req.body.gender;
  product.email = req.body.email;
  product.address.street_address = req.body.street_address;
  product.address.city = req.body.city;
  product.address.country = req.body.country;
  product.course_code = req.body.course_code;
  product.phone_numbers = phoneNo;

  console.log("Product: ", product);
  await product.save();
  return res.send(product);
});

//delete a record
router.delete("/:id", async (req, res) => {
  let product = await Product.findByIdAndDelete(req.params.id);
  return res.send(product);
});

//Insert a record
router.post("/", async (req, res) => {
  console.log("REQ BODY: ", req.body);
  let product = new Product();

  let phoneNo = [req.body.phone1, req.body.phone2];
  product.name = req.body.name;
  product.gender = req.body.gender;
  product.email = req.body.email;
  product.address.street_address = req.body.street_address;
  product.address.city = req.body.city;
  product.address.country = req.body.country;
  product.course_code = req.body.course_code;
  product.phone_numbers = phoneNo;

  await product.save();
  console.log("Product: ", product);
  return res.send(product);
});

module.exports = router;
