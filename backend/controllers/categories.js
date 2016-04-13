var BaseController = require('./basecontroller');
var _ = require('underscore');
var Category = require('../models/category');

function Categories() {
}

Categories.prototype = new BaseController();

module.exports = function () {
    var controller = new Categories();

    //get categories
    controller.addAction('GET', '/categories', function (req, res, next) {
        Category.find().exec(function (err, list) {
            if (err) return next(controller.RESTError('InternalServerError', err));
            res.send(list);
        });
    }, false);

    //update category
    controller.addAction('PUT', '/categories/:id', function (req, res, next) {
        var body = req.body;
        var id = req.params.id;
        if (id) {
            Category.findOneAndUpdate({_id: id}, body, function (err, c) {
                if (err) return next(controller.RESTError('InternalServerError', err));
                res.send(c);
            });
        } else {
            next(controller.RESTError('InvalidArgumentError', 'Invalid id received'))
        }
    }, true);


    //create category
    controller.addAction('POST', '/categories', function (req, res, next) {
        var body = req.body;
        if (body) {
            var category = new Category(body);
            category.save(function (err, c) {
                if (err) return next(controller.RESTError('InternalServerError', err));
                res.send(c);
            })
        } else {
            next(controller.RESTError('InvalidArgumentError', 'No data received'))
        }
    }, false);

    //get category
    controller.addAction('GET', '/categories/:id', function(req, res, next) {
        var id = req.params.id;
        if (id) {
            Category.findOne({_id : id})
                .exec(function (err, c) {
                if (err) return next(err);
                if (!c) {
                    return next(controller.RESTError('ResourceNotFoundError', 'Not found'));
                }
                res.send(c);
            })
        } else {
            next(controller.RESTError('InvalidArgumentError', 'Invalid id'))
        }
    });
    
    return controller;
};