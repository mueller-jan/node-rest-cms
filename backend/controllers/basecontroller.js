var _ = require("underscore");
var restify = require("restify");
var lib = require("../lib/index");
var colors = require("colors");

function BaseController() {
    this.actions = [];
    this.protectedActions = [];
    this.server = null;
}

//This method is called upon instantiation of the controller; it is
//meant to add the actual routes to the HTTP server. This method is called during the
//initialization sequence for all controllers exported by the index.js file.
BaseController.prototype.setUpActions = function(server, protect) {
    this.server = server;
    var actions = protect ? this.protectedActions : this.actions;
    _.each(this.actions, function(act) {
        server[act.method.toLowerCase()](act['path'], act['func'])
    })
};

//This method defines an action, which consists of the method, path and function
BaseController.prototype.addAction = function(method, path, func, protect) {
    if (!protect) {protect = false;}
    var action = {
        method: method,
        path: path,
        func: func,
        protect: protect
    };
    if (protect) {
        this.protectedActions.push(action)
    } else {
        this.actions.push(action);
    }

};

//This is a simple wrapper method around all the error methods provided
//by Restify. It provides the benefit of cleaner code.
BaseController.prototype.RESTError = function(type, msg) {
    if(restify[type]) {
        return new restify[type](msg.toString());
    } else {
        console.log("Type " + type + " of error not found".red);
    }
};

module.exports = BaseController;