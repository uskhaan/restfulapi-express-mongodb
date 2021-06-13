var mongoose=require("mongoose");

var productSchema=mongoose.Schema({
faculty:{
name:String,
gender:String,
email:String,
coursecode:Number,
phone:Number,
address:{
        street_address: String,
        city: String,
        country: String
        },
    }
})


var Product= mongoose.model("Faculty", productSchema);
module.exports=Product;