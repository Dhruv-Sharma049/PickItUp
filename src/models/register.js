  const mongoose = require("mongoose");
  const jwt = require("jsonwebtoken")
  mongoose.connect("mongodb://localhost:27017/project_1")
.then(function(db){
    console.log('db connected');
})
.catch(function(err){
    console.log(err);
});

  const Customer_schema = new mongoose.Schema(
    {
        username : {
            type:String, 
             required:true ,
            uppercase:true   
        },

         contact : {
             type:Number, required:true  
         },

        email : {
            type:String,
              required:true,
             validator(value)
             {if(validator.isEmail(value)){throw new Error("invalid credentials");}}    
        },

        //  pincode : {
        //      type:Number, Required:false,
        //      validate(value){
        //          if(value<100000){throw new Error("pincode count should be greater than 6");}
        //      }  
        //  },

         Address : {
             type:String, Required:true   
         },

        password : {
            type:String, 
             required:true    
        },

        tokens : [{
           token: { type:String, 
             required:true }   
        }
]
    }
)

Customer_schema.methods.generate_token = async function(){
    try{
        const token = jwt.sign({_id:this._id, username:this.username, Address:this.Address, email:this.email, contact:this.contact }, process.env.SECRET_KEY)
        this.tokens = this.tokens.concat({token});
        await this.save();
        return token;
        
    }catch(err){
        res.send("the error " +err);
        console.log("error hai ye");
    }
}

const Register = new mongoose.model("Register", Customer_schema);
module.exports = Register;
// module.exports = mongoose.model("Register", Customer_schema)