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
     * Get an activity by id
     *
     * @param {integer} id
     */
    get(id) {
        return Activity.find({
            where: {
                id
            },
            include: [{
                association: 'Author',
                attributes: ['name']
            },
            {
                association: 'Recipient',
                attributes: ['name']
            }]
        });
    }
};

module.exports = activities;