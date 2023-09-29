import express from 'express';
import path from 'path';
import cors from 'cors';
import volleyball from 'volleyball';
import apiRouter from './api/index.js'; // Assuming that your API routes are in an 'api.mjs' file

const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);

const app = express();

// static middleware
app.use(express.static(path.join(__dirname, '..', 'public')));

// body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes start here
app.use('/api', apiRouter);
app.use(cors());

// logging middleware
app.use(volleyball);

app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

export default app;