'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User);
      this.belongsTo(models.Post);
    }
  }
  Comments.init({
    id:{type: DataTypes.INTEGER ,primaryKey:true,autoIncrement:true},
    User_id:{
      type: DataTypes.INTEGER,
     references:{ model:"users",
      key:"id",},
      onUpdate : "CASCADE",
      onDelete: "SET NULL", 
    },
    post_id:{
      type: DataTypes.INTEGER,
      references:{ model:"posts",
       key:"id",},
       onUpdate : "CASCADE",
       onDelete: "SET NULL", 
    },
    content: DataTypes.STRING,
    created_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Comments',
    tableName:"comments",
  });
  return Comments;
};