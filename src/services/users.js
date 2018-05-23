const models = require("../models");
const User = models.User;

const users = {
    update (id, data) {
        return User.update(
            data,
            {
                where: {id}
            }
        );
    }
};

module.exports = users;