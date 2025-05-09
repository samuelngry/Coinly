const supertest = require('supertest');
const { expect } = require('chai');
const app = require('../server');
const db = require('../config/db');
const User = require("../models/User");
const UserQuest = require("../models/UserQuest");
const Pets = require("../models/Pets");
const jwt = require("jsonwebtoken");

describe('Quest Routes', () => {
    let token, user;

    beforeAll(async () => {
        await db.sync({ force: true });

        user = await User.create({
            id: 1,
            username: "testuser",
            password: "hashedpassword",
            last_generated_at: null 
        });
    
        await Pets.create({
            user_id: user.id,
            name: "Fluffy",
            level: 1,
            xp: 0,
            mood: "Happy",
            last_fed: new Date()
        });
    
        token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
    });

    afterAll(async () => {
        await db.close();
    });

});