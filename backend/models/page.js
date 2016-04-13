var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');

var page = new Schema({
    slug: {type: String, index: true, unique: true, required: true},
    date: Date,
    title: String,
    content: String,
    status: String,
    type: String,
    categories: [{type: String, ref: 'Category'}]
});

page.plugin(uniqueValidator);

module.exports = mongoose.model('Page', page);

