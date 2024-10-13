const express = require('express');
const { getAuthUrl, getAccessToken, createEvent } = require('../controllers/googleCalendarController');
const router = express.Router();

// Redirect user to Google for authentication
router.get('/auth/google', (req, res) => {
  const url = getAuthUrl();
  res.redirect(url);
});

// Callback route to get the access token
router.get('/auth/google/callback', async (req, res) => {
  const code = req.query.code;
  const tokens = await getAccessToken(code);
  // Store the tokens in your session or database
  // e.g., req.session.tokens = tokens;
  res.send('Authentication successful! You can close this tab.');
});

// Create an event route
router.post('/create-event', async (req, res) => {
  const event = {
    summary: req.body.summary,
    location: req.body.location,
    description: req.body.description,
    start: {
      dateTime: req.body.startDateTime,
      timeZone: 'America/Los_Angeles', // adjust to your timezone
    },
    end: {
      dateTime: req.body.endDateTime,
      timeZone: 'America/Los_Angeles',
    },
  };

  try {
    const createdEvent = await createEvent(event);
    res.status(201).json(createdEvent);
  } catch (error) {
    res.status(500).send(`Error creating event: ${error.message}`);
  }
});

module.exports = router;
