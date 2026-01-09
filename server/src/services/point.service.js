const { Point } = require('../../db/models');

class PointService {
  static async getPoints(id) {
    return Point.findAll({ where: { userId: id }, order: [['createdAt', 'DESC']] });
  }

  static async getPointById(id) {
    return Point.findByPk(id);
  }

  static async createPoint({ name, description, status, userId }) {
    return Point.create({ name, description, status, userId });
  }

  static async updatePoint(id, { name, description, status }) {
    await Point.update({ name, description, status }, { where: { id } });

    return Point.findByPk(id);
  }

  static async deletePoint(id) {
    await Point.destroy({ where: { id } });

    return true;
  }
}

module.exports = PointService;
