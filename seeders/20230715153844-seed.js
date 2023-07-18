'use strict';
const bcrypt = require(bcryptjs)
const comments = require('../models/comments');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.bulkInsert( "users",
    [{
     username : "asber",
     email: "asbeR@.noma",
     createdAt:new Date,
     updatedAt:new Date,
     password: await bcrypt.hash("password", 10)
    }
    ],
    {},);
const users=await queryInterface.sequelize.query(`SELECT id FROM users`);
const userId=users[0][0].id;
await queryInterface.bulkInsert(
  "posts",
  [
  {title: "hihi",
  content: "sadw",
  createdAt:new Date,
  UserId:userId,
  },

  ],
);
const posts=await queryInterface.sequelize.query('SELECT id FROM posts');
const postid=posts[0][0].id;
await queryInterface.bulkInsert(
  "comments",
  [
    {  UserId:userId,
       PostId:postid,
       title:"asdas",
       content: "String",
       createdAt: new Date,
    }
  ]
);

},
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable("users");
    //await queryInterface.dropTable("posts");
    await queryInterface.dropTable("comments");
  },
};
