var BaseController = require('./basecontroller');
var _ = require('underscore');
var Option = require('../models/option');

function Options() {}

Options.prototype = new BaseController();

module.exports = function () {
    var controller = new Options();



    return controller;
};