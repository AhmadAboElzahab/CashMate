const express = require('express');
const Authorization = require('../middlewares/Auth.middleware');
const { withdraw, deposit, getAmount } = require('../controllers/Action.controller');

const router = express.Router();

router.use(Authorization);

router.post('/withdraw', withdraw);
router.post('/deposit', deposit);
router.get('/amount', getAmount);

module.exports = router;
