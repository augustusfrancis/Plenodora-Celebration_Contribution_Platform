// Import the Express app we built in app.js.
import app from './app.js';

// Import our settings, mainly the port number from .env (defaults to 5000).
import { env } from './config/env.js';

// Start the server. "listen" opens the port and waits for incoming requests.
// The function inside runs once, when the server is ready, and prints a message
// so we know it started.
app.listen(env.port, () => {
  console.log(`Server running on http://localhost:${env.port}`);
});