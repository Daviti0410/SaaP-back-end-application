const { Model, DataTypes} = require('sequelize');

class Company extends Model {
  static init(connection){
    super.init({
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
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
     subscriptionId: {
      type:DataTypes.INTEGER,
      allowNull: false,
    },
    subscriptionDate: {
      type:DataTypes.timestamps,
      allowNull: false,
    },
    fileAmount: {
      type:DataTypes.INTEGER,
      allowNull: false,
    },
    userAmount: {
      type:DataTypes.INTEGER,
      allowNull: false,
    },
    billing: {
      type:DataTypes.FLOAT,
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