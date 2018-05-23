const models = require("../models");
const User = models.User;

const users = {
    /**
     * Load and return all users
     */
    getAll(req, res, next) {
        User.findAll({
            attributes: ['id', 'name', 'role', 'last_visit', 'last_activity', 'created_at'],
            where: {
                role: 'user'
            }
        }).then(function (users) {
            res.status(200).json(users);
        }).catch(function (error) {
        });
    }
};

module.exports = users;