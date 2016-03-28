var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var option = new Schema({
    mainMenu: {type: [mongoose.model('Base').schema]},
    theme: {type: String},
    siteUrl: {type: String}
});

module.exports = mongoose.model('Option', option);

