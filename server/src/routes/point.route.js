const express = require('express');
const PointController = require('../controllers/point.controller');
const { verifyAccessToken } = require('../middlewares/verifyTokens');
const isValidId = require('../middlewares/isValidId');

const router = express.Router();

router.get('/', verifyAccessToken, PointController.getAllPoints);
router.post('/', verifyAccessToken, PointController.createPoint);
router.get('/:id', isValidId, PointController.getPointById);
router.put('/:id', isValidId, verifyAccessToken, PointController.updatePoint);
router.delete('/:id', isValidId, verifyAccessToken, PointController.deletePoint);

module.exports = router;
