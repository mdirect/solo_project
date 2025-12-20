'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Dictionary extends Model {
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'userId' });
    }

    static validate({ word, description }) {
      if (!word || typeof word !== 'string' || word.trim().length === 0) {
        return {
          isValid: false,
          err: 'Название должно быть не пустой строкой',
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

  Dictionary.init(
    {
      word: DataTypes.STRING,
      description: DataTypes.TEXT,
      userId: DataTypes.INTEGER,
      tags: {
        type: DataTypes.ARRAY(DataTypes.TEXT),
        defaultValue: [],
        get() {
          const rawValue = this.getDataValue('tags');
          return rawValue || [];
        },
        set(value) {
          const uniqueTags = [...new Set(value)];
          this.setDataValue('tags', uniqueTags);
        },
      },
    },
    {
      sequelize,
      modelName: 'Dictionary',
    },
  );
  return Dictionary;
};
