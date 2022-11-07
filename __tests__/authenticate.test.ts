import app from '../src/app';
import request from 'supertest';
import { describe, it , afterAll} from '@jest/globals';
import { expect } from 'chai';
import server from '../src/app';


afterAll(async() => {
  await server.close();
  });

describe('authentication tests', () => {
  it('success authentication', (done) => {
    const user = {
      name: 'Britney',
      email: 'britneyblankenship@quotezart.com',
    };
    request(app)
      .post('/authenticate')
      .send(user)
      .expect(200)
      .expect((response) => {
        const text = response.text;
        const json = JSON.parse(text);
        expect(json.name).to.equal(user.name);
        expect(json.token).to.be.an('string');
        expect(response.statusCode).to.equal(200);
      })
      .end(done);
  });
  it('fail authentication',  (done) => {
    const user = {
      name: 'Augusto',
      email: 'augusto@quotezart.com',
    };
    request(app).post('/authenticate').send(user).expect(400)
    .expect((response) => {
      const text = response.text;
      const json = JSON.parse(text);
      expect(json.message).to.be.an('string'); 
      expect(response.statusCode).to.equal(400);
    })
    .end(done);
  });
});
