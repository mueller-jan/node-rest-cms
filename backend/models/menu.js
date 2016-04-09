var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var menu = new Schema({
    title: String,
    items: [{
        title: String,
        path: String
    }]

});

module.exports = mongoose.model('Menu', menu);

