const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/project_1")

const seller_schema = new mongoose.Schema(
    {
        name : {
            type:String, Required:true ,
            unique:true,
            uppercase:true   
        },

        Contact : {
            type:Number, required:true  
        },

        email : {
            type:String, Required:true,
            validator(value)
            {if(validator.isEmail(value)){throw new Error("invalid credentials");}}    
        },

        pincode : {
            type:Number, Required:true,
            validate(value){
                if(value<100000){throw new Error("pincode count should be greater than 6");}
            }  
        },

        Address : {
            type:String, Required:true    
        }

    }
)

const Seller = new mongoose.model("seller", seller_schema)

const createdoc = async() => {
    try{
        const s1 = new Seller(
            {
                name : "Ram",
        
                Contact : 0000000000,
        
                email : "ram@gmail.com",
        
                pincode : 789456,
        
                Address :"this is my address" 
            }        
        )
        const s2 = new Seller(
            {
                name : "Shyam",
        
                Contact : 0000000000,
        
                email : "shyam@gmail.com",
        
                pincode : 789456,
        
                Address :"this is my address" 
            }        
        )
        const s3 = new Seller(
            {
                name : "chotu",
        
                Contact : 0000000000,
        
                email : "chotu@gmail.com",
        
                pincode : 789456,
        
                Address :"this is my address" 
            }        
        )
        const s4 = new Seller(
            {
                name : "chintu",
        
                Contact : 0000000000,
        
                email : "chintu@gmail.com",
        
                pincode : 789456,
        
                Address :"this is my address" 
            }        
        )
       

        const result = await Seller.insertMany([s1,s2,s3,s4]);
        console.log(result); 

    }catch(err){
        console.log(err);
    }
}
 createdoc();