const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized. Token missing." });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = {
            userId: decoded.id,
            email: decoded.email
        };
        console.log("Authenticated user:", req.user);

        next();
    } catch (err) {
        return res.status(403).json({ message: "Invalid or expired token." });
    }
};

module.exports = authMiddleware;
