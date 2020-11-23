const mongoose = require('mongoose');


var Schema = new mongoose.Schema({
    name: { type: String, required: 'name can\'t be empty', unique: true },
    customer: { type: String,required: 'Customer can\'t be empty' },
    product: {
        type: String
    },
    quantity:{
        type:Number,
        default:1
    },
    total: {
        type: Number,
        required: 'total can\'t be empty'
    },
    order_at: {
        type: Date
    },
    productData:{
        type:Object
    },
    status:{
        type: String,
        enum:["On Hold","Delivered","Paid"],
        default:"On Hold"
    },
});
module.exports = mongoose.model('Order', Schema);
