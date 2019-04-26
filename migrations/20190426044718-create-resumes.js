'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('resumes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER
      },
      fullName: {
        type: Sequelize.STRING
      },
      addInfo: {
        type: Sequelize.STRING
      },
      careerObjective: {
        type: Sequelize.STRING
      },
      specialQualification: {
        type: Sequelize.STRING
      },
      fatherName: {
        type: Sequelize.STRING
      },
      motherName: {
        type: Sequelize.STRING
      },
      dob: {
        type: Sequelize.DATE
      },
      nationality: {
        type: Sequelize.STRING
      },
      gender: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      declaration: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('resumes');
  }
};