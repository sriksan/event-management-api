const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).send('Access denied.');

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified; // Attach the user to the request
    next();
  } catch (err) {
    res.status(400).send('Invalid token.');
  }
};

module.exports = authMiddleware;
