# CineWorld Full Stack Case Study

## Stack
Existing HTML/CSS/Bootstrap frontend + JavaScript, Node.js, Express, MongoDB/Mongoose, bcrypt password hashing, JWT in HttpOnly cookie, Razorpay test checkout.

## Run locally
1. Install Node.js LTS and run MongoDB locally, or create a MongoDB Atlas database.
2. In this folder run `npm install`.
3. Copy `.env.example` to `.env`. Set `MONGODB_URI` and a long random `JWT_SECRET`. Add Razorpay test keys to test payments.
4. Run `npm run seed` to create the current movies and showtimes for the next 14 days.
5. Run `npm run dev`.
6. Open `http://localhost:5000` (do not open HTML directly from the file system).

## Images
Copy your original image files into `public/`: movie1.jpg to movie4.jpg and upcoming1.jpg to upcoming8.jpg. They were not included in the uploaded HTML/CSS files.

## Pages
- `/` home page
- `/booking.html` booking
- `/register.html` and `/login.html` authentication
- `/account.html` booking history
- `/resale.html` ticket resale

## API summary
- Auth: POST `/api/auth/register`, POST `/api/auth/login`, GET `/api/auth/me`, POST `/api/auth/logout`
- Movies/shows: GET `/api/movies`, GET `/api/movies/shows`, GET `/api/movies/shows/:id/seats`
- Booking: POST `/api/bookings`, GET `/api/bookings/mine`, GET `/api/bookings/:id`, POST `/api/bookings/:id/cancel`
- Payment: POST `/api/payments/create-order`, POST `/api/payments/verify`
- Resale: GET `/api/resale`, POST `/api/resale`, GET `/api/resale/mine`, POST `/api/resale/:id/buy`, POST `/api/resale/:id/withdraw`

## Syllabus coverage
- Node/npm, modules, request-response cycle
- Async filesystem logging and EventEmitter custom event in `server.js`
- Express routing, middleware, static files, CRUD routes
- MongoDB/Mongoose schemas and CRUD operations
- Browser frontend fetches the backend API

## Important
This is an educational starter, not production-ready. Razorpay must use test keys for a demo. Resale purchase creates a buyer-side booking and removes the listed seat from the seller-side booking, but it does not collect resale payment. Production needs a dedicated resale payment flow and transaction-based ownership transfer. Add automatic expiry of abandoned pending seat holds before production.

