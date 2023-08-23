const express = require('express');
const Authorization = require('../middlewares/Auth.middleware');
const {
  withdraw,
  deposit,
  getAmount,
  transfer,
  changePassword,
  getTransactions,
  getLog,
} = require('../controllers/Action.controller');

const router = express.Router();

router.use(Authorization);

router.post('/withdraw', withdraw);
router.post('/transfer', transfer);
router.post('/deposit', deposit);
router.get('/amount', getAmount);
router.get('/transaction', getTransactions);
router.post('/change', changePassword);
router.get('/Log', getLog);

module.exports = router;
