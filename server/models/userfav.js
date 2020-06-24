'use strict';
module.exports = (sequelize, DataTypes) => {
  const userfav = sequelize.define('userfav', {
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
  userfav.associate = function(models) {
    // associations can be defined here
  };
  return userfav;
};