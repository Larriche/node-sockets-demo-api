const models = require("../models");
const Activity = models.Activity;

const activities = {
    /**
     * Save an activity into the db
     */
    save(data) {
        return Activity
            .build(data)
            .save();
    },

    /**
     * Get an activity matching given query
     *
     * @param {Object}
     */
    get(query) {
        return Activity.find({
            where: query,
            include: [{
                association: 'Author',
                attributes: ['name']
            },
            {
                association: 'Recipient',
                attributes: ['name']
            }]
        });
    },

    /**
     * Get all activities matching a given query
     */
    getAll(query) {
        return Activity.findAll({
            where: query,
            order: [['createdAt', 'DESC']],
            include: [{
                association: 'Author',
                attributes: ['name']
            },
            {
                association: 'Recipient',
                attributes: ['name']
            }]
        });
    },
};

module.exports = activities;