const mongoose = require('mongoose');


var Schema = new mongoose.Schema({
    name: { type: String, required: 'name can\'t be empty', unique: true },
    description: { type: String},
    report: { type: String},
});

module.exports = mongoose.model('Category', Schema);
