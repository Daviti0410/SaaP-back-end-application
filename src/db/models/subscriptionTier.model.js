const { Model, DataTypes} = require('sequelize');

class SubscrptionTier extends Model {
  static init(connection){
    super.init({
     tiername :{
      type: DataTypes.STRING(50),
      allowNull: false,
     },
     numberofusers:{
      type: DataTypes.INTEGER,
      allowNull: false,
     },
     numberofiles:{
      type: DataTypes.INTEGER,
      allowNull: false,
     },
     price:{
      type: DataTypes.FLOAT,
      allowNull: false,
     },
    },
    {
      sequelize:connection,
      timestamps: true,
      tableName:'subscribtiontier'
    }
    )
  }
};
module.exports = SubscrptionTier;