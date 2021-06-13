const express = require("express");
let router=express.Router();
var Product=require("../../models/product.js")

//getting mult prod
router.get("/", async(req,res)=>{
    let products=await Product.find();
    return res.send(products)
})

//getting single prod
router.get("/:id", async(req,res)=>{
    try{
    let product=await Product.findById(req.params.id);
    if (!product)
      return res.status(400).send("Product With given ID is not present");
    return res.send(product)
    }catch(err){
        return res.status(400).send("Invalid ID")
    }
    
})

//update a record
router.put("/:id", async (req, res) => {
    let product = await Product.findById(req.params.id);
    product.name = req.body.name;
    product.price = req.body.price;
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
    let product = new Product();
    product.name = req.body.name;
    product.price = req.body.price;
    await product.save();
    return res.send(product);
  });
  
module.exports=router;