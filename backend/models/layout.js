var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var layout = new Schema({
    name: String,
    content: String,
    items: [{type: mongoose.Schema.Types.ObjectId, ref: 'Menu'}]
});

module.exports = mongoose.model('Layout', layout);

