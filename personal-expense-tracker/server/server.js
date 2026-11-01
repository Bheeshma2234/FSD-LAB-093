import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import transactionsRouter from './routes/transactions.js';
import summaryRouter from './routes/summary.js';
import agentRouter from './routes/agent.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (_req, res) => {
  res.json({ message: 'Personal Expense Tracker API is running.' });
});
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected' });
});
app.use('/api/transactions', transactionsRouter);
app.use('/api/summary', summaryRouter);
app.use('/api/agent', agentRouter);

app.use((req, res) => {
  res.status(404).json({ message: `Route not found: ${req.method} ${req.originalUrl}` });
});
app.use((error, _req, res, _next) => {
  console.error(error);
  if (error.name === 'ValidationError' || error.name === 'CastError') {
    return res.status(400).json({ message: error.message });
  }
  res.status(500).json({ message: 'Server error. Check the backend terminal.' });
});

try {
  await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/personal_expense_tracker');
  console.log('Connected to MongoDB.');
  app.listen(PORT, () => console.log(`API running at http://localhost:${PORT}`));
} catch (error) {
  console.error('MongoDB connection failed. Start MongoDB and check server/.env.');
  console.error(error.message);
  process.exit(1);
}
