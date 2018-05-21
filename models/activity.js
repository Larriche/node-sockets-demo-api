'use strict';
module.exports = (sequelize, DataTypes) => {
  var Activity = {
      message: {
          type: DataTypes.STRING,
          field: 'messages'
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
      }
  };

  Activity.associate = function(models) {
    // associations can be defined here
    Activity.belongsTo(
        as: 'Author',
        models.User,
        { foreignKey: 'from_id' }
    );

    Activity.belongsTo(
        as: 'Recipient',
        models.User,
        { foreignKey: 'to_id' }
    );
  };
  return Activity;
};