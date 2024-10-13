const express = require('express');
const { createEvent, getEvents, rsvpEvent } = require('../controllers/eventController');
const protect = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', protect, createEvent);      // Create event
router.get('/', protect, getEvents);         // Get all events
router.post('/:eventId/rsvp', protect, rsvpEvent); // RSVP to event

module.exports = router;
