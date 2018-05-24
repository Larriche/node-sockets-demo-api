const config = require('../../config/config').development;
const jwt = require('jsonwebtoken');

const verifyAuthentication = function (req, res, next) {
    var authorization = req.headers['authorization'] ? req.headers['authorization'] : req.headers['Authorization'];

    if (!authorization) return res.status(401).send({ auth: false, message: 'No token provided.' });

    var tokenParts = authorization.split(' ');
    var token = tokenParts[tokenParts.length - 1];

    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

    jwt.verify(token, config.secret, function (err, decoded) {
        if (err) return res.status(401).send({ auth: false, message: 'Failed to authenticate token.' });
    });

    next();
};

module.exports = verifyAuthentication;
