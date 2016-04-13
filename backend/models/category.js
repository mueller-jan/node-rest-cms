var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var category = new Schema({
    _id: String,
    title: {type: String, unique: true, required: true},
    parent: {type: mongoose.Schema.Types.ObjectId, ref: 'Category'},
    description: String
});

module.exports = mongoose.model('Category', category);

