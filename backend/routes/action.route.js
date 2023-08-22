const express = require('express');
const Authorization = require('../middlewares/Auth.middleware');
const { withdraw, deposit, getAmount, transfer } = require('../controllers/Action.controller');

const router = express.Router();

router.use(Authorization);

router.post('/withdraw', withdraw);
router.post('/transfer', transfer);
router.post('/deposit', deposit);
router.get('/amount', getAmount);

module.exports = router;
