const supertest = require('supertest');
const { expect } = require('chai');
const app = require('../server');
const db = require('../config/db');
const User = require("../models/User");
const UserPreference = require("../models/UserPreference");
const UserQuest = require("../models/UserQuest");
const Pets = require("../models/Pets");
const jwt = require("jsonwebtoken");

let token, user;

before(async () => {
    await db.sync({ force: true });

    user = await User.create({
        id: 1,
        username: "testuser",
        password: "hashedpassword",
        last_generated_at: null 
    });

    await UserPreference.create({
        user_id: 1,
        goal_focus: 'savings',
        spending_habits: 'moderate',
        spending_categories: ['coffee', 'lunch', 'entertainment'],
        eats_out_frequency: 'often',
        makes_own_coffee: 'no',
        transport_mode: 'car'
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

after(async () => {
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
        });
    });

    describe("POST /api/quests/:id/accept", () => {
        let quest;

        beforeEach(async () => {
            await UserQuest.destroy({ where: { user_id: user.id } });

            quest = await UserQuest.create({
                user_id: user.id,
                quest_text: "Buy no coffee today",
                xp: 50,
                status: "Pending",
                instance_date: new Date()
            });
        });

        it('should accept a quest', async () => {
            const res = await supertest(app)
                .post(`/api/quests/${quest.id}/accept`)
                .set("Authorization", `Bearer ${token}`);

            const updatedQuest = await UserQuest.findByPk(quest.id);
            expect(res.status).to.equal(200);
            expect(res.body).to.have.property('message').that.equals('Quest accepted successfully');
            expect(updatedQuest.status).to.equal('Accepted');
        });

        it('should prevent accepting more than 4 quests', async () => {
            for (let i = 0; i < 4; i++) {
                await UserQuest.create({
                    user_id: user.id,
                    quest_text: `Dummy quest ${i}`,
                    xp: 10,
                    status: "Accepted",
                    accepted_at: new Date(),
                    instance_date: new Date()
                });
            }

            const newQuest = await UserQuest.create({
                user_id: user.id,
                quest_text: "Another pending quest",
                xp: 20,
                status: "Pending",
                instance_date: new Date()
            });

            const res = await supertest(app)
                .post(`/api/quests/${newQuest.id}/accept`)
                .set("Authorization", `Bearer ${token}`);
            
            expect(res.status).to.equal(400);
            expect(res.body).to.have.property('error').that.equals('You can only have up to 4 accepted quests at a time.');
        });
    });

    describe("POST /api/quests/:id/complete", () => {
        let quest;

        beforeEach(async () => {
            await UserQuest.destroy({ where: { user_id: user.id } });

            quest = await UserQuest.create({
                user_id: user.id,
                quest_text: "Finish this quest",
                xp: 50,
                status: "Accepted",
                accepted_at: new Date(),
                instance_date: new Date()
            });
        });

        it('should complete the quest and update pet', async () => {
            const res = await supertest(app)
                .post(`/api/quests/${quest.id}/complete`)
                .set("Authorization", `Bearer ${token}`);

            expect(res.status).to.equal(200);
            expect(res.body).to.have.property("xp");
            expect(res.body).to.have.property("level");
            expect(res.body).to.have.property("mood");
        });

        it('should return error if quest is already completed', async () => {
            await supertest(app)
                .post(`/api/quests/${quest.id}/complete`)
                .set("Authorization", `Bearer ${token}`);

            const res = await supertest(app)
                .post(`/api/quests/${quest.id}/complete`)
                .set("Authorization", `Bearer ${token}`)

            expect(res.status).to.equal(404);
            expect(res.body).to.have.property('error').that.equals('Quest not found or already completed.');
        });
    });
});