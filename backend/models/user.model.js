const mongoose = require('mongoose');
const validator = require('validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, 'Please enter an email'],
    unique: true,
    validate: [validator.isEmail, 'Please enter a valid email'],
  },
  password: {
    type: String,
    required: [true, 'Please enter a password'],
  },
  name: {
    type: String,
    required: [true, 'Please enter your name'],
  },
  amount: {
    type: Number,
    default: 0.0,
  },
});

module.exports = mongoose.model('User', userSchema);
