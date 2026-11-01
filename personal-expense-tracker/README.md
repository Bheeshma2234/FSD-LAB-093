# PennyTrack — Personal Expense Tracker + Pennywise Financial Agent

This version extends the original project while keeping the existing transaction model, collection name, and CRUD API compatible with your current MongoDB data. The original database is **not deleted or reset**. The agent reads existing transaction documents and does not require a migration.

## Features
- Existing dashboard, monthly selector, transaction CRUD, filters and reports
- MongoDB persistence using the existing `personal_expense_tracker` database by default
- New Pennywise AI Agent page with quick prompts, conversational questions, monthly review, category-spend analysis and month-on-month comparison
- Built-in rule-based agent works without an API key
- Optional Gemini-generated answers when a Gemini API key is configured (key stays on backend)
- Postman collection for API demonstration

## Requirements
- Node.js + npm
- MongoDB Community Server running locally, or MongoDB Atlas URI
- VS Code, MongoDB Compass, and Postman for the college demonstration

## Setup
1. Open this project folder in VS Code.
2. In `server`, create `.env` by copying `.env.example`.
3. Start MongoDB locally, then use this configuration for local development:

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/personal_expense_tracker
GEMINI_API_KEY=
GEMINI_MODEL=gemini-2.0-flash
```

If your existing project already uses a different MongoDB URI, keep that same URI so your existing data stays visible. Do not change the database name unless you intend to use a separate database. Set `GEMINI_API_KEY` only in `server/.env`; never put it in the frontend.

4. Backend terminal:

```powershell
cd server
npm install
npm run dev
```

Expected: `Connected to MongoDB.` and `API running at http://localhost:5000`.

5. Open a second terminal for frontend:

```powershell
cd client
npm install
npm run dev
```

Open the Vite URL shown in terminal (usually `http://localhost:5173`). Keep both terminals running.

## MongoDB Compass demo
1. Connect to `mongodb://127.0.0.1:27017` (or your Atlas cluster URI).
2. Open `personal_expense_tracker`.
3. Open the `transactions` collection and show documents after adding an expense on the website or through Postman.
4. Refresh Compass after creating records. MongoDB creates a collection when the first document is inserted.

Existing records remain in the same collection as long as `MONGODB_URI` points to the same database. The original schema is unchanged.

## Postman demo
Import `postman/PennyTrack_API.postman_collection.json`. Run requests in this order:
1. Health Check
2. Create Expense
3. List Transactions
4. Monthly Summary
5. AI Agent — Monthly Insights
6. AI Agent — Chat
7. Update/Delete transaction (Create Expense saves its ID into a collection variable)

Adjust the month in the requests to match dates for your demo.

## API endpoints
| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/health` | API + database health |
| GET | `/api/transactions?month=YYYY-MM` | List transactions (optional month filter) |
| POST | `/api/transactions` | Create a transaction |
| PUT | `/api/transactions/:id` | Update a transaction |
| DELETE | `/api/transactions/:id` | Delete a transaction |
| GET | `/api/summary?month=YYYY-MM` | Monthly totals and category totals |
| GET | `/api/agent/insights?month=YYYY-MM` | Data-based monthly review |
| POST | `/api/agent/chat` | Ask Pennywise a question; JSON body: `{"month":"2026-10","message":"How can I save money?"}` |

## Agent behaviour
Without `GEMINI_API_KEY`, the built-in agent provides data-based answers, including monthly income/expenses/balance, largest expense categories, previous-month comparisons and budgeting suggestions. With a valid Gemini key, it uses Gemini to phrase a more conversational answer grounded in the same transaction summary. If Gemini is unavailable, it automatically falls back to built-in answers.

The current original app has no user authentication, and all transactions are in one shared collection. Do not expose this demo server publicly or use it for multiple real users without adding authentication and user-scoped queries. Financial suggestions are educational, not professional financial advice.
