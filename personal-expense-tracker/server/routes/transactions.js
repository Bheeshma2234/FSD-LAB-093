import express from 'express';
import mongoose from 'mongoose';
import Transaction from '../models/Transaction.js';

const router = express.Router();

function getMonthRange(month) {
  if (!/^\d{4}-\d{2}$/.test(month || '')) return null;
  const [year, monthNumber] = month.split('-').map(Number);
  if (monthNumber < 1 || monthNumber > 12) return null;
  return {
    start: new Date(Date.UTC(year, monthNumber - 1, 1)),
    end: new Date(Date.UTC(year, monthNumber, 1))
  };
}

function transactionPayload(body) {
  const { type, amount, category, description = '', date } = body;
  if (!['income', 'expense'].includes(type)) {
    return { error: 'Type must be income or expense.' };
  }
  const numericAmount = Number(amount);
  if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
    return { error: 'Enter an amount greater than zero.' };
  }
  if (!String(category || '').trim()) {
    return { error: 'Category is required.' };
  }
  if (!date || Number.isNaN(new Date(`${date}T00:00:00.000Z`).getTime())) {
    return { error: 'A valid transaction date is required.' };
  }
  return {
    value: {
      type,
      amount: numericAmount,
      category: String(category).trim(),
      description: String(description).trim(),
      date: new Date(`${date}T00:00:00.000Z`)
    }
  };
}

// GET /api/transactions?month=YYYY-MM
router.get('/', async (req, res, next) => {
  try {
    const query = {};
    if (req.query.month) {
      const range = getMonthRange(String(req.query.month));
      if (!range) return res.status(400).json({ message: 'Month must use YYYY-MM format.' });
      query.date = { $gte: range.start, $lt: range.end };
    }
    const transactions = await Transaction.find(query).sort({ date: -1, createdAt: -1 });
    res.json(transactions);
  } catch (error) {
    next(error);
  }
});

// POST /api/transactions
router.post('/', async (req, res, next) => {
  try {
    const parsed = transactionPayload(req.body);
    if (parsed.error) return res.status(400).json({ message: parsed.error });
    const transaction = await Transaction.create(parsed.value);
    res.status(201).json(transaction);
  } catch (error) {
    next(error);
  }
});

// PUT /api/transactions/:id
router.put('/:id', async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: 'Invalid transaction ID.' });
    }
    const parsed = transactionPayload(req.body);
    if (parsed.error) return res.status(400).json({ message: parsed.error });
    const transaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      parsed.value,
      { new: true, runValidators: true }
    );
    if (!transaction) return res.status(404).json({ message: 'Transaction not found.' });
    res.json(transaction);
  } catch (error) {
    next(error);
  }
});

// DELETE /api/transactions/:id
router.delete('/:id', async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: 'Invalid transaction ID.' });
    }
    const transaction = await Transaction.findByIdAndDelete(req.params.id);
    if (!transaction) return res.status(404).json({ message: 'Transaction not found.' });
    res.json({ message: 'Transaction deleted successfully.' });
  } catch (error) {
    next(error);
  }
});

export default router;
