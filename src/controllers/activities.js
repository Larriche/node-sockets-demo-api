const models = require("../models");
const Activity = models.Activity;
const User = models.User;
const Sequelize = models.Sequelize;
const Op = Sequelize.Op;
const ActivitiesService = require('../services').activities;

const activities = {
    /**
     * Load and return all activities
     */
    getAll(req, res, next) {
        let userId = req.query.user_id ? req.query.user_id : null;
        let query = {};

        if (userId) {
            query = {
                [Op.or]: [{ fromId: userId }, { toId: userId }]
            };
        }

        ActivitiesService.getAll(query)
            .then(function (activities) {
                res.status(200).json(activities);
            }).catch(function (error) {
        });
    }
};

module.exports = activities;