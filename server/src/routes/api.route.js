const express = require('express');
const authRouter = require('./auth.route');
const userRouter = require('./user.route');
const planRouter = require('./plan.route');

const router = express.Router();

router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/plans', planRouter);

module.exports = router;
