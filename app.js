require('dotenv').config()
const express=require('express');
const path = require("path");
const app = express();
const hbs = require("hbs");
const product = require('./src/models/store.js')
const jwt = require("jsonwebtoken")
const cookie_parser = require("cookie-parser")
app.use(express.static('assets'))

// require("./db/conn");

const register = require("./src/models/register");
const controller = require("./src/models/controller");
const Register = require('./src/models/register');
const cart_new = require('./src/models/cart1.js');
const naya_cart = require('./src/models/naya_cart.js');
const static_path = path.join(__dirname, "./public");
const template_path = path.join(__dirname, "./templates/views");
const partials_path = path.join(__dirname, "./templates/partials");
app.use(express.urlencoded({extended:false}));

app.use(express.static(static_path));
// app.set("view engine", "hbs");
app.set('view engine', 'ejs');
app.set("views", template_path);
hbs.registerPartials(partials_path);
app.use(cookie_parser())


app.use(express.json());
app.use(express.static(__dirname+"/assets"))
app.post("/register",
async (req,res) => {
   try{

    const reg_cust = new Register({
        username: req.body.username,
        contact: req.body.contact,
        email: req.body.email,
        Address: req.body.Address,
        password: req.body.password
    })
    const token = await reg_cust.generate_token();
    console.log(`${token}///////////////`)
    // console.log("yahan tk toh theek hai")
//    print(res.cookie("jwt", token,{
//     expires: new Date(Date.now() + 600000),
//     httpOnly:true
//    })) ;
const decode = jwt.verify(token, process.env.SECRET_KEY);
console.log(decode);

    console.log("yahan bhi theek hai")
    //console.log(cookie);
    const registered = await reg_cust.save();
    console.log(`${decode}///$$$$$$$$$$$$$$$$$$$$$$/`);
        let data=req.body;
     let user=await register.create(data);
       if(registered){
        
        res.render("home.ejs")

       }
       else{console.log("error")}
    }catch(err){res.status(400).send(err)}
}
);


app.post("/login",
async (req,res) => {
   try{
       const email = req.body.email;
       const password= req.body.password;
    
       const useremail = await register.findOne({email: email});
       const token = await useremail.generate_token();
       res.cookie("jwt", token,{
        expires: new Date(Date.now() + 600000),
        httpOnly:true
       })
       if(useremail.password === password)
       {res.status(301).render("home.ejs")}
       else{res.send("password are not matching")}
    }catch(err){res.status(400).send("invalid login Credential")}
}
);

app.listen(8000,()=>{
    console.log("Frontend is running on 8000");
});

app.get("/user", (req,res) => {
    res.render("register.ejs")
});

// app.get("/shop", (req,res) => {
//     // console.log("this is the cookie awesome " +req.cookies.jwt)

//     res.render("shop.ejs")
// });

app.get("/home", (req,res) => {
    res.render("home.ejs")
});

app.get("/product", (req,res) => {
    res.render("product.ejs")
});

app.get("/login", (req,res) => {
    res.render("register.ejs")
});

app.get("/shop", async (req,res) => {
    const products = await product.find({});
    // const token  = req.cookies.token;
    // const decoded = token.verify(token,process.env.SECRET_KEY);
    // console.log(decoded);
    
    res.render("shop.ejs",{data:products})
//  res.send(products)
})

app.get("/product/:id", async (req,res) => {
    try
    {const product_id = await product.find({_id: req.params.id})
    console.log(req.params)
    console.log(product_id)
    res.render("product.ejs",{data:product_id});}
    catch(err){res.status(400).send("invalid")}
})

app.get("/product", async (req,res) => {
    try
    {
        // const token = req.cookies.jwt;
        // const cart = await product.find({Buyer_ID: decode._id})
        // res.render("cart.ejs",{data:cart})
        // const decode = jwt.verify(token, process.env.SECRET_KEY);
        // const cart = await product.find({Buyer_ID: decode.id})
        // console.log(cart);
        // res.render("cart.ejs",{data:cart});
    }
    catch(err){res.status(400).send("invalid")}
})


app.post("/product", 
async (req,res) => {    
    try
    {   //const customer = await Register.find({req.cookies.token});
        const token = req.cookies.jwt;
        const decode = jwt.verify(token, process.env.SECRET_KEY);
        console.log(decode);
        //console.log(token);
        const data =req.body
        console.log(data);
        

        const new_cart = new naya_cart({
            Buyer_ID : decode._id,
            Item_name: data.Item_name,
            Item_code : data.Item_code,
            size : data.size,
            Quantity : data.quantity,
            price : data.cost,
            DoP : Date.now(),
            Address : decode.Address
        })

        const done = await new_cart.save()
        const data1 = req.body;
        const cart = await product.find({Buyer_ID: decode._id})
        res.render("cart.ejs",{data:cart})
        //console.log(data1)
       // const new_entry = await naya_cart.create(done)
        
       
        
         
       //res.send(done);
    }
    catch(err){res.status(400).send(err)}
})

// const createToken = async() => {
//     const token = await jwt.sign({_id:"6423b41c9e3035f3233e4782"}, "sothisisatrialforjsonwebtoken")
//     console.log(token);

//     const user_verify = await jwt.verify(token, "sothisisatrialforjsonwebtoken")
//     console.log(user_verify);
// }
// createToken();

//SYNTAX OF res.cookie => res.cookie(name,value, [option])
