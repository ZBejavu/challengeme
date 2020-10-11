"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Challenge extends Model {
    static associate(models) {
      this.hasMany(models.Submission, {
        foreignKey: "challenge_id",
      });
      this.hasMany(models.Review, {
        foreignKey: 'challengeId'
      });
      this.belongsToMany(models.Label,{
        through: 'labels_to_challenges',
        foreignKey: 'challenge_id'
      });
    }
  }
  Challenge.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      type: DataTypes.STRING,
      repositoryName: DataTypes.STRING,
      cover: DataTypes.STRING,
    },
    {
      sequelize,
      paranoid: true,
      modelName: "Challenge",
      tableName: "challenges",
    }
  );
  return Challenge;
};
