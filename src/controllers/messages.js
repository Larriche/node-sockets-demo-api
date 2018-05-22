const models = require("../models");
const Activity = models.Activity;

const messages = {
    /**
     * Load and return all messages
     */
    getAll(req, res, next) {
        res.status = 200;
        res.json([{
            type: 'message',
            message: 'Good morning'
        }]);
    }
};

module.exports = messages;