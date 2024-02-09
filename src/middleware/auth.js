const jwt = require('jsonwebtoken');
const User = require('../model/user');

const secretKey = 'your_secret_key'; // Change this to your actual secret key

// Middleware function to verify JWT token and user enabled status
async function verifyToken(req, res, next) {
  // Get token from request headers
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ success: false, message: 'No token provided' });
  }

  // Verify the token
  jwt.verify(token, secretKey, async (err, decoded) => {
    if (err) {
      return res.status(401).json({ success: false, message: 'Failed to authenticate token' });
    }

    try {
      // Find the user associated with the decoded user ID
      const user = await User.findById(decoded.userId);

      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }

      // Check if user is enabled
      if (!user.enabled) {
        return res.status(403).json({ success: false, message: 'User is disabled' });
      }

      // Attach the user object to the request for further use
      req.user = user;
      next(); // Move to the next middleware
    } catch (error) {
      return res.status(500).json({ success: false, message: 'Internal server error' });
    }
  });
}

module.exports = verifyToken;
