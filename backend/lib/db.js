var config = require("./config"),
    _ = require("underscore"),
    mongoose = require("mongoose");

module.exports = {
    connect: function(cb) {
        mongoose.connect(config.database.host + "/" + config.database.dbname);
        this.connection = mongoose.connection;
        this.connection.on('error', cb);
        this.connection.on('open', cb);
    }
};