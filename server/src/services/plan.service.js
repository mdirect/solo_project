const { Plan } = require('../../db/models');

class PlanService {
  static async getPlans(id) {
    return Plan.findAll({ where: { userId: id }, order: [['createdAt', 'DESC']] });
  }

  static async getPlanById(id) {
    return Plan.findByPk(id);
  }

  static async createPlan({ name, description, status, userId }) {
    return Plan.create({ name, description, status, userId });
  }

  static async updatePlan(id, { name, description, status }) {
    await Plan.update({ name, description, status }, { where: { id } });

    return Plan.findByPk(id);
  }

  static async deletePlan(id) {
    await Plan.destroy({ where: { id } });

    return true;
  }
}

module.exports = PlanService;
