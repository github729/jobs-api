'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('education', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      resumeId: {
        type: Sequelize.INTEGER
      }, 
      instituteName: {
        type: Sequelize.STRING
      },
      qualification: {
        type: Sequelize.STRING
      },
      result: {
        type: Sequelize.STRING
      },
      startingDate: {
        type: Sequelize.STRING
      },
      endingDate: {
        type: Sequelize.STRING
      },
      description: {
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
    return queryInterface.dropTable('education');
  }
};