const jwt = require("jsonwebtoken");
const User = require('../model/User');

const authMiddleware = async (req, res, next) => {
    const token = req.header("Authorization");

    if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }

    try {
        const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
        
        // Find user by the decoded id
        const user = await User.findOne({ id: decoded.id }).select('-password');
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }
        
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(400).json({ message: "Invalid token." });
    }
};

module.exports = authMiddleware;