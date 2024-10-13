const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;

// Set up your OAuth2 client with your credentials
const oauth2Client = new OAuth2(
  process.env.GOOGLE_CLIENT_ID, // Your Google Client ID
  process.env.GOOGLE_CLIENT_SECRET, // Your Google Client Secret
  process.env.GOOGLE_REDIRECT_URI // Your Google Redirect URI
);

// Function to handle Google Calendar authorization
const authorize = (req, res) => {
  const scopes = [
    'https://www.googleapis.com/auth/calendar', // Full access to the Calendar API
  ];

  const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes,
  });

  // Redirect the user to the authorization URL
  res.redirect(url);
};

// Function to create a Google Calendar event
const createEvent = async (req, res) => {
  const { title, startTime, endTime } = req.body;

  // Set the access token from your OAuth2 flow
  oauth2Client.setCredentials({
    refresh_token: process.env.GOOGLE_REFRESH_TOKEN, // You can obtain this after the authorization
  });

  const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

  const event = {
    summary: title,
    start: {
      dateTime: startTime, // e.g. '2024-10-20T10:00:00-07:00'
      timeZone: 'America/Los_Angeles', // Set the timezone
    },
    end: {
      dateTime: endTime, // e.g. '2024-10-20T11:00:00-07:00'
      timeZone: 'America/Los_Angeles',
    },
  };

  try {
    const response = await calendar.events.insert({
      calendarId: 'primary',
      resource: event,
    });

    res.status(201).json({
      message: 'Event created successfully',
      eventId: response.data.id,
    });
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({ error: 'Failed to create event', details: error.message });
  }
};

module.exports = { authorize, createEvent };