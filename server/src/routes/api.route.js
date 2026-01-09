const express = require('express');
const authRouter = require('./auth.route');
const userRouter = require('./user.route');
const planRouter = require('./plan.route');
const pointsRouter = require('./point.route');

const router = express.Router();

router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/plans', planRouter);
router.use('/points', pointsRouter);

module.exports = router;
