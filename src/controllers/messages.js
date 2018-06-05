const models = require("../models");
const Activity = models.Activity;
const User = models.User;
const Sequelize = models.Sequelize;
const Op = Sequelize.Op;
const ActivitiesService = require('../services').activities;


const messages = {
    /**
     * Load and return all messages
     */
    getAll(req, res, next) {
        let fromId = req.query.user_1 ? req.query.user_1 : null;
        let toId = req.query.user_2 ? req.query.user_2 : null;
        let userId = req.query.user_id ? req.query.user_id : null;
        let query = {};

        if (fromId && toId) {
            query = {
                [Op.or]: [{
                    [Op.and]: [{ fromId: fromId }, { toId: toId }]
                },
                {
                    [Op.and]: [{ fromId: toId }, { toId: fromId }]
                }]
            };
        } else {
            if (userId) {
                query = {
                    [Op.or]: [{ fromId: userId }, { toId: userId }]
                }
            }
        }

        query.type = 'message';

        ActivitiesService.getAll(query)
            .then(function (messages) {
                res.status(200).json(messages);
            }).catch(function (error) {
            });
    }
};

module.exports = messages;