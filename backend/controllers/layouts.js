var BaseController = require('./basecontroller');
var _ = require('underscore');
var Layout = require('../models/layout');


function Layouts() {}

Layouts.prototype = new BaseController();

module.exports = function () {
    var controller = new Layouts();

    //get layouts
    controller.addAction('GET', '/layout', function (req, res, next) {
        console.log("layout")
        Layout.find()
            .populate('items')
            .exec(function (err, list) {
            if (err) return next(controller.RESTError('InternalServerError', err));
            console.log("list")
                console.log(list)
                res.send(list);
        });
    }, false);


    return controller;
};