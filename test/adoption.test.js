import chai from 'chai';
import supertest from 'supertest';
import mongoose from 'mongoose';
import app from '../src/app.js';
import userModel from '../src/dao/models/User.js';
import petModel from '../src/dao/models/Pet.js';
import 'dotenv/config'

const expect = chai.expect;
const requester = supertest(app);

let testUser;
let testPet;

before(async () => {
    mongoose.set('strictQuery', true);
    await mongoose.connect(process.env.MONGO_URL);
    testUser = await userModel.create({
        first_name: 'Test',
        last_name: 'User',
        email: `testuser${Date.now()}@example.com`,
        password: 'testpass',
        role: 'user',
        pets: []
    });

    // Crear mascota
    testPet = await petModel.create({
        name: 'TestPet',
        specie: 'Perro',
        birthDate: new Date(),
        adopted: false
    });
});

after(async () => {
    await userModel.findByIdAndDelete(testUser._id);
    await petModel.findByIdAndDelete(testPet._id);
    await mongoose.connection.close();
});

describe('Testing de endpoints de adopciones', ()=>{

    it('GET /api/adoptions - debe obtener todas las adopciones', async()=>{
        const response = await requester.get('/api/adoptions');
        expect(response.status).to.equal(200);
        expect(response.body).to.have.property('status', 'success');
        expect(response.body.payload).to.be.an('array');
    });
    it('GET api/adoptions/:aid - debe fallar si la adopción no existe', async ()=>{
        const fakeId = "64d2d04c2f9b2569be1a0000";
        const response = await requester.get(`/api/adoptions/${fakeId}`);
        expect(response.status).to.equal(404);
        expect(response.body).to.have.property('status', 'error');
    });
    it('POST api/adoptions/:uid/pid - Debe registrar una adopción', async ()=>{
        const response = await requester.post(`/api/adoptions/${testUser._id}/${testPet._id}`);
        expect(response.status).to.equal(200);
        expect(response.body).to.have.property('status', 'success');
        expect(response.body.message).to.equal('Pet adopted');
    });
});