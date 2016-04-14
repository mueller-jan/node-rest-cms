var ldap = require('ldapjs');

var server = ldap.createServer();

server.bind('cn=root', function(req, res, next) {
    if (req.dn.toString() !== 'cn=root' || req.credentials !== 'secret')
        return next(new ldap.InvalidCredentialsError());

    res.end();
    return next();
});

server.listen(1389, function() {
    console.log('/etc/passwd LDAP server up at: %s', server.url);
});