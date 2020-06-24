'use strict';
module.exports = (sequelize, DataTypes) => {
  const usercart = sequelize.define('usercart', {
    "userId": {
      type: DataTypes.INTEGER,
      references: 'users',
      referencesKey: 'id'
    },
    "productId": {
      type: DataTypes.INTEGER,
      references: 'products',
      referencesKey: 'id'
    }
  }, {});
  usercart.associate = function(models) {
    // associations can be defined here
    // models.usercart.belongsTo(models.users);
    // models.usercart.belongsTo(models.products);
  };
  return usercart;
};