'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
      username: {
          type: DataTypes.STRING,
          field: 'username'
      },
      age:  {
          type: DataTypes.INTEGER,
          field: 'age'
      },
      password: {
          type: DataTypes.STRING,
          field: 'password'
      },
  });

  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};