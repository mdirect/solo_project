'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Plan extends Model {
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'userId' });
    }

    static validate({ title, description }) {
      if (!title || typeof title !== 'string' || title.trim().length === 0) {
        return {
          isValid: false,
          err: 'Наименование должно быть не пустой строкой',
        };
      }
      if (
        !description ||
        typeof description !== 'string' ||
        description.trim().length === 0
      ) {
        return {
          isValid: false,
          err: 'Описание должно быть не пустой строкой',
        };
      }
      return {
        isValid: true,
        err: null,
      };
    }
  }

  Plan.init(
    {
      title: DataTypes.STRING,
      image: DataTypes.STRING,
      description: DataTypes.TEXT,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Plan',
    },
  );
  return Plan;
};
