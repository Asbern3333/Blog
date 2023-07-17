'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize)=> {
    await queryInterface.createTable('comments', {
      id: {allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER},
      User_id:{
        type: Sequelize.INTEGER,
       references:{ model:"users",
        key:"id",},
        onUpdate : "CASCADE",
        onDelete: "SET NULL", 
      },
      post_id:{
        type: Sequelize.INTEGER,
        references:{ model:"posts",
         key:"id",},
         onUpdate : "CASCADE",
         onDelete: "SET NULL", 
      },
      content: {
        type: Sequelize.STRING
      },
      created_at: {
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize)=> {
    await queryInterface.dropTable('comments');
  }
};