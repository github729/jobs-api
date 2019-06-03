'use strict';
module.exports = (sequelize, DataTypes) => {
  const industries = sequelize.define('industries', {
    name: DataTypes.STRING
  }, {});
  industries.associate = function(models) {
    // associations can be defined here
  };
  return industries;
};