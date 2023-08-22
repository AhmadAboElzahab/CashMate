const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserLogSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    action: {
      type: String,
      required: true,
    },
    oldAmount: {
      type: Number,
      required: true,
    },
    newAmount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('UserLog', UserLogSchema);
