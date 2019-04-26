'use strict';
module.exports = (sequelize, DataTypes) => {
  const resumes = sequelize.define('resumes', {
    userId: DataTypes.INTEGER,
    fullName: DataTypes.STRING,
    addInfo: DataTypes.STRING,
    careerObjective: DataTypes.STRING,
    specialQualification: DataTypes.STRING,
    fatherName: DataTypes.STRING,
    motherName: DataTypes.STRING,
    dob: DataTypes.DATE,
    nationality: DataTypes.STRING,
    gender: DataTypes.STRING,
    address: DataTypes.STRING,
    declaration: DataTypes.STRING
  }, {});
  resumes.associate = function(models) {
    // associations can be defined here
  };
  return resumes;
};