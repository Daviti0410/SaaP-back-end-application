const { Model, DataTypes} = require('sequelize');

class File extends Model {
    static init(connection){
      super.init({
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
       title:{
        type: DataTypes.STRING(50),
        allowNull: false,
       },
       Description:{
        type: DataTypes.TEXT,
        allowNull: false,
       },
       UserId:{
        type: DataTypes.INTEGER,
        allowNull: false,
       },
       fileType:{
        type: DataTypes.STRING(50),
        allowNull: false,
       },
       fileName:{
        type: DataTypes.STRING(50),
        allowNull: false,
       },
       imageData:{
        type: DataTypes.BLOB('long'),
        allowNull: false,
       },
       
      },
      {
        sequelize:connection,
        tableName:'file'
      }
      )
    }
  };
  module.exports = File;