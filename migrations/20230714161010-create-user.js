'use strict';

const { sequelize } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize)=> {
    await queryInterface.createTable("users", {
      id: {allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER},
      username: {type: Sequelize.STRING},
      password: {type: Sequelize.STRING},
      email: {type: Sequelize.STRING, allowNull: false,},
      createdAt: {allowNull: false,type: Sequelize.DATE},
      updatedAt: {type:Sequelize.DATE,allowNull: false}});
  },
  down : async (queryInterface, Sequelize)=> {await queryInterface.dropTable("users");}
};