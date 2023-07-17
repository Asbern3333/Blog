'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Comments)
      this.hasMany(models.Post)
      
    }
  }
  User.init({
    id:{type: DataTypes.INTEGER ,primaryKey:true,autoIncrement:true},
    password:{type:DataTypes.STRING,allowNull:false,},
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    createdAt: DataTypes.DATE,
  },
    {
      sequelize,
      modelName: 'User',
      tableName:"users",});
  return User;
};