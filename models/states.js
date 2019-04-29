'use strict';
module.exports = (sequelize, DataTypes) => {
  var states = sequelize.define('states', {
    country_id : DataTypes.INTEGER,
    name :  DataTypes.STRING
  }, {
    timestamps: false,
  });
  states.associate = function(models) {
    // associations can be defined here
  };
  return states;
};