const express = require('express');
const path = require('path');
const cors = require("cors");
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes Setup
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/worker', require('./routes/workerRoutes'));
app.use('/api/policy', require('./routes/policyRoutes'));
app.use('/api/claims', require('./routes/claimRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/triggers', require('./routes/triggerRoutes'));
app.use('/api/contact', require('./routes/contactRoutes'));

// Serve Static Frontend (Production Only)
const distPath = path.join(__dirname, '../dist');
app.use(express.static(distPath));

// API 404 handler (must come after API routes, before catch-all)
app.use('/api/*', (req, res) => {
  res.status(404).json({ error: "API Route not found" });
});

// SPA Catch-all (must come last)
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

// Connect MongoDB & Start engine
mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/gigshield_v2', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
  // Initialize cron job here
  require('./services/triggerEngine');
}).catch(err => console.error("Could not connect to MongoDB:", err));

const PORT = process.env.PORT || 4001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
