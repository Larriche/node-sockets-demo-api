const models = require("../models");
const User = models.User;

const users = {
    /**
     * Save a user into the db
     */
    save(data) {
        return User
            .build(data)
            .save();
    },

    /**
     * Update user details
     *
     */
    update(id, data) {
        return User.update(
            data,
            {
                where: {id}
            }
        );
    },

    /**
     * Get user matching given query conditions
     */
    get (query) {
        return User.find({
            where: query
        });
    }
};

module.exports = users;