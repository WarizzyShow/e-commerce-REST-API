const mongoose = require('mongoose'); 
const Schema = mongoose.Schema;

const CartSchema = new Schema({
    userId : {
        type: String,
        required: true,
    },
    product : [
        {
            productId : {
                type: String,
            },
            quantity : {
                type: Number,
                defualt : 1
            },
        },
    ]
    
    
}, { timestamps: true})


const Order = mongoose.model('Cart', CartSchema);
module.exports = Order;