'use strict';
module.exports = (sequelize, DataTypes) => {
  const workhistories = sequelize.define('workhistories', {
    resumeId: DataTypes.INTEGER,
    companyName: DataTypes.STRING,
    designation: DataTypes.STRING,
    joiningDate: DataTypes.STRING,
    relievingDate: DataTypes.STRING,
    jobDescription: DataTypes.STRING
  }, {});
  workhistories.associate = function(models) {
    // associations can be defined here
  };
  return workhistories;
};