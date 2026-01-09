const express = require('express');
const PlanController = require('../controllers/plan.controller');
const { verifyAccessToken } = require('../middlewares/verifyTokens');
const isValidId = require('../middlewares/isValidId');

const router = express.Router();

router.get('/', verifyAccessToken, PlanController.getAllPlans);
router.post('/', verifyAccessToken, PlanController.createPlan);
router.get('/:id', isValidId, PlanController.getPlanById);
router.put('/:id', isValidId, verifyAccessToken, PlanController.updatePlan);
router.delete('/:id', isValidId, verifyAccessToken, PlanController.deletePlan);

module.exports = router;
