import chai from 'chai';
import mongoose from 'mongoose';
import supertest from 'supertest';
import app from '../src/app.js';
import userModel from '../src/dao/models/User.js';
import 'dotenv/config'

const expect = chai.expect;
const requester = supertest(app);

let cookie;

describe('Tests de autenticación (sessions)', ()=>{
    const mockUser = {
        first_name: 'Test',
        last_name: 'Sessions',
        email: `sessionuser${Date.now()}@mail.com`,
        password: 'test123'
    };

    before(async ()=>{
        mongoose.set('strictQuery', true);
        await mongoose.connect(process.env.MONGO_URL);
        await userModel.deleteOne({email: mockUser.email});
    });

    after(async ()=>{
        if (mongoose.connection.readyState !== 1){
            await userModel.deleteOne({email: mockUser.email});
            await mongoose.disconnect();
        } 
    });

    it('POST /api/sessions/register - debe registrar un nuevo usuario', async ()=>{
        const res = await requester.post('/api/sessions/register').send(mockUser);
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('status', 'success');
        expect(res.body.payload).to.be.a('string');
    });

    it('POST /api/sessions/login - debe loguear correctamente al usuario', async ()=>{
        const res = await requester.post('/api/sessions/login').send({
            email: mockUser.email,
            password: mockUser.password
        });
        expect(res.status).to.equal(200);
        expect(res.headers['set-cookie']).to.exist;

        const rawCookie = res.headers['set-cookie'][0];
        cookie = rawCookie.split(';')[0];
    });

    it('GET /api/sessions/current - debe devolver los datos del usuario autenticado', async ()=>{
        const res = await requester
            .get('/api/sessions/current')
            .set('Cookie', cookie);

        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('payload');
        expect(res.body.payload).to.have.property('email', mockUser.email);
    });
});