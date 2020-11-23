const mongoose = require('mongoose');

var Schema = new mongoose.Schema({
    name: { type: String, required: 'brand name can\'t be empty', unique: true},
    desc: { type: String},
});
module.exports = mongoose.model('Brand', Schema);
