const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if(!token) return res.status(401).json({ error: "Unauthorized "});
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ error: "Token has expired" });
        }
        return res.status(403).json({ error: "Invalid token" });
    }
};

module.exports = verifyToken;