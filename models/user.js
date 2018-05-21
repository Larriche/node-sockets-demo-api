'use strict';
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
      },
  });

  User.associate = function(models) {
    Activity.hasMany(
          as: 'ActivitiesFrom',
          models.Activity,
          { foreignKey: 'from_id' }
    );

    Activity.hasMany(
          as: 'ActivitiesFor',
          models.Activity,
          { foreignKey: 'to_id' }
    );
  };
  return User;
};