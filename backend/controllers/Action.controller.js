const User = require('../models/user.model');
const Transaction = require('../models/transaction.model');
const UserLog = require('../models/personalLog.model'); // Make sure to import UserLog model
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

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

    return res.json('Withdrawal successful').status(200);
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

    return res.json('Deposit successful').status(200);
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

    return res.json(user.amount).status(200);
  } catch (error) {
    return res.status(500).json('Server error');
  }
};

const transfer = async (req, res) => {
  const userId = req.userId;
  const { requestedAmount, password, requestedUserId } = req.body;

  try {
    if (requestedUserId == userId) {
      return res.status(400).json('You cant Transfer to Your Account');
    }
    if (!requestedUserId) {
      return res.status(400).json('Account Number is Required');
    }
    if (!mongoose.isValidObjectId(requestedUserId)) {
      return res.status(400).json('Invalid Account Number');
    }
    if (!requestedAmount) {
      return res.status(400).json('Amount is Required');
    }
    if (!password) {
      return res.status(400).json('Password is Required');
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json('User not found');
    }

    const requestedUser = await User.findById(requestedUserId);
    if (!requestedUser) {
      return res.status(404).json('Requested User not found');
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

    return res.status(200).json('Transfer successful');
  } catch (error) {
    console.error(error);
    return res.status(500).json('Server error');
  }
};
const changePassword = async (req, res) => {
  const userId = req.userId;
  const { oldPassword, newPassword } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json('User not found');
    }
    const isPasswordMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json('Invalid old password');
    }
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedNewPassword;
    await user.save();
    res.status(200).json('Password changed successfully');
  } catch (error) {
    res.status(500).json('An error occurred');
  }
};

const getTransactions = async (req, res) => {
  const userId = req.userId;

  try {
    const transactionsFromUser = await Transaction.find({ from: userId });
    const transactionsToUser = await Transaction.find({ to: userId });

    res.status(200).json({
      transactionsFromUser,
      transactionsToUser,
    });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching transactions.' });
  }
};

const getLog = async (req, res) => {
  const userId = req.userId;

  try {
    const depositLogs = await UserLog.find({ userId, action: 'deposit' });
    const withdrawalLogs = await UserLog.find({ userId, action: 'withdrawal' });

    res.json({ depositLogs, withdrawalLogs });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching log.' });
  }
};

const pay = async (req, res) => {
  const userId = req.userId;
  const { requestedAmount, requestedUserId } = req.body;

  try {
    if (requestedUserId == userId) {
      return res.status(400).json('You cant Transfer to Your Account');
    }
    if (!requestedUserId) {
      return res.status(400).json('Account Number is Required');
    }
    if (!mongoose.isValidObjectId(requestedUserId)) {
      return res.status(400).json('Invalid Account Number');
    }
    if (!requestedAmount) {
      return res.status(400).json('Amount is Required');
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json('User not found');
    }

    const requestedUser = await User.findById(requestedUserId);
    if (!requestedUser) {
      return res.status(404).json('Requested User not found');
    }

    if (requestedAmount < 0) {
      return res.status(400).json('Invalid amount');
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

    return res.status(200).json('Transfer successful');
  } catch (error) {
    console.error(error);
    return res.status(500).json('Server error');
  }
};
module.exports = {
  withdraw,
  getTransactions,
  getLog,
  deposit,
  getAmount,
  transfer,
  changePassword,
  pay,
};
