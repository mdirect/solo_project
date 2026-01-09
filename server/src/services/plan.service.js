const { Plan } = require('../../db/models');

class PlanService {
  static async getPlans(id) {
    return Plan.findAll({ where: { userId: id }, order: [['createdAt', 'DESC']] });
  }

  static async getPlanById(id) {
    return Plan.findByPk(id);
  }

  static async createPlan({ title, description, image, userId }) {
    return Plan.create({ title, description, image, userId });
  }

  static async updatePlan(id, { title, description, image }) {
    await Plan.update({ title, description, image }, { where: { id } });

    return Plan.findByPk(id);
  }

  static async deletePlan(id) {
    await Plan.destroy({ where: { id } });

    return true;
  }
}

module.exports = PlanService;
