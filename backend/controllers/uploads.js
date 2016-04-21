var BaseController = require('./basecontroller');
var fs = require('fs');
var mime = require('mime');

function Uploads() {
}

Uploads.prototype = new BaseController();

module.exports = function () {
    var controller = new Uploads();

    controller.addAction('POST', '/upload', function (req, res, next) {
        var files = req.files;
        var keys = Object.keys( files );
        for( var i = 0,length = keys.length; i < length; i++ ) {
            // console.log(i)
            var file = files[keys[i]];
            read(file);
        }

        function read(file) {
            fs.readFile(file.path, function (err, data) {
                console.log(file.path)
                var imageName = file.name;
                if (!imageName) {
                    //error
                    if (err) return next(controller.RESTError('InternalServerError', err));
                } else {
                    var newPath = __dirname + "/../uploads/images/" + imageName;
                    fs.rename(file.path, newPath, function (err) {
                        if (err) return next(controller.RESTError('InternalServerError', err));
                    });
                }
            });
        }

        res.send("upload complete");
    });

    //get list of path to all images
    controller.addAction('GET', '/images', function (req, res, next) {
        var path = __dirname + '/../uploads/images';
        fs.readdir(path, function(err, files) {
            if (err) return next(controller.RESTError('InternalServerError', err));
            var API_URL =  (req.isSecure()) ? 'https' : 'http' + '://' + req.headers.host;
            for (var i = 0; i < files.length; i++) {
                files[i] = API_URL + '/uploads/images/' + files[i];
            }
            res.send(files);
        });
    });

    controller.addAction('DEL', '/images/:id', function (req, res, next) {
        var filename = req.params.id;
        var path = __dirname + '/../uploads/images/' + filename;

        fs.exists(path, function(exists) {
            if(exists) {
                fs.unlinkSync(path);
                res.send("file deleted");
            } else {
                console.log('File not found, so not deleting.');
            }
        });
    });



    // serve file via fs.readFile
    // controller.addAction('GET', '/uploads/images/:id', function (req, res, next) {
    //     var id = req.params.id;
    //
    //     if (id) {
    //         var filePath = __dirname + '/../uploads/images/' + id;
    //         fs.readFile(filePath, function read(err, img) {
    //             if (err) return next(controller.RESTError('InternalServerError', err));
    //             var contentType = mime.lookup(filePath);
    //             res.writeHead(200, {'Content-Type': contentType});
    //             res.end(img, 'binary');
    //         });
    //     } else {
    //         next(controller.RESTError('InvalidArgumentError', 'Invalid id'));
    //     }
    // });

    // serve file via fs.readFile
    // controller.addAction('GET', '/uploads/images/:id', function (req, res, next) {
    //     var id = req.params.id;
    //
    //     if (id) {
    //         var filePath = __dirname + '/../uploads/images/' + id;
    //         fs.readFile(filePath, function read(err, img) {
    //             if (err) return next(controller.RESTError('InternalServerError', err));
    //             var contentType = mime.lookup(filePath);
    //             res.writeHead(200, {'Content-Type': contentType});
    //             res.end(img, 'binary');
    //         });
    //     } else {
    //         next(controller.RESTError('InvalidArgumentError', 'Invalid id'));
    //     }
    // });



    return controller;
};
