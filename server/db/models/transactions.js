const { Schema, model } = require('mongoose');

const transactionsSchema = new Schema(
  {
    txHash: {
      type: String,
      required: true,
      index: true,
    },
    blockNumber: {
      type: String,
      required: true,
      index: true,
    },
    from: {
      type: String,
      required: true,
      index: true,
    },
    to: {
      type: String,
      required: true,
      index: true,
    },
    fee: {
      type: Number,
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
    confirmations: {
      type: Number,
      required: true,
    },
    time: {
      type: Date,
      required: true,
    },
  },
  { timestamps: false, versionKey: false }
);

const Transactions = model('Transactions', transactionsSchema);
module.exports = Transactions;
