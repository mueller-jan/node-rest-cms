var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var deepPopulate = require('mongoose-deep-populate')(mongoose);


var layout = new Schema({
    name: String,
    content: String,
    items: [{type: mongoose.Schema.Types.ObjectId, ref: 'Menu'}]
});

layout.plugin(deepPopulate);

module.exports = mongoose.model('Layout', layout);
