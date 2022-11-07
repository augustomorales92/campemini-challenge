import app from '../src/app';
import request from 'supertest';
import { describe, it, beforeAll, afterAll } from '@jest/globals';
import { expect } from 'chai';
import server from '../src/app';

const adminClient = {
  id: 'a0ece5db-cd14-4f21-812f-966633e7be86',
  name: 'Britney',
  email: 'britneyblankenship@quotezart.com',
  role: 'admin',
};
const userClient = {
  id: 'a3b8d425-2b60-4ad7-becc-bedf2ef860bd',
  name: 'Barnett',
  email: 'barnettblankenship@quotezart.com',
  role: 'user',
};

afterAll(async() => {
  await server.close();
  });

let adminToken: string, userToken: string;
beforeAll(async () => {
  const responseAdmin = await request(app)
    .post('/authenticate')
    .send(adminClient);
  const textAdmin = responseAdmin.text;
  const jsonAdmin = JSON.parse(textAdmin);
  adminToken = jsonAdmin.token;

  const responseUser = await request(app)
    .post('/authenticate')
    .send(userClient);
  const textUser = responseUser.text;
  const jsonUser = JSON.parse(textUser);
  userToken = jsonUser.token;
});


describe('GET clients by id', () => {
  it('should receive 401 when client is not authenticated', (done) => {
    request(app)
      .get('/clients/clientId/0178914c-548b-4a4c-b918-47d6a391530c')
      .expect(401)
      .expect((response) => {
        const text = response.text;
        const json = JSON.parse(text);
        expect(json.message).to.equal('Invalid Token');
        expect(response.statusCode).to.equal(401);
      })
      .end(done);
  });
  it('should receive 200 when client is admin role', (done) => {
    request(app)
      .get('/clients/clientId/0178914c-548b-4a4c-b918-47d6a391530c')
      .set('Authorization', `Bearer ${adminToken}`)
      .expect(200)
      .expect((response) => {
        const text = response.text;
        const json = JSON.parse(text);
        expect(json.name).to.equal('Whitley');
        expect(json.role).to.equal('admin');
        expect(response.statusCode).to.equal(200);
      })
      .end(done);
  });
  it('should receive 200 when client is user role', (done) => {
    request(app)
      .get('/clients/clientId/0178914c-548b-4a4c-b918-47d6a391530c')
      .set('Authorization', `Bearer ${userToken}`)
      .expect(200)
      .expect((response) => {
        const text = response.text;
        const json = JSON.parse(text);
        expect(json.name).to.equal('Whitley');
        expect(json.role).to.equal('admin');
        expect(response.statusCode).to.equal(200);
      })
      .end(done);
  });
  it('should receive 404 when client not exist', (done) => {
    request(app)
      .get('/clients/clientId/0178914c-548b-4a4c-b918-47d6a391537m')
      .set('Authorization', `Bearer ${userToken}`)
      .expect(404)
      .expect((response) => {
        const text = response.text;
        const json = JSON.parse(text);
        expect(json.message).to.equal('Client not found');
        expect(response.statusCode).to.equal(404);
      })
      .end(done);
  });
});

describe('GET clients by name', () => {
  it('should receive 401 when client is not authenticated', (done) => {
    request(app)
      .get('/clients/clientName/Whitley')
      .expect(401)
      .expect((response) => {
        const text = response.text;
        const json = JSON.parse(text);
        expect(json.message).to.equal('Invalid Token');
        expect(response.statusCode).to.equal(401);
      })
      .end(done);
  });
  it('should receive 200 when client is admin role', (done) => {
    request(app)
      .get('/clients/clientName/Whitley')
      .set('Authorization', `Bearer ${adminToken}`)
      .expect(200)
      .expect((response) => {
        const text = response.text;
        const json = JSON.parse(text);
        expect(json.name).to.equal('Whitley');
        expect(json.role).to.equal('admin');
        expect(response.statusCode).to.equal(200);
      })
      .end(done);
  });
  it('should receive 200 when client is user role', (done) => {
    request(app)
      .get('/clients/clientName/Whitley')
      .set('Authorization', `Bearer ${userToken}`)
      .expect(200)
      .expect((response) => {
        const text = response.text;
        const json = JSON.parse(text);
        expect(json.name).to.equal('Whitley');
        expect(json.role).to.equal('admin');
        expect(response.statusCode).to.equal(200);
      })
      .end(done);
  });
  it('should receive 404 when client not exist', (done) => {
    request(app)
      .get('/clients/clientName/Augusto')
      .set('Authorization', `Bearer ${userToken}`)
      .expect(404)
      .expect((response) => {
        const text = response.text;
        const json = JSON.parse(text);
        expect(json.message).to.equal('Client not found');
        expect(response.statusCode).to.equal(404);
      })
      .end(done);
  });
});
