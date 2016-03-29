//contains functions that are too small and particular to merit their own module, so instead they are grouped here, inside the helpers
//module. The functions are meant to be of use (hence, the name “helpers”) throughout the entire project.
jwt = require('jsonwebtoken');

module.exports = {
    setupRoutes: setupRoutes,
    validateToken: validateToken
};

//if protected is true, the route will be inserted after middleware else before
function setupRoutes(server, lib, protect) {
    for (controller in lib.controllers) {
        cont = lib.controllers[controller]();
        cont.setUpActions(server, protect)
    }
}

function validateToken(req, res, next) {
    // check header
    var token = req.headers['x-access-token'];
    // decode token
    if (token) {
        // verifies secret and checks exp
        jwt.verify(token, require('../lib').config.secret, function (err, decoded) {
            if (err) {
                return res.json({success: false, message: 'Failed to authenticate token.'});
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                console.log(decoded)
                next();
            }
        });
    } else {
        // if there is no token
        // return an error
        return res.send(403, {
            success: false,
            message: 'No token provided.'
        });
    }
}