const jwt = require("jsonwebtoken");
const models = require("../models");
const User = models.User;
const UsersService = require('../services').users;
const config = require('../../config/config').development;
const bcrypt = require('bcrypt');

const auth = {
    /**
     * Verify user login credentials against database and return
     * an authentication token
     *
     */
    authenticate(req, res, next) {
        let errors = [];

        if (!req.body.email) {
            errors.push('Email is required');
        }

        if (!req.body.password) {
            errors.push('Password is required');
        }

        if (errors.length) {
            res.status(422).json({
                errors
            });
        } else {
            User.authenticate(req.body.email, req.body.password, function(error, user) {
                if (error || !user) {
                    res.status(422);
                    res.json({
                        message: 'Invalid email or password'
                    });
                } else {
                    const payload = {
                        id: user.id,
                        email: user.email,
                        name: user.name,
                        role: user.role
                    };

                    var token = jwt.sign(payload, config.secret, {
                        expiresIn: config.jwtExpiration
                    });

                    payload.token = token;

                    // return the information including token as JSON
                    res.status(200)
                       .json({
                            user: payload,
                        });
                }
            });
        }
    },

    /**
     * Sign up a client to the system
     *
     */
    signup(req, res, next) {
        let errors = [];

        if (!req.body.email) {
            errors.push('Email is required');
        }

        if (!req.body.name) {
            errors.push('Name is required');
        }

        if (!req.body.password) {
            errors.push('Password is required');
        }

        if (errors.length) {
            res.status(422).json({
                errors
            });
        } else {
            UsersService.get({email: req.body.email}).then(user => {
                if (user) {
                    res.status(422).json({
                        errors: ['Email is already taken']
                    });
                } else {
                    let data = {
                        email: req.body.email,
                        password: bcrypt.hashSync(req.body.password, 10)
                    };

                    UsersService.save(data).then(user => {
                        res.status(200).json({
                            message: 'Your account has been created'
                        });
                    });
                }
            });
        }
    }
};

module.exports = auth;