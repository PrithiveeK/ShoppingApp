'use strict';
module.exports = (sequelize, DataTypes) => {
  const usercart = sequelize.define('usercart', {
    user_id: DataTypes.INTEGER,
    prod_id: DataTypes.INTEGER
  }, {});
  usercart.associate = function(models) {
    // associations can be defined here
  };
  return usercart;
};