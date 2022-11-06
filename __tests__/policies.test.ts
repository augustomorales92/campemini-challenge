import app from '../src/app';
import request from 'supertest';
import { describe, it, beforeAll } from '@jest/globals';
import { expect } from 'chai';

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

describe('GET policies by client name ', () => {
  it('should receive 401 when client is not authenticated', (done) => {
    request(app)
      .get('/policies/Whitley')
      .expect(401)
      .expect((response) => {
        const text = response.text;
        const json = JSON.parse(text);
        expect(json.message).to.equal('Invalid Token');
        expect(response.statusCode).to.equal(401);
      })
      .end(done);
  });
  it('should receive a message when clients have no associated policies', (done) => {
    request(app)
    .get('/policies/Whitley')
      .set('Authorization', `Bearer ${adminToken}`)
      .expect(204)
      .expect((response) => {
        const text = response.text;
        const json = JSON.parse(text);
        expect(json.message).to.equal('associated policies not found');
        expect(response.statusCode).to.equal(204);
      })
      .end(done);
  });
  it('should receive a list of polities associated', (done) => {
    request(app)
    .get('/policies/Manning')
      .set('Authorization', `Bearer ${adminToken}`)
      .expect(200)
      .expect((response) => {
        const text = response.text;
        const json = JSON.parse(text);
        expect(json).to.be.an('array');
        expect(response.statusCode).to.equal(200);
      })
      .end(done);
  });
  it('should receive 403 when client is user role', (done) => {
    request(app)
    .get('/policies/Manning')
      .set('Authorization', `Bearer ${userToken}`)
      .expect(403)
      .expect((response) => {
        const text = response.text;
        const json = JSON.parse(text);
        expect(json.message).to.equal('Forbidden');
        expect(response.statusCode).to.equal(403);
      })
      .end(done);
  });
  it('should receive 404 when client not exist', (done) => {
    request(app)
    .get('/policies/Augusto')
      .set('Authorization', `Bearer ${adminToken}`)
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

 describe('GET clients name associated to a policy number', () => {
  it('should receive 401 when client is not authenticated', (done) => {
    request(app)
      .get('/policies/user/64cceef9-3a01-49ae-a23b-3761b604800b')
      .expect(401)
      .expect((response) => {
        const text = response.text;
        const json = JSON.parse(text);
        expect(json.message).to.equal('Invalid Token');
        expect(response.statusCode).to.equal(401);
      })
      .end(done);
  });
  it('should receive a message when clients have no associated policies', (done) => {
    request(app)
    .get('policies/user/64cceef9-3a01-49ae-a23b-3761b604800b')
      .set('Authorization', `Bearer ${adminToken}`)
      .expect(200)
      .expect((response) => {
        const text = response.text;
        const json = JSON.parse(text);
        expect(json.name).to.equal('Manning');
        expect(response.statusCode).to.equal(200);
      })
      .end(done);
  });
  it('should receive 403 when client is user role', (done) => {
    request(app)
    .get('/policies/user/64cceef9-3a01-49ae-a23b-3761b604800b')
      .set('Authorization', `Bearer ${userToken}`)
      .expect(403)
      .expect((response) => {
        const text = response.text;
        const json = JSON.parse(text);
        expect(json.message).to.equal('Forbidden');
        expect(response.statusCode).to.equal(403);
      })
      .end(done);
  });
  it('should receive 404 when client not exist', (done) => {
    request(app)
    .get('/policies/user/64cceef9-3a01-49ae-at23v-3761b604800b')
      .set('Authorization', `Bearer ${adminToken}`)
      .expect(404)
      .expect((response) => {
        const text = response.text;
        const json = JSON.parse(text);
        expect(json.message).to.equal('Policy not found');
        expect(response.statusCode).to.equal(404);
      })
      .end(done);
  });
});
 