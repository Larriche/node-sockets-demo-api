const models = require("../models");
const Activity = models.Activity;

const messages = {
    /**
     * Load and return all messages
     */
    getAll(req, res, next) {
        Activity.findAll({
            where: {
                type: 'message'
            }
        }).then(function (messages) {
            res.status = 200;
            res.json(messages);
        }).catch(function (error) {
        });
    }
};

module.exports = messages;