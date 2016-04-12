var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var layout = new Schema({
    selected: Boolean,
    header: {
        content: String,
        enabled: Boolean,
        menu: {type: mongoose.Schema.Types.ObjectId, ref: 'Menu'}
    },
    footer: {
        content: String,
        enabled: Boolean,
        menu: {type: mongoose.Schema.Types.ObjectId, ref: 'Menu'}
    },
    navLeft: {
        content: String,
        enabled: Boolean,
        items: [{type: mongoose.Schema.Types.ObjectId, ref: 'Menu'}]
    },
    navRight: {
        content: String,
        enabled: Boolean,
        items: [{type: mongoose.Schema.Types.ObjectId, ref: 'Menu'}]
    }
});

module.exports = mongoose.model('Layout', layout);

