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
    }
};

module.exports = activities;