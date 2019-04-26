'use strict';
module.exports = (sequelize, DataTypes) => {
  const languages = sequelize.define('languages', {
    resumeId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    rating: DataTypes.STRING
  }, {});
  languages.associate = function(models) {
    // associations can be defined here
  };
  return languages;
};