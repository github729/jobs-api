'use strict';
module.exports = (sequelize, DataTypes) => {
  const education = sequelize.define('education', {
    resumeId: DataTypes.INTEGER,
    instituteName: DataTypes.STRING,
    qualification: DataTypes.STRING,
    result: DataTypes.STRING,
    startingDate: DataTypes.STRING,
    endingDate: DataTypes.STRING,
    description: DataTypes.STRING
  }, {});
  education.associate = function(models) {
    // associations can be defined here
  };
  return education;
};