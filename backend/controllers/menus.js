var BaseController = require('./basecontroller');
var _ = require('underscore');
var Menu = require('../models/menu');

function Menus() {
}

Menus.prototype = new BaseController();

module.exports = function () {
    var controller = new Menus();

    //create menu
    controller.addAction('POST', '/menus', function (req, res, next) {
        var body = req.body;
        if (body) {
            var menu = new Menu(body);
            menu.save(function (err, m) {
                if (err) return next(controller.RESTError('InternalServerError', err));
                res.send(m);
            })
        } else {
            next(controller.RESTError('InvalidArgumentError', 'No data received'))
        }
    }, true);

    //get menu
    controller.addAction('GET', '/menus/:id', function (req, res, next) {
        console.log(req.params.id)
        var id = req.params.id;
        if (id) {
            Menu.findOne({_id: id})
                .exec(function (err, m) {
                    if (err) return next(err);
                    if (!m) {
                        return next(controller.RESTError('ResourceNotFoundError', 'Not found'));
                    }
                    console.log("menus")
                    console.log(m)
                    res.send(m);
                })
        } else {
            next(controller.RESTError('InvalidArgumentError', 'Invalid id'));
        }
    });

    //get menus
    controller.addAction('GET', '/menus', function (req, res, next) {
        Menu.find().exec(function (err, list) {
            if (err) return next(controller.RESTError('InternalServerError', err));
            res.send(list);
        });
    }, true);

    //update menu
    controller.addAction('PUT', '/menus/:id', function (req, res, next) {
        var body = req.body;
        var id = req.params.id;
        if (id) {
            Menu.findOne({_id: id})
                .exec(function (err, m) {
                    if (err) return next(controller.RESTError('InternalServerError', err));
                    m = _.extend(m, body);
                    m.save(function (err, m) {
                        if (err) return next(controller.RESTError('InternalServerError', err));
                        res.send(m);
                    })
                })
        } else {
            next(controller.RESTError('InvalidArgumentError', 'Invalid id received'))
        }
    }, true);

    //delete menu
    controller.addAction('DEL', '/menus/:id', function (req, res, next) {
        var id = req.params.id;
        if (id) {
            Menu.findOne({_id: id})
                .exec(function (err, m) {
                    if (err) return next(controller.RESTError('InternalServerError', err));
                    m.remove(function (err, m) {
                        if (err) return next(controller.RESTError('InternalServerError', err));
                    })
                })
        } else {
            next(controller.RESTError('InvalidArgumentError', 'Invalid id received'))
        }
    }, true);

    return controller;
};