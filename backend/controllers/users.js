var BaseController = require('./basecontroller');
var _ = require('underscore');
var User = require('../models/user');

function Users() {
}

Users.prototype = new BaseController();

module.exports = function () {
    var controller = new Users();

    controller.addAction('GET', '/users', function (req, res) {
        User.find({}, function (err, users) {
            res.json(users);
        });
    });


    //TODO: refactor (name parameter) {"code":"InternalError","message":"Cannot read property 'password' of undefined"}
    // route to authenticate a user (POST http://localhost:8080/api/authenticate)
    controller.addAction('POST', 'users/:id/authenticate', function (req, res, next) {
        var id = req.params.id;
        console.log(id);
        if (id) {
            // find the user
            User.findOne({_id: id})
                .exec(function (err, user) {

                    if (err) throw err;

                    if (!user) {
                        res.json({success: false, message: 'Authentication failed. User not found.'});
                    } else if (user) {

                        // check if password matches
                        if (user.password != req.body.password) {
                            res.json({success: false, message: 'Authentication failed. Wrong password.'});
                        } else {

                            // if user is found and password is right
                            // create a token
                            var token = jwt.sign(user, config.secret, {
                                expiresInMinutes: 1440 // expires in 24 hours
                            });

                            // return the information including token as JSON
                            res.json({
                                success: true,
                                message: 'Enjoy your token!',
                                token: token
                            });
                        }

                    }

                });
        } else {
            next(controller.RESTError('InvalidArgumentError', 'Invalid id'));
        }
    });

    return controller;
};