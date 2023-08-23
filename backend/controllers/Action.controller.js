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
      return res.status(404).json({ message: 'User not found' });
    }

    const isPasswordMatch = await bcrypt.compare(password, this.password);

    if (!isPasswordMatch) {
      return res.status(401).json({ message: 'Invalid old password' });
    }

    user.password = newPassword;
    await user.save();

    res.status(200).json({ message: 'Password changed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred' });
  }
};

module.exports = { withdraw, deposit, getAmount, transfer, changePassword };
