var restify = require("restify");
var lib = require("./lib");
var config = lib.config;
var colors = require("colors");

var server = restify.createServer(lib.config.server);

//turn query parameters into an object so that we can access them easily
server.use(restify.queryParser());

//access the content of the POST and PUT requests as
//an object, with the added bonus of autoparsing JSON strings.
server.use(restify.bodyParser({keepExtensions: true, uploadDir: "uploads"}));

//Cross Origin Resource Sharing
restify.CORS.ALLOW_HEADERS.push('Access-Control-Allow-Origin');
restify.CORS.ALLOW_HEADERS.push('x-access-token');
server.use(restify.CORS());

var mongoose = require('mongoose');
var Page = require('./models/page');
var Layout = require('./models/layout');
var Menu = require('./models/menu');

var layoutElements = [];

Layout.count({}, function (err, result) {
    if (err) throw err;
    console.log("prefill database")
    if (result === 0) {
        var page = new Page({
            slug: 'start',
            date: new Date(),
            title: 'Start'
        });

        page.save(function (err) {
            if (err) throw err;
        });

        var page1 = new Page({
            slug: 'page1',
            date: new Date(),
            title: 'Page1'
        });

        page1.save(function (err) {
            if (err) throw err;
        });

        var menu = new Menu({
            name: 'Default',
            items: [page, page1]
        });

        menu.save(function (err) {
            if (err) throw err;
        });

        layoutElements.push(new Layout({
            name: 'toolbar',
            content: 'NODE CMS',
            items: [menu]
        }));

        layoutElements.push(new Layout({
            name: 'sidebar-left'
        }));

        layoutElements.push(new Layout({
            name: 'footer'
        }));

        for (var i = 0; i < layoutElements.length; i++)
            layoutElements[i].save(function (err, l) {
                if (err) throw err;
            });
    }
});


//setup unprotected routes (no authentication required)
lib.helpers.setupRoutes(server, lib, false);

// route middleware to verify a token
server.use(function (req, res, next) {
    lib.helpers.validateToken(req, res, next);
});

server.post('/upload', function (req, res, next) {
    res.send("upload complete");
});

//Validate each request, as long as there is a schema for it
//server.use(function(req, res, next) {
//    var results = lib.schemaValidator.validateRequest(req);
//    if(results.valid) {
//        next();
//    } else {
//        res.send(400, results);
//    }
//});

//setup protected routes (authentication required)
lib.helpers.setupRoutes(server, lib, true);

server.listen(config.server.port, function () {
    console.log("Server started succesfully...".green);

    lib.db.connect(function (err) {
        if (err) console.log("Error trying to connect to database: ".red, err.red)
        else console.log("Database service successfully started".green)
    })
});