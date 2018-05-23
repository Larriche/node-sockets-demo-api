const models = require("../models");
const Activity = models.Activity;
const Sequelize = models.Sequelize;
const Op = Sequelize.Op;

const messages = {
    /**
     * Load and return all messages
     */
    getAll(req, res, next) {
        let userId = req.query.user_id;

        Activity.findAll({
            where: {
                type: 'message',
                [Op.or]: [{ fromId: userId }, { toId: userId }]
            }
        }).then(function (messages) {
            res.status = 200;
            res.json(messages);
        }).catch(function (error) {
        });
    }
};

module.exports = messages;