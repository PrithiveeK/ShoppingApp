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
  };
  return usercart;
};