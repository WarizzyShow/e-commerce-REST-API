const User = require('../models/userModel');
const bcrypt = require('bcrypt');


const Register =  async (req,res)=>{
    try {
         const salt = await bcrypt.genSalt(10);
         const hashPassword = await bcrypt.hash(req.body.password, salt);
         const newUser = new User({
           name: req.body.name,
           email : req.body.email,
           password : hashPassword

         });
         const user = await newUser.save();
         console.log(user)
         res.status(201).json(newUser)
     } catch(err) {
            res.status(500).json(err)       
    }
}

const Login = async (req,res)=>{
    try {
       const user = await User.findOne({ email : req.body.email })
       !user && res.status(400).json('incorrect details');

       const validated = await bcrypt.compare(req.body.password, user.password);
       !validated && res.status(400).json('incorrect password');

       const { password, ...others} = await user._doc; 
       res.status(200).json(others)
    } catch(err) {
       res.status(500).json(err)
    }
};

//  update user
const updateUser =  async (req,res)=>{
    if(req.body.userId ==  req.params.id){
        if(req.body.password){
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
        }
    try {
           const updatedUser = await User.findByIdAndUpdate(req.params.id, { $set : req.body}, { new: true});
           res.status(200).json(updatedUser)      
    }  
    catch(err) {
         res.status(500).json(err)
    }
    } else {
        res.status(401).json('you can only update your profile')
    }
}

module.exports = {
    Login,
    Register,
    updateUser
}