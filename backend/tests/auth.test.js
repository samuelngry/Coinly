const supertest = require('supertest');
const { expect } = require('chai');
const app = require('../server');
const db = require('../config/db');

describe('Auth Routes', () => {
    before(async () => {
        await db.sync({ force: true });
    });

    after(async () => {
        await db.close();
    });

    let userCredentials = {
        username: 'testUser',
        password: '12345678'
    };

    it('should register a new user', async () => {
        const response = await supertest(app)
            .post('/api/auth/register')
            .send(userCredentials);

        expect(response.status).to.equal(201);
        expect(response.body).to.have.property('token');
        expect(response.body).to.have.property('user');
        expect(response.body.user).to.have.property('username', userCredentials.username);
    });

    it('should log in and return a JWT', async () => {
        const response = await supertest(app)
            .post('/api/auth/login')
            .send(userCredentials);

        expect(response.status).to.equal(200);
        expect(response.body).to.have.property('token');
        expect(response.body).to.have.property('user');
        expect(response.body.user).to.have.property('username', userCredentials.username);
    });

    it('should fail login with invalid credentials', async () => {
        const response = await supertest(app)
            .post('/api/auth/login')
            .send({ username: 'invalidUser', password: 'invalidPass' });

        expect(response.status).to.equal(401);
        expect(response.body).to.have.property('error').that.equals('Authentication failed.');
    });
})