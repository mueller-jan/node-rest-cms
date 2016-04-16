var BaseController = require('./basecontroller');
var fs = require('fs');

function Uploads() {
}

Uploads.prototype = new BaseController();

module.exports = function () {
    var controller = new Uploads();

    controller.addAction('POST', '/uploads/images/:id', function (req, res, next) {
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

    controller.addAction('GET', '/uploads/images/:id', function (req, res, next) {
        var id = req.params.id;

        if (id) {
            // var img = fs.readFileSync(__dirname + "/../uploads/images/" + id);
            fs.readFile(__dirname + '/../uploads/images/' + id, function read(err, img) {
                if (err) return next(controller.RESTError('InternalServerError', err));
                res.writeHead(200, {'Content-Type': 'image/jpg'});
                res.end(img, 'binary');
            });
        } else {
            next(controller.RESTError('InvalidArgumentError', 'Invalid id'));
        }
    });

    return controller;
};
