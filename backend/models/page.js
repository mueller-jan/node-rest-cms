var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var page = new Schema({
    slug: {type: String, index: true, unique: true, required: true},
    date: Date,
    title: String,
    content: String,
    status: String,
    type: String,
    category: String
});

module.exports = mongoose.model('Page', page);

