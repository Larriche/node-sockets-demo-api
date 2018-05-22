const jwt = require("jsonwebtoken");
const models = require("../models");
const User = models.User;


const auth = {
    /**
     * Verify user login credentials against database and return
     * an authentication token
     *
     */
    authenticate(req, res, next) {
        if (!req.body.email || !req.body.password) {
            var err = new Error('Email and password are required.');
            err.status = 422;
            return next(err);
        } else {
            User.authenticate(req.body.email, req.body.password, function(error, user) {
                if (error || !user) {
                    res.status = 500;
                    res.json({
                        message: 'Invalid email or password'
                    });
                } else {
                    const payload = {
                        email: user.email,
                        name: user.name
                    };

                    var token = jwt.sign(payload, 'secret', {
                        expiresIn: 1440 // expires in 24 hours
                    });

                    // return the information including token as JSON
                    res.status = 200;
                    res.json({
                        success: true,
                        user: payload,
                        token: token
                    });
                }
            });
        }
    }
};

module.exports = auth;