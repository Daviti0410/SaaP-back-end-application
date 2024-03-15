const { Model, DataTypes} = require('sequelize');

class Subsrciption extends Model {
  static init(connection){
    super.init({
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
     maxUsers:{
      type: DataTypes.INTEGER,
      allowNull: false,
     },
     maxFiles:{
      type: DataTypes.INTEGER,
      allowNull: false,
     },
     subscribtiontierid:{
      type: DataTypes.INTEGER,
      allowNull: false,
     },
     
    },
    {
      sequelize:connection,
      tableName:'subscribtion'
    }
    )
  }
};
module.exports = Subsrciption;