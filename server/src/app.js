// Express is the web framework: it lets us define URLs (routes) and handle requests.
import express from 'express';

// CORS = Cross-Origin Resource Sharing.
// Browsers block a website (our React app on port 5173) from calling an API on a
// different address (port 5000) unless the API says it's allowed. This package does that.
import cors from 'cors';

// Helmet adds security-related HTTP headers to every response, protecting against
// common web attacks with one line of code.
import helmet from 'helmet';

// Our own files: the settings loaded from .env, and the database query helper.
import { env } from './config/env.js';
import { query } from './config/db.js';

// Create the Express application. Everything below is added to this "app" object.
const app = express();

// MIDDLEWARE
// Middleware runs on every request, in order, before it reaches a route.

// Add the security headers to every response.
app.use(helmet());

// Only allow requests that come from our React app's address (CLIENT_URL in .env).
// Requests from any other website are blocked by the browser.
app.use(cors({ origin: env.clientUrl }));

// Lets Express read JSON sent in a request body (for example, a signup form)
// and put it into req.body. Without this, req.body would be undefined.
app.use(express.json());

// ROUTES

// A health-check route: GET /api/health
// It is used to confirm the server is running and the database is reachable.
// "async" is needed because talking to the database takes time, and we "await" the result.
app.get('/api/health', async (req, res) => {
  // Run the simplest possible SQL query. If the database is down or the
  // connection details are wrong, this line throws an error.
  await query('SELECT 1');

  // Send a JSON response back to whoever called the URL.
  res.json({ status: 'ok' });
});

// Export the app so server.js can start it. We don't start it here, which keeps
// the app easy to test without opening a real port.
export default app;