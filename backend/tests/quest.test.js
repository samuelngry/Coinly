const supertest = require('supertest');
const { expect } = require('chai');
const app = require('../server');
const db = require('../config/db');
const User = require("../models/User");
const UserQuest = require("../models/UserQuest");
const Pets = require("../models/Pets");
const jwt = require("jsonwebtoken");

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

describe("Quest API", () => {

    describe("POST /api/quests/generate", () => {
        it('should generate quests if not generated today', async () => {
            // First request of the day
            const res = await supertest(app)
                .post('/api/quests/generate')
                .set('Authorization', `Bearer ${token}`);
        
            expect(res.status).to.equal(200);
            expect(res.body.quest.length).to.be.at.most(5);
        });

        it('should return an empty list if already generated today', async () => {
            const res = await supertest(app)
                .post('/api/quests/generate')
                .set('Authorization', `Bearer ${token}`);

            expect(res.status).to.equal(200);
            expect(res.body.quest).to.equal([]);
        })
    })
})