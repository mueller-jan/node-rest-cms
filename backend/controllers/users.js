var BaseController = require('./basecontroller');
var _ = require('underscore');
var User = require('../models/user');
var jwt = require('jsonwebtoken');

function Users() {
}

Users.prototype = new BaseController();

module.exports = function () {
    var controller = new Users();

    controller.addAction('GET', '/users', function (req, res) {
        User.find({}, function (err, users) {
            res.json(users);
        });
    }, true);

    controller.addAction('POST', 'users/:id/authenticate', function (req, res, next) {
        var id = req.params.id;
        if (id) {
            //find the user
            User.findOne({_id: id})
                .exec(function (err, user) {

                    if (err) return next(controller.RESTError('InternalServerError', err));

                    if (!user) {
                        return next(controller.RESTError('Authentication failed. User not found.', err));
                    } else if (user) {

                        //check if password matches
                        user.comparePassword(req.body.password, function (err, isMatch) {
                            if (isMatch && !err) {

                                //if user is found and password is right create a token
                                var token = jwt.sign(user, require('../lib').config.secret, {
                                    expiresInMinutes: 1440 // expires in 24 hours
                                });

                                //return the information including token as JSON
                                res.send({
                                    success: true,
                                    message: 'Token received',
                                    token: token
                                });
                            } else {
                                next(controller.RESTError('InvalidArgumentError', 'Invalid id'));
                            }
                        })
                    }
                })
        } else {
            next(controller.RESTError('InvalidArgumentError', 'Invalid id'));
        }
    });

    return controller;
};