jwt = require('jsonwebtoken');

module.exports = {
    validateToken: validateToken
};

function tokenValid(token, secret) {
    // verifies secret and checks exp
    var d;
    return jwt.verify(token, secret, function (err, decoded) {
        d = decoded;
    });
    return d;

}

function validateToken(token, secret) {
    console.log(tokenValid(token, secret));
    return token && tokenValid(token, secret);
}

function validateToken(token, secret) {
    this.decoded;
    if (token) {

        // verifies secret and checks exp
         jwt.verify(token, secret, function (err, decoded) {
            if (err) {
                return res.send({success: false, message: 'Failed to authenticate token.'});
            } else {
                // if everything is good, save to request for use in other routes
                this.decoded = decoded;
                console.log(this.decoded);
            }
        });

    } else {

        // if there is no token
        // return an error
        return res.send({
            success: false,
            message: 'No token provided.'
        });

    }
    return this.decoded;
}