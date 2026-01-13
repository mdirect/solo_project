'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Point extends Model {
    static associate(models) {
      this.belongsTo(models.Plan, { foreignKey: 'planId' });
    }

    static validate({ name, description }) {
      if (!name || typeof name !== 'string' || name.trim().length === 0) {
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

  Point.init(
    {
      name: DataTypes.STRING,
      image: DataTypes.STRING,
      description: DataTypes.TEXT,
      status: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      x: DataTypes.INTEGER,
      y: DataTypes.INTEGER,
      layer: DataTypes.INTEGER,
      planId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Point',
    },
  );
  return Point;
};
