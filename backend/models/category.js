var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var category = new Schema({
    slug: {type: String, index: true, unique: true, required: true},
    title: {type: String, index: true, unique: true, required: true},
    parent: {type: mongoose.Schema.Types.ObjectId, ref: 'Category'},
    pages: [{type: mongoose.Schema.Types.ObjectId, ref: 'Page'}],
});

module.exports = mongoose.model('Category', category);

