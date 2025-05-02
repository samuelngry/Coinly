const jwt = require("jsonwebtoken");
const User = require("../models/User");
const bcrypt = require("bcrypt");

const createToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};

const register = async (req, res) => {
    try {
        const { username, password, avatar_url } = req.body;

        const existingUser = await User.findOne({ where: { username } });
        if (existingUser) return res.status(400).json({ error: "Username taken." });

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ 
            username, 
            password: hashedPassword,
            avatar_url: avatar_url || null
         });

        const token = createToken(user.id);
        res.status(201).json({ token,
            user: { 
                id: user.id, 
                username: user.username,
                avatar_url: user.avatar_url
             } 
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ where: { username } });
        if (!user) return res.status(401).json({ error: "Authentication failed." });

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) return res.status(401).json({ error: "Authentication failed." });

        const token = createToken(user.id);
        res.status(200).json({ token, user: { id: user.id, username: user.username } });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { 
    register,
    login,
};