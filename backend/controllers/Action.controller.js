const User = require('../models/user.model');
const Transaction = require('../models/transaction.model');
const UserLog = require('../models/personalLog.model'); // Make sure to import UserLog model
const bcrypt = require('bcryptjs');

const withdraw = async (req, res) => {
  const userId = req.userId;
  const { requestedAmount, password } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json('User not found');
    }

    if (requestedAmount < 0) {
      return res.status(400).json('Invalid amount');
    }

    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) {
      return res.status(401).json('Invalid password');
    }

    if (requestedAmount > user.amount) {
      return res.status(400).json('You can not withdraw more than your balance');
    }

    const userLog = new UserLog({
      userId,
      action: 'withdrawal',
      oldAmount: user.amount,
      newAmount: user.amount - requestedAmount,
    });

    user.amount -= requestedAmount;
    await user.save();

    await userLog.save();

    return res.json('Withdrawal successful');
  } catch (error) {
    return res.status(500).json('Server error');
  }
};

const deposit = async (req, res) => {
  const userId = req.userId;
  const { requestedAmount, password } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json('User not found');
    }

    if (requestedAmount < 0) {
      return res.status(400).json('Invalid amount');
    }

    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) {
      return res.status(401).json('Invalid password');
    }

    const userLog = new UserLog({
      userId,
      action: 'deposit',
      oldAmount: user.amount,
      newAmount: user.amount + requestedAmount,
    });

    user.amount += requestedAmount;
    await user.save();

    await userLog.save();

    return res.json('Deposit successful');
  } catch (error) {
    return res.status(500).json('Server error');
  }
};

const getAmount = async (req, res) => {
  const userId = req.userId;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json('User not found');
    }

    return res.json(user.amount);
  } catch (error) {
    return res.status(500).json('Server error');
  }
};

const transfer = async (req, res) => {
  const userId = req.userId;
  const { requestedAmount, password, requestedUserId } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json('User not found');
    }
    const requestedUser = await User.findById(requestedUserId);
    if (!requestedUser) {
      return res.status(404).json('User to send not found');
    }

    if (requestedAmount < 0) {
      return res.status(400).json('Invalid amount');
    }

    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) {
      return res.status(401).json('Invalid password');
    }

    if (requestedAmount > user.amount) {
      return res.status(400).json('You can not send more than your balance');
    }

    requestedUser.amount += requestedAmount;
    user.amount -= requestedAmount;

    const newTransaction = new Transaction({
      from: userId,
      to: requestedUserId,
      amount: requestedAmount,
    });

    await user.save();
    await requestedUser.save();
    await newTransaction.save();

    return res.json('Withdrawal successful');
  } catch (error) {
    return res.status(500).json('Server error');
  }
};

module.exports = { withdraw, deposit, getAmount, transfer };
