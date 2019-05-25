'use strict';
module.exports = (sequelize, DataTypes) => {
  const govtjobs = sequelize.define('govtjobs', {
    organisation: DataTypes.STRING,
    postName: DataTypes.STRING,
    qualification: DataTypes.STRING,
    deadline: DataTypes.STRING,
    state: DataTypes.STRING,
    industry: DataTypes.STRING,
    notificationFile: DataTypes.STRING,
    totalVacancies: DataTypes.STRING,
    postedDate: DataTypes.STRING,
    officialSite: DataTypes.STRING
  }, {});
  govtjobs.associate = function(models) {
    // associations can be defined here
  };
  return govtjobs;
};