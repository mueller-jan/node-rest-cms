var BaseController = require('./basecontroller');
var _ = require('underscore');
var Page = require('../models/page');

function Pages() {
}

Pages.prototype = new BaseController();

module.exports = function () {
    var controller = new Pages();

    //get pages
    controller.addAction('GET', '/pages', function (req, res, next) {

        var filterByType = false || req.params.type;

        if (filterByType) {
            Page
                .find({type: filterByType})
                .exec(function (err, list) {
                    if (err) return next(controller.RESTError('InternalServerError', err));
                    res.send(list);
                })
        } else {
            Page.find().exec(function (err, list) {
                if (err) return next(controller.RESTError('InternalServerError', err));
                res.send(list);
            });
        }
    }, true);

    //get posts from category
    controller.addAction('GET', '/pages/categories', function (req, res, next) {
        var ids = req.params.ids.split(',');
        console.log(req.params)
        var startDate = req.params.startDate;
        var endDate = req.params.endDate || new Date(0);
        var limit = req.params.limit || 10;
        var sort = req.params.sort || '-date';
        console.log("srtatasdkrfasdöf")
        console.log(startDate)

        var query = {
            $and: [
                {
                    categories: {
                        $in: ['blog']
                    }
                },
                {type: 'post'},
                {date: {$lt: startDate}}
            ]
        };

        console.log(query)

        if (ids) {
            Page.find(query)
                .limit(limit)
                .sort(sort)
                .exec(function (err, list) {
                    if (err) return next(controller.RESTError('InternalServerError', err));
                    res.send(list);
                });
        } else {
            next(controller.RESTError('InvalidArgumentError', 'Invalid id'))
        }
    }, false);


    //get page by id or slug
    controller.addAction('GET', '/pages/:id', function (req, res, next) {
        var id = req.params.id;
        if (id) {

            //find id or slug
            var query = {$or: [{slug: id}]};
            if (id.match(/^[0-9a-fA-F]{24}$/)) {
                query.$or.push({_id: id});
            }

            Page.findOne(query, function (err, p) {
                if (err) return next(err);
                if (!p) {
                    return next(controller.RESTError('ResourceNotFoundError', 'Not found'));
                }
                res.send(p);
            })
        } else {
            next(controller.RESTError('InvalidArgumentError', 'Invalid id'))
        }
    });

    //create page
    controller.addAction('POST', '/pages', function (req, res, next) {
        var body = req.body;
        if (body) {
            var page = new Page(body);
            page.date = new Date();
            page.save(function (err, p) {
                if (err) return next(controller.RESTError('InternalServerError', err));
                res.send(p);
            })
        } else {
            next(controller.RESTError('InvalidArgumentError', 'No data received'))
        }
    }, true);

    //update page
    controller.addAction('PUT', '/pages/:id', function (req, res, next) {
        var body = req.body;
        var id = req.params.id;
        if (id) {
            Page.findOne({_id: id})
                .exec(function (err, p) {
                    if (err) return next(controller.RESTError('InternalServerError', err));
                    p = _.extend(p, body);
                    p.save(function (err, p) {
                        if (err) return next(controller.RESTError('InternalServerError', err));
                        res.send(p);
                    });
                })
        } else {
            next(controller.RESTError('InvalidArgumentError', 'Invalid id received'))
        }
    }, true);

    //delete page
    controller.addAction('DEL', '/pages/:id', function (req, res, next) {
        var id = req.params.id;
        if (id) {
            Page.findOne({_id: id})
                .exec(function (err, p) {
                    if (err) return next(controller.RESTError('InternalServerError', err));
                    p.remove(function (err, p) {
                        if (err) return next(controller.RESTError('InternalServerError', err));
                        res.send(p);
                    });
                })
        } else {
            next(controller.RESTError('InvalidArgumentError', 'Invalid id received'))
        }
    }, true);

    return controller;
};