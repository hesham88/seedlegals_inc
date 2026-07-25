import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distPath = path.join(__dirname, 'dist');

const app = express();

// Serve the built static assets.
app.use(express.static(distPath));

// SPA fallback: let client-side routing handle any non-file request.
app.get('*', (_req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

// Cloud Run provides the port to listen on via $PORT (defaults to 8080).
const port = process.env.PORT || 8080;
app.listen(port, '0.0.0.0', () => {
  console.log(`Server listening on port ${port}`);
});
