const jwt = require("jsonwebtoken");
const User = require("../models/User");
const UserPreference = require("../models/UserPreference");
const Pets = require("../models/Pets");
const bcrypt = require("bcrypt");

const createToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET);
};

const register = async (req, res) => {
    try {
        console.log('Received request to register:', req.body);
        const { username, password } = req.body;

        const existingUser = await User.findOne({ where: { username } });
        if (existingUser) return res.status(400).json({ error: "Username taken" });

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ 
            username, 
            password: hashedPassword,
            streak_count: 0,
            onboarding_completed: false,
         });

        await UserPreference.create({
            user_id: user.id,
            goal: "",
            struggle: "",
            lifestyle: [],
            categories: []
        });

        const pet = await Pets.create({
            user_id: user.id,
            name: 'Bueno',
            level: 1,
            xp: 0,
            last_fed: new Date(),
        });

        const token = createToken(user.id);
        console.log('User registered:', user);
        console.log('Default pet created:', pet);

        res.status(201).json({ 
            token,
            user: { 
                id: user.id, 
                username: user.username,
                onboarding_completed: user.onboarding_completed,
             } 
        });
    } catch (err) {
        console.error('Error during registration:', err.message);
        res.status(500).json({ error: err.message });
    }
};

const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ where: { username } });
        if (!user) return res.status(401).json({ error: "User not found" });

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) return res.status(401).json({ error: "Wrong password" });

        const token = createToken(user.id);

        res.status(200).json({ 
            token, 
            user: { 
                id: user.id, 
                username: user.username, 
                onboarding_completed: user.onboarding_completed 
            },
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { 
    register,
    login,
};