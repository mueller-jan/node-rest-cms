var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var menu = new Schema({
    name: String,
    items: [{type: mongoose.Schema.Types.ObjectId, ref: 'Page'}]
});

module.exports = mongoose.model('Menu', menu);

