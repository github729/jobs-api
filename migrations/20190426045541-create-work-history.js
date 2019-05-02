'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('workhistories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      resumeId: {
        type: Sequelize.INTEGER
      }, 
      companyName: {
        type: Sequelize.STRING
      },
      designation: {
        type: Sequelize.STRING
      },
      joiningDate: {
        type: Sequelize.STRING
      },
      relievingDate: {
        type: Sequelize.STRING
      },
      jobDescription: {
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
    return queryInterface.dropTable('workhistories');
  }
};
