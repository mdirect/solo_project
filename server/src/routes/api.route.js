const express = require('express');
// const dictionaryRouter = require('./dictionary.route');
const authRouter = require('./auth.route');

const router = express.Router();

// router.use('/dictionary', dictionaryRouter);
router.use('/auth', authRouter);

module.exports = router;
