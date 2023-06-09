const mongoose = require('mongoose'); 
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
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
    ],
    amount : {
        type: Number,
        required: true
    },
    address : {
        type: Object,
        required: true
    },
    status : {
        type: Object,
        default : 'pending'
    }
}, { timestamps: true})


const Order = mongoose.model('Order', OrderSchema);
module.exports = Order;