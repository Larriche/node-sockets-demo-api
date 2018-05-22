'use strict';
const bcrypt = require('bcrypt');
let adminPassword = bcrypt.hashSync('admin', 10);

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [{
      name: 'admin',
      password: adminPassword,
      email: 'admin@notify.com',
      role: 'admin'
    }], {});
  },

  down: (queryInterface, Sequelize) => {
  }
};
