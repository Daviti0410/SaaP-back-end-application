const { Model, DataTypes} = require('sequelize');

class Company extends Model {
  static init(connection){
    super.init({
     companyName:{
      type: DataTypes.STRING(50),
      allowNull: false,
     },
     industry:{
      type: DataTypes.STRING(50),
      allowNull: false,
     },
     email:{
      type: DataTypes.STRING(50),
      allowNull: false,
     },
     password:{
      type: DataTypes.STRING(50),
      allowNull: false,
     },
     country:{
      type: DataTypes.STRING,
      allowNull: false,
     },
     isAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
     },
     deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
     },
    companyid: {
      type:DataTypes.INTEGER,
      allowNull: false,
    },
    },
    {
      sequelize:connection,
      timestamps:true,
      tableName:'company'
    }
    )
  }
};
module.exports = Company;