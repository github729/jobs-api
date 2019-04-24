'use strict';
module.exports = (sequelize, DataTypes) => {
  const jobs = sequelize.define('jobs', {
    category: DataTypes.STRING,
    jobType: DataTypes.STRING,
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    country: DataTypes.STRING,
    state: DataTypes.STRING,
    minSalary: DataTypes.INTEGER,
    maxSalary: DataTypes.INTEGER,
    salaryType: DataTypes.STRING,
    experience: DataTypes.STRING,
    function: DataTypes.STRING,
    industry: DataTypes.STRING,
    companyName: DataTypes.STRING,
    email: DataTypes.STRING,
    mobileNumber: DataTypes.STRING,
    address: DataTypes.STRING
  }, {});
  jobs.associate = function(models) {
    // associations can be defined here
  };
  return jobs;
};