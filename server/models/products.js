'use strict';
module.exports = (sequelize, DataTypes) => {
  const products = sequelize.define('products', {
    product_title: DataTypes.TEXT,
    product_desc: DataTypes.TEXT,
    img_folder: DataTypes.STRING
  }, {});
  products.associate = function(models) {
    // associations can be defined here
  };
  return products;
};