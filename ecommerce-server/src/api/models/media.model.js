const mongoose = require('mongoose');


var Schema = new mongoose.Schema({
    productID: { type: String, required: 'productID name can\'t be empty'},
    image: {
        type: Array,
    },
    video: {
       type: String,
    },
});
module.exports = mongoose.model('Media', Schema);
