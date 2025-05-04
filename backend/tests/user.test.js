const supertest = require('supertest');
const { expect } = require('chai');
const app = require('../server');
const db = require('../config/db');
const { User } = require("../models");

describe('User Routes', () => {
    let authToken;
    let testUserId;

    const testUser = {
        username: 'testUser2',
        password: '123456789',
        avatar_url: 'http://example.com/avatar.png',
    };

    before(async () => {
        await db.authenticate();
        await User.destroy({ where: { username: testUser.username } });

        const response = await supertest(app)
            .post('/api/auth/register')
            .send(testUser);

        authToken = response.body.token;
        testUserId = response.body.user.id;
    });

    after(async () => {
        await User.destroy({ where: { id: testUserId } });
        await db.close();
    });

    it('should update the username', async () => {
        const res = await supertest(app)
            .put('/api/users/update-username')
            .set('Authorization', `Bearer ${authToken}`)
            .send({ username: 'newUsername' });
        
        expect(res.status).to.equal(200);
        expect(res.status).to.have.property('username').that.equals('newUsername');
        expect(res.status).to.have.property('message').that.equals('Username changed successfully');
    });
})