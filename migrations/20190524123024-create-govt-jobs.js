'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('govtjobs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      organisation: {
        type: Sequelize.STRING
      },
      postName: {
        type: Sequelize.STRING
      },
      qualification: {
        type: Sequelize.STRING
      },
      deadline: {
        type: Sequelize.STRING
      },
      state: {
        type: Sequelize.STRING
      },
      industry: {
        type: Sequelize.STRING
      },
      notificationFile: {
        type: Sequelize.STRING
      },
      totalVacancies: {
        type: Sequelize.STRING
      },
      postedDate: {
        type: Sequelize.STRING
      },
      officialSite: {
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
    return queryInterface.dropTable('govtjobs');
  }
};