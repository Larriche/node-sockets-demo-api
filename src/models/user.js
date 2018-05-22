'use strict';
const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
      name: {
          type: DataTypes.STRING,
          field: 'name'
      },
      email:  {
          type: DataTypes.STRING,
          field: 'email'
      },
      password: {
          type: DataTypes.STRING,
          field: 'password'
      }
  }, {
      tableName: 'users',
      underscored: true
  });

  User.associate = function(models) {
    User.hasMany(
        models.Activity,
        {as: 'ActivitiesFrom',
          foreignKey: 'from_id' }
    );

    User.hasMany(
        models.Activity,
        {as: 'ActivitiesFor',
        foreignKey: 'to_id' }
    );
  };

  User.authenticate = function(email, password, callback) {
      User.find({
          where: {
              email
          }
      }).then(function (user) {
          if (!user) {
              var err = new Error('User not found.');
              err.status = 401;
              return callback(err);
          } else {
              bcrypt.compare(password, user.password, function (error, result) {
                  if (result === true) {
                      return callback(null, user);
                  } else {
                      var err = new Error('Invalid password');
                      return callback(err);
                  }
              });
          }
      }).catch(function(error) {
          return callback(error);
      });
  };

  return User;
};