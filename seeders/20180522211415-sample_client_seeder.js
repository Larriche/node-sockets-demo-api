'use strict';
const bcrypt = require('bcrypt');
let password = bcrypt.hashSync('user1234', 10);

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [{
      name: 'user1',
      password,
      email: 'user1@notify.com',
      role: 'user'
    }, {
        name: 'user2',
        password,
        email: 'user2@notify.com',
        role: 'user'
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
