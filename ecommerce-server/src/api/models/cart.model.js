const mongoose = require('mongoose');

var Schema = new mongoose.Schema({
    productID: { type: Object, required: 'productID name can\'t be empty'},
    email: {
       type: String,
    },
    count:{
        type:Number,
        default:1
    },
    product:{
        type:Object
    },
});
module.exports = mongoose.model('Cart', Schema);
