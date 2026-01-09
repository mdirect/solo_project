const PointService = require('../services/point.service');
const { Point } = require('../../db/models');

class PointController {
  static async getAllPoints(req, res) {
    try {
      const { user } = res.locals;
      const points = await PointService.getPoints(user.id);

      return res.status(200).send(points);
    } catch (error) {
      console.log(error);
      return res.status(500).send('Server Error');
    }
  }

  static async getPointById(req, res) {
    try {
      const { id } = req.params;
      const point = await PointService.getPointById(id);

      if (!point) return res.status(200).send('Такого плана нет');

      return res.status(200).send(point);
    } catch (error) {
      console.log(error);
      return res.status(500).send('Server Error');
    }
  }

  static async createPoint(req, res) {
    try {
      if (!req.body) return res.status(400).send('Заполни данные');

      const { user } = res.locals;
      const { name, description, status } = req.body;
      const { isValid, err } = Point.validate({ name, description, status });

      if (!isValid) return res.status(400).send(err);
      const newPoint = await PointService.createPoint({
        name,
        description,
        status,
        userId: user.id,
      });

      return res.status(201).send(newPoint);
    } catch (error) {
      console.log(error);
      return res.status(500).send('Server Error');
    }
  }

  static async updatePoint(req, res) {
    try {
      const { user } = res.locals;
      const { id } = req.params;
      const point = await PointService.getPointById(id);

      if (!point) return res.status(200).send('Такого плана нет');
      if (user.id !== point.userId) return res.status(400).send('Это не ваш план');
      if (!req.body) return res.status(400).send('Заполни данные');
      const { name, description, status } = req.body;
      const { isValid, err } = Point.validate({ name, description, status });

      if (!isValid) return res.status(400).send(err);
      const updatePoint = await PointService.updatePoint(id, {
        name,
        description,
        status,
      });

      return res.status(200).json(updatePoint);
    } catch (error) {
      console.log(error);
      return res.status(500).send('Server Error');
    }
  }

  static async deletePoint(req, res) {
    try {
      const { user } = res.locals;
      const { id } = req.params;
      const point = await PointService.getPointById(id);

      if (!point) return res.status(200).send('Такого плана нет');
      if (user.id !== point.userId) return res.status(400).send('Это не ваш план');
      const deletePoint = await PointService.deletePoint(id);

      if (!deletePoint) return res.status(200).send('План не удален');

      return res.status(204).send('План удален');
    } catch (error) {
      console.log(error);
      return res.status(500).send('Server Error');
    }
  }
}

module.exports = PointController;
