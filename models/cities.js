'use strict';
module.exports = (sequelize, DataTypes) => {
  var cities = sequelize.define('cities', {
    state_id : DataTypes.INTEGER, 
    name : DataTypes.STRING
  }, {
    timestamps: false,
  });
  cities.associate = function(models) {
    // associations can be defined here
  };
  return cities;
};