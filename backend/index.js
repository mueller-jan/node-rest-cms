var restify = require("restify");
var lib = require("./lib");
var config = lib.config;
var colors = require("colors");
fs = require("fs");

var server = restify.createServer(lib.config.server);

//turn query parameters into an object so that we can access them easily
server.use(restify.queryParser());

//access the content of the POST and PUT requests as
//an object, with the added bonus of autoparsing JSON strings.
server.use(restify.bodyParser({ keepExtensions: true, uploadDir: "uploads" }));

//Cross Origin Resource Sharing
restify.CORS.ALLOW_HEADERS.push('Access-Control-Allow-Origin');
restify.CORS.ALLOW_HEADERS.push('x-access-token');
server.use(restify.CORS());

//setup unprotected routes (no authentication required)
lib.helpers.setupRoutes(server, lib, false);

// route middleware to verify a token
server.use(function (req, res, next) {
    lib.helpers.validateToken(req, res, next);
});

server.post('/upload', function(req, res, next) {
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