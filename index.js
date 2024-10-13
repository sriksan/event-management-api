const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const eventRoutes = require('./routes/eventRoutes');
const googleCalendarRoutes = require('./routes/googleCalendarRoutes'); // Import Google Calendar routes

dotenv.config();
const app = express();

// Middleware
app.use(express.json()); // For parsing application/json

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error(`Error: ${err.message}`));

// Root Route
app.get('/', (req, res) => {
  res.send('Welcome to the Event Management API');
});

// Routes
app.use('/api/events', eventRoutes);            // Existing routes for event operations
app.use('/api/google', googleCalendarRoutes);   // New routes for Google Calendar operations

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
