import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ['income', 'expense'],
      required: true
    },
    amount: {
      type: Number,
      required: true,
      min: [0.01, 'Amount must be greater than zero']
    },
    category: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      trim: true,
      default: ''
    },
    date: {
      type: Date,
      required: true
    }
  },
  { timestamps: true }
);

export default mongoose.model('Transaction', transactionSchema);
