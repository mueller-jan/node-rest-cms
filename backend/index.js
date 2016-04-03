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
            content: '<p><span style="color: rgb(0, 0, 0);text-align: justify;float: none;background-color: rgb(255, 255, 255);"><span style="color: rgb(102, 102, 102);text-align: left;float: none;background-color: rgb(255, 255, 255);">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu.</span></span></p><p><span style="color: rgb(102, 102, 102);">In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc,</span></p><p><br/><img src="http://lorempixel.com/g/400/200/"/><br/></p><p><span style="color: rgb(102, 102, 102);"><br/></span></p><p><span style="color: rgb(102, 102, 102);">In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc,</span></p>',
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