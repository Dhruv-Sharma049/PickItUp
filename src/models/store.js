const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/project_1")

const product_schema = new mongoose.Schema(
    {
        Item_ID : {
            type:String, Required:true ,
            unique:true,
            uppercase:true   
        },

        Item_name : {
            type:String, required:true  
        },

        cost : {
            type:Number, Required:true     
        },

        Size: {
            type:String
        },

        Quantity : {
            type:Number, Required:true     
        },

        Seller_ID : {
            type:String, Required:true    
        }

    }
)

const product = new mongoose.model("product", product_schema)

const createdoc = async() => {
    try{
        const p1 = new product(
            {
                Item_ID : 00001,    
                Item_name : "Skirt",
                cost : 1990,
                Quantity : 4,
                Seller_ID : "643646aa1acba0e9a1f9c8bc"
            }
        )
        
        const p2 = new product(
            {
                Item_ID : 00002,    
                Item_name : "Shirt",
                cost : 849,
                Quantity : 2,
                Seller_ID : "643646aa1acba0e9a1f9c8bc"
            }
        )
        
        const p3 = new product(
            {
                Item_ID : 00003,    
                Item_name : "Pant",
                cost : 1499,
                Quantity : 8,
                Seller_ID : "643646aa1acba0e9a1f9c8be"
            }
        )
        
        const p4 = new product(
            {
                Item_ID : 00004,    
                Item_name : "Dress",
                cost : 1250,
                Quantity : 2,
                Seller_ID : "643646aa1acba0e9a1f9c8bd"
            }
        )
        
        const p5 = new product(
            {
                Item_ID : 00005,    
                Item_name : "Saree",
                cost :2499,
                Quantity : 6,
                Seller_ID : "643646aa1acba0e9a1f9c8bd"
            }
        )
        
        const p6 = new product(
            {
                Item_ID : 00006,    
                Item_name : "Blazer",
                cost : 3400,
                Quantity : 1,
                Seller_ID : "643646aa1acba0e9a1f9c8bc"
            }
        )
        
        const p7 = new product(
            {
                Item_ID : 00007,    
                Item_name : "Kurta",
                cost : 825,
                Quantity : 6,
                Seller_ID : "643646aa1acba0e9a1f9c8bb"
            }
        )
        
        const p8 = new product(
            {
                Item_ID : 00010,    
                Item_name : "kapda",
                cost : 825,
                Quantity : 6,
                Seller_ID : "643646aa1acba0e9a1f9c8bb"
            }
        )
       

        const result = await product.insertMany([p1,p2,p3,p4,p5,p6,p7,p8]);
        console.log(result); 

    }catch(err){
        console.log(err);
    }
}
 //createdoc();

module.exports = product;