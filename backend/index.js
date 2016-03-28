var restify = require("restify");
var lib = require("./lib");
var config = lib.config;
var colors = require("colors");

var server = restify.createServer(lib.config.server);

//turn query parameters into an object so that we can access them easily
server.use(restify.queryParser());

//access the content of the POST and PUT requests as
//an object, with the added bonus of autoparsing JSON strings.
server.use(restify.bodyParser());

//Cross Origin Resource Sharing
restify.CORS.ALLOW_HEADERS.push('authorization');
restify.CORS.ALLOW_HEADERS.push('Access-Control-Allow-Origin');
server.use(restify.CORS());

server.get('/setup', function (req, res) {
    var mongoose    = require('mongoose');
    var User = require('./models/user');
    var nick = new User({
        name: 'Nick Cerminara',
        password: 'password',
        admin: true
    });


     //save the sample user
    nick.save(function (err) {
        if (err) throw err;

        console.log('User saved successfully');
        res.json({success: true});
    });
});
//setup protected routes (authentication required)
lib.helpers.setupRoutes(server, lib, false);

// route middleware to verify a token
server.use(function (req, res, next) {
    lib.helpers.validateToken(req, res, next);
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