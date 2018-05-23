'use strict';

module.exports = (sequelize, DataTypes) => {
  var Activity = sequelize.define('Activity', {
      message: {
          type: DataTypes.STRING,
          field: 'message'
      },
      fromId: {
          type: DataTypes.INTEGER,
          field: 'from_id'
      },
      toId: {
          type: DataTypes.INTEGER,
          field: 'to_id'
      },
      type: {
          type: DataTypes.STRING,
          field: 'type'
      },
      createdAt: {
          type: DataTypes.DATE,
          field: 'created_at'
      }
  }, {
      tableName: 'activities',
      underscored: true
  });

  Activity.associate = function(models) {
    // associations can be defined here
    Activity.belongsTo(
        models.User,
        {as: 'Author',
        foreignKey: 'from_id' }
    );

    Activity.belongsTo(
        models.User,
        {as: 'Recipient',
        foreignKey: 'to_id' }
    );
  };
  return Activity;
};