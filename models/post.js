'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Comments);

    }
  }
  Post.init({
    id:{type: DataTypes.INTEGER ,primaryKey:true,autoIncrement:true},
    User_id:{
      type: DataTypes.INTEGER,
     references:{ model:"users",
      key:"id",},
      onUpdate : "CASCADE",
      onDelete: "SET NULL", 
    },
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    createdAt: DataTypes.DATE,
}, {
    sequelize,
    modelName: 'Post',
    tableName:"posts",
  });
  return Post;
};