const express = require('express');
const { authorize, createEvent } = require('../controllers/googleCalendarController');

const router = express.Router();

// Route to create a Google Calendar event
router.post('/event', createEvent);

module.exports = router;
