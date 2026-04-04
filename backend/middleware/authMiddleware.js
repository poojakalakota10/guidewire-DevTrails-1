const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ error: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET || 'supersecretjwt');
    req.user = decoded; // Contains id and role
    next();
  } catch (err) {
    res.status(401).json({ error: 'Token is not valid' });
  }
}

function adminMiddleware(req, res, next) {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ error: 'Admin access denied' });
  }
}

module.exports = { authMiddleware, adminMiddleware };
