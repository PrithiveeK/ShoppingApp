'use strict';
module.exports = (sequelize, DataTypes) => {
  const userfav = sequelize.define('userfav', {
    user_id: DataTypes.INTEGER,
    prod_id: DataTypes.INTEGER
  }, {});
  userfav.associate = function(models) {
    // associations can be defined here
  };
  return userfav;
};