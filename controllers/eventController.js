const Event = require('../models/event');

// Create new event
exports.createEvent = async (req, res) => {
  const { title, description, date, location } = req.body;
  const event = new Event({
    title,
    description,
    date,
    location,
    organizer: req.user._id,
  });

  await event.save();
  res.status(201).json(event);
};

// Get all events
exports.getEvents = async (req, res) => {
  const events = await Event.find().populate('organizer', 'name').populate('participants', 'name');
  res.status(200).json(events);
};

// RSVP to an event
exports.rsvpEvent = async (req, res) => {
  const event = await Event.findById(req.params.eventId);

  if (!event) {
    return res.status(404).json({ message: 'Event not found' });
  }

  if (event.participants.includes(req.user._id)) {
    return res.status(400).json({ message: 'You have already RSVP’d' });
  }

  event.participants.push(req.user._id);
  await event.save();

  res.status(200).json({ message: 'RSVP successful' });
};
