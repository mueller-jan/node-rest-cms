var BaseController = require('./basecontroller');
var _ = require('underscore');
var Configuration = require('../models/configuration');


function Configurations() {}

Configurations.prototype = new BaseController();

module.exports = function () {
    var controller = new Configurations();

    //get layouts
    controller.addAction('GET', '/configurations', function (req, res, next) {
        Configuration.findOne({selected: true})
            .populate('header.menu')
            .exec(function (err, list) {
            if (err) return next(controller.RESTError('InternalServerError', err));
                res.send(list);
        });
    }, false);
    
    return controller;
};