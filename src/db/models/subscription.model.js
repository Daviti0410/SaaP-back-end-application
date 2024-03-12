const { Model, DataTypes} = require('sequelize');

class subsrciption extends Model {
  static init(connection){
    super.init({
     remeaningusers:{
      type: DataTypes.INTEGER,
      allowNull: false,
     },
     remeaningfiles:{
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
module.exports = subsrciption;