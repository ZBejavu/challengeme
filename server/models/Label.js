'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Label extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.Challenge,{
        through: 'labels_to_challenges',
        foreignKey: 'label_id'
      });
    }
  };
  
  Label.init({
    name: DataTypes.STRING,
  }, {
    sequelize,
    paranoid: true,
    modelName: 'Label',
    tableName: 'labels'
  });
  return Label;
};