'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize)=> {
    await queryInterface.createTable('posts', {
      id: {allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER},
      UserId:{
        type: Sequelize.INTEGER,
       references:{ model:"users",
        key:"id",},
        onUpdate : "CASCADE",
        onDelete: "SET NULL", 
      },
      title: {
        type: Sequelize.STRING
      },
      content: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },updatedAt: Sequelize.DATE,
      
    })
  },
  down: async (queryInterface, Sequelize)=> {
    await queryInterface.dropTable('posts');
  }
};