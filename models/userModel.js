const mongoose = require('mongoose'); 
const validator = require('validator');
const Schema = mongoose.Schema;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
      },
     email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
          validate( value ) {
                if( !validator.isEmail( value )) {
                     throw new Error(' Email is invalid')
                      }
                 }
       },
     password: {
         type: String,
         required: true,
         minLength: 7,
         trim: true,
         validate(value) {
            if( value.toLowerCase().includes('password')) {
            throw new Error('password incorrect')
           }
        }
     }  }, {
      timestamps: true
      })
// generate auth token
   UserSchema.methods.generateAuthToken = async function () {
        const user = this
         const token = jwt.sign({ _id: user._id.toString()},process.env.JWT_SECRET)
     user.tokens = user.tokens.concat({token})
        await user.save()
        return token
     }
// hash password before saving user
   UserSchema.pre('save', async function(next) {
        const user = this
        if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
     }
       next()
     })
// login users
    UserSchema.statics.findByCredentials = async (email, password) => {
        const user = await User.findOne({ email })
     if (!user) {
       throw new Error('Unable to log in')
     }
      const isMatch = await bcrypt.compare(password, user.password)
     if(!isMatch) {
        throw new Error('Unable to login')
     }
        return user
     }
const User = mongoose.model('User', UserSchema);
module.exports = User;