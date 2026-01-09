const PlanService = require('../services/plan.service');
const { Plan } = require('../../db/models');

class PlanController {
  static async getAllPlans(req, res) {
    try {
      const { user } = res.locals;
      const plans = await PlanService.getPlans(user.id);

      return res.status(200).send(plans);
    } catch (error) {
      console.log(error);
      return res.status(500).send('Server Error');
    }
  }

  static async getPlanById(req, res) {
    try {
      const { id } = req.params;
      const plan = await PlanService.getPlanById(id);

      if (!plan) return res.status(200).send('Такого плана нет');

      return res.status(200).send(plan);
    } catch (error) {
      console.log(error);
      return res.status(500).send('Server Error');
    }
  }

  static async createPlan(req, res) {
    try {
      if (!req.body) return res.status(400).send('Заполни данные');

      const { user } = res.locals;
      const { name, description, status } = req.body;
      const { isValid, err } = Plan.validate({ name, description, status });

      if (!isValid) return res.status(400).send(err);
      const newPlan = await PlanService.createPlan({
        name,
        description,
        status,
        userId: user.id,
      });

      return res.status(201).send(newPlan);
    } catch (error) {
      console.log(error);
      return res.status(500).send('Server Error');
    }
  }

  static async updatePlan(req, res) {
    try {
      const { user } = res.locals;
      const { id } = req.params;
      const plan = await PlanService.getPlanById(id);

      if (!plan) return res.status(200).send('Такого плана нет');
      if (user.id !== plan.userId) return res.status(400).send('Это не ваш план');
      if (!req.body) return res.status(400).send('Заполни данные');
      const { name, description, status } = req.body;
      const { isValid, err } = Plan.validate({ name, description, status });

      if (!isValid) return res.status(400).send(err);
      const updatePlan = await PlanService.updatePlan(id, {
        name,
        description,
        status,
      });

      return res.status(200).json(updatePlan);
    } catch (error) {
      console.log(error);
      return res.status(500).send('Server Error');
    }
  }

  static async deletePlan(req, res) {
    try {
      const { user } = res.locals;
      const { id } = req.params;
      const plan = await PlanService.getPlanById(id);

      if (!plan) return res.status(200).send('Такого плана нет');
      if (user.id !== plan.userId) return res.status(400).send('Это не ваш план');
      const deletePlan = await PlanService.deletePlan(id);

      if (!deletePlan) return res.status(200).send('План не удален');

      return res.status(204).send('План удален');
    } catch (error) {
      console.log(error);
      return res.status(500).send('Server Error');
    }
  }
}

module.exports = PlanController;
