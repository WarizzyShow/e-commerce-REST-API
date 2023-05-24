const mongoose = require('mongoose'); 
const ObjectID = mongoose.Schema.Types.ObjectId;
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    owner : {
        type: ObjectID,
        required: true,
        ref: 'User'
     },
     name: {
        type: String,
        required: true,
        trim: true
     },
     description: {
       type: String,
       required: true
     },
     category: {
        type: String,
        required: true
     },
     price: {
        type: Number,
        required: true
     }
     }, {
     timestamps: true
     })


const Item = mongoose.model('Item',  ItemSchema);
module.exports = Item;