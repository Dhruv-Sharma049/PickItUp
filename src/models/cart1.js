const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/project_1")

const cart_schema = new mongoose.Schema(
    {
        Buyer_ID : {
            type:String,
            
            uppercase:true   
        },

        // Order_ID : {
        //     type:String, Required:true ,
        //     unique:true,
        //     uppercase:true   
        // },
        Item_name:
        {
            type:String,required:true
        },

        Item_code : {
            type:String, required:true  
        },

        size:{
            type:String},

        Quantity : {
            type:Number, Required:true     
        },

        price : {
            type:String
        },

        DoP : {
            type:Date, Required:true     
        },

        Address : {
            type:String    
        }
    }
)

const cart_new = new mongoose.model("cart_new", cart_schema);
module.exports = cart_new;