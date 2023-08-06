// const Customer_schema = require('./register')

// exports.register = async(req, res, next) => {
//     try {
//         console.log(req.body);
//         const {name, email, password} = req.body;
//         const succRes = await registerC.registerUser(name, email, password);
        
//         res.json({status: true, success: "Customer registered successfully."})
//     } catch (err) {
//        console.log(err);
//     }
// }

// class registerC {
//     static async registerUser(name, email, password){
//         try {
//             const registerCustomer = new Customer_schema(
//                 {name, email, password});
//             return await registerCustomer.save();   
//         } catch (err) {
//             console.log(err)
//         }
//     }
// }

// const register = async (req,res) => {
//     const {name,email,password}=req.body;
//         const user=await Customer_schema.create({name,email,password});
//         console.log(user);
//         res.status(200).json({user});
// }

// module.exports = register;