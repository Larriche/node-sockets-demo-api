const models = require("../models");
const Activity = models.Activity;
const User = models.User;
const Sequelize = models.Sequelize;
const Op = Sequelize.Op;

const activities = {
    /**
     * Load and return all activities
     */
    getAll(req, res, next) {
        let userId = req.query.user_id;

        Activity.findAll({
            where: {
                [Op.or]: [{ fromId: userId }, { toId: userId }]
            },
            order: [['createdAt', 'DESC']],
            include: [{
                association: 'Author',
                attributes: ['name']
            },{
                association: 'Recipient',
                attributes: ['name']
            }]
        }).then(function (activities) {
            res.status = 200;
            res.json(activities);
        }).catch(function (error) {
        });
    }
};

module.exports = activities;