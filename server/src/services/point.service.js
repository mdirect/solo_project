const { Point } = require('../../db/models');

class PointService {
  static async getPoints(id) {
    return Point.findAll({ where: { planId: id }, order: [['createdAt', 'DESC']] });
  }

  static async getPointById(id) {
    return Point.findByPk(id);
  }

  static async createPoint({ name, description, image, status, x, y, layer, planId }) {
    return Point.create({ name, description, image, status, x, y, layer, planId });
  }

  static async updatePoint(id, { name, description, image, status, x, y, layer }) {
    await Point.update(
      { name, description, image, status, x, y, layer },
      { where: { id } },
    );

    return Point.findByPk(id);
  }

  static async deletePoint(id) {
    await Point.destroy({ where: { id } });

    return true;
  }
}

module.exports = PointService;
