const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    // Get the token from the request headers or query parameters
    const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : req.query.token;

    if (!token) {
        // If token is not provided, return an error response
        return res.status(401).json({ message: 'No token provided' });
    }

    // Verify the token
    jwt.verify(token, 'your-secret-key', (err, decoded) => {
        if (err) {
            // If token is invalid, return an error response
            return res.status(401).json({ message: 'Invalid token' });
        }
        // If token is valid, attach the decoded payload to the request object and call next middleware
        req.user = decoded;
        next();
    });
};

module.exports = verifyToken;
