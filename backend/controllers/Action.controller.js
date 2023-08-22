const User = require('../models/user.model');
const UserLog = require('../models/userlog.model'); // Make sure to import UserLog model
const bcrypt = require('bcrypt');

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
      return res.status(400).json("You can't withdraw more than your balance");
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
  const { depositedAmount, password } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json('User not found');
    }

    if (depositedAmount < 0) {
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
      newAmount: user.amount + depositedAmount,
    });

    user.amount += depositedAmount;
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

module.exports = { withdraw, deposit };
