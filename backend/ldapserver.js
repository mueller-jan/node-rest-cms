var ldap = require('ldapjs');
var fs = require('fs');
var spawn = require('child_process').spawn;

var server = ldap.createServer();

function loadPasswdFile(req, res, next) {
    fs.readFile('/etc/passwd', 'utf8', function(err, data) {
        if (err)
            return next(new ldap.OperationsError(err.message));

        req.users = {};

        var lines = data.split('\n');
        for (var i = 0; i < lines.length; i++) {
            if (!lines[i] || /^#/.test(lines[i]))
                continue;

            var record = lines[i].split(':');
            if (!record || !record.length)
                continue;

            req.users[record[0]] = {
                dn: 'cn=' + record[0] + ', ou=users, o=myhost',
                attributes: {
                    cn: record[0],
                    uid: record[2],
                    gid: record[3],
                    description: record[4],
                    homedirectory: record[5],
                    shell: record[6] || '',
                    objectclass: 'unixUser'
                }
            };
        }

        return next();
    });
}

var pre = [authorize, loadPasswdFile];

server.search('o=myhost', pre, function(req, res, next) {
    Object.keys(req.users).forEach(function(k) {
        if (req.filter.matches(req.users[k].attributes))
            res.send(req.users[k]);
    });

    res.end();
    return next();
});

server.add('ou=users, o=myhost', pre, function(req, res, next) {
    if (!req.dn.rdns[0].cn)
        return next(new ldap.ConstraintViolationError('cn required'));

    if (req.users[req.dn.rdns[0].cn])
        return next(new ldap.EntryAlreadyExistsError(req.dn.toString()));

    var entry = req.toObject().attributes;

    if (entry.objectclass.indexOf('unixUser') === -1)
        return next(new ldap.ConstraintViolation('entry must be a unixUser'));

    var opts = ['-m'];
    if (entry.description) {
        opts.push('-c');
        opts.push(entry.description[0]);
    }
    if (entry.homedirectory) {
        opts.push('-d');
        opts.push(entry.homedirectory[0]);
    }
    if (entry.gid) {
        opts.push('-g');
        opts.push(entry.gid[0]);
    }
    if (entry.shell) {
        opts.push('-s');
        opts.push(entry.shell[0]);
    }
    if (entry.uid) {
        opts.push('-u');
        opts.push(entry.uid[0]);
    }
    opts.push(entry.cn[0]);
    var useradd = spawn('useradd', opts);

    var messages = [];

    useradd.stdout.on('data', function(data) {
        messages.push(data.toString());
    });
    useradd.stderr.on('data', function(data) {
        messages.push(data.toString());
    });

    useradd.on('exit', function(code) {
        if (code !== 0) {
            var msg = '' + code;
            if (messages.length)
                msg += ': ' + messages.join();
            return next(new ldap.OperationsError(msg));
        }

        res.end();
        return next();
    });
});

function authorize(req, res, next) {
    if (!req.connection.ldap.bindDN.equals('cn=root'))
        return next(new ldap.InsufficientAccessRightsError());
    return next();
}

server.bind('cn=root', function(req, res, next) {
    if (req.dn.toString() !== 'cn=root' || req.credentials !== 'secret')
        return next(new ldap.InvalidCredentialsError());

    res.end();
    return next();
});

server.listen(1389, function() {
    console.log('/etc/passwd LDAP server up at: %s', server.url);
});