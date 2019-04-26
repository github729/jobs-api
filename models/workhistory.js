'use strict';
module.exports = (sequelize, DataTypes) => {
  const workHistory = sequelize.define('workHistory', {
    resumeId: DataTypes.INTEGER,
    companyName: DataTypes.STRING,
    designation: DataTypes.STRING,
    joiningDate: DataTypes.STRING,
    relievingDate: DataTypes.STRING,
    jobDescription: DataTypes.STRING
  }, {});
  workHistory.associate = function(models) {
    // associations can be defined here
  };
  return workHistory;
};