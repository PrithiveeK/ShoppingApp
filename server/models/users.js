'use strict';
module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    username: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    password: DataTypes.STRING
  }, {});
  users.associate = function(models) {
    // associations can be defined here
    models.users.hasOne(models.userfav, {foreignKey: 'id'});
    models.users.hasOne(models.usercart, {foreignKey: 'id'});
  };
  return users;
};