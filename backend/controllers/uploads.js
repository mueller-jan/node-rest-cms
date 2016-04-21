var BaseController = require('./basecontroller');
var fs = require('fs');
var mime = require('mime');
var lwip = require('lwip');

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
                    var thumbPath = __dirname + "/../uploads/thumbs/" + imageName;

                    // obtain an image object:
                    require('lwip').open(file.path, function(err, image){
                        if (err) {
                            console.log(err)
                        }
                        // check err...
                        // define a batch of manipulations and save to disk as JPEG:
                        image.batch()
                            .scale(0.75)          // scale to 75%
                            // .rotate(45, 'white')  // rotate 45degs clockwise (white fill)
                            // .crop(200, 200)       // crop a 200X200 square from center
                            // .blur(5)              // Gaussian blur with SD=5
                            .writeFile(thumbPath, function(err){
                                if (err) {
                                    console.log(err)
                                }
                            });

                    });

                    fs.rename(file.path, newPath, function (err) {
                        if (err) return next(controller.RESTError('InternalServerError', err));
                    });
                }
            });
        }

        res.send("upload complete");
    });

    //get list of path to all images
    controller.addAction('GET', '/uploads/images', function (req, res, next) {
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

    controller.addAction('DEL', '/uploads/images/:id', function (req, res, next) {
        var filename = req.params.id;
        var path = __dirname + '/../uploads/images/' + filename;
        var thumbPath = __dirname + '/../uploads/thumbs/' + filename;

        fs.exists(path, function(exists) {
            if(exists) {
                fs.unlinkSync(path);
                res.send("file deleted");
            } else {
                console.log('File not found, so not deleting.');
            }
        });

        fs.exists(thumbPath, function(exists) {
            if(exists) {
                fs.unlinkSync(thumbPath);
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
