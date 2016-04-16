var BaseController = require('./basecontroller');
var fs = require('fs');
var mime = require('mime');

function Uploads() {
}

Uploads.prototype = new BaseController();

module.exports = function () {
    var controller = new Uploads();

    controller.addAction('POST', '/upload', function (req, res, next) {
        fs.readFile(req.files.file.path, function (err, data) {
            var imageName = req.files.file.name;

            if (!imageName) {
                //error
                if (err) return next(controller.RESTError('InternalServerError', err));
            } else {
                var newPath = __dirname + "/../uploads/images/" + imageName;
                fs.rename(req.files.file.path, newPath, function (err) {
                    if (err) return next(controller.RESTError('InternalServerError', err));
                });
            }
        });

        res.send("upload complete");
    });

    controller.addAction('GET', '/upload/images', function (req, res, next) {
        var path = __dirname + '/../uploads/images';
        fs.readdir(path, function(err, files) {
            if (err) return next(controller.RESTError('InternalServerError', err));
            res.send(files);
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
