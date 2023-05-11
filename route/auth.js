const Router = require('express');
const router = Router();
const User = require('../models/userModel');
const bcrypt = require('bcrypt');


//  register API
 router.post('/register', async (req,res)=>{
     try {
          const salt = await bcrypt.genSalt(10);
          const hashPassword = await bcrypt.hash(req.body.password, salt);
          const newUser = new User({
            username: req.body.username,
            email : req.body.email,
            password : hashPassword

          });
          const user = newUser.save();
          res.status(201).json(newUser)
      } catch(err) {
             res.status(500).json(err)       
     }
})

// Login API
router.post('/login', async (req,res)=>{
    try {
       const user = await User.findOne({ email : req.body.email })
       !user && res.status(400).json('incorrect details');

       const validated = await bcrypt.compare(req.body.password, user.password) ;
       !validated && res.status(400).json('incorrect password');

       const { password, ...others} = user._doc; 
       res.status(200).json(others)
    } catch(err) {
       res.status(500).json(err)
    }
})
module.exports = router ;