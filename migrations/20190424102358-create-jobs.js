'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('jobs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      category: {
        type: Sequelize.STRING
      },
      jobType: {
        type: Sequelize.STRING
      },
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      country: {
        type: Sequelize.STRING
      },
      state: {
        type: Sequelize.STRING
      },
      minSalary: {
        type: Sequelize.INTEGER
      },
      maxSalary: {
        type: Sequelize.INTEGER
      },
      salaryType: {
        type: Sequelize.STRING
      },
      experience: {
        type: Sequelize.STRING
      },
      function: {
        type: Sequelize.STRING
      },
      industry: {
        type: Sequelize.STRING
      },
      companyName: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      mobileNumber: {
        type: Sequelize.STRING
      },
      address: {
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
    return queryInterface.dropTable('jobs');
  }
};