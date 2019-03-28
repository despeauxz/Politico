/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
import request from 'supertest';
import { expect } from 'chai';
import mockData from '../../utils/mockData';
import app from '../../../src/app';

const {
  nominalUserDetails, adminUserDetails, invalidUserDetails, emptyUserDetails,
} = mockData.login;

let userToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJmaXJzdG5hbWUiOiJKb2huIiwibGFzdG5hbWUiOiJEb2UiLCJvdGhlcm5hbWUiOiJCZXJyeSIsImVtYWlsIjoiZXhhbXBsZUBnbWFpbC5jb20iLCJkaWdpdCI6IjEyMzQ1Njc4OSIsImlzX2FkbWluIjpudWxsLCJwYXNzd29yZCI6IiQyYiQxMCRFaThLdjh4RC5lZW5LdkJHQ2dYS1EudjloMUJsS2tzRDIyN24ucnE0Um5wMS5uRU1rUG04dSJ9LCJpYXQiOjE1NTEyNzQ3ODJ9.Q4nCfPi5yqy5uKVvgJTWebzFRJf4w1vEsVwIV_7kJp4';
let adminToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoyLCJmaXJzdG5hbWUiOiJKb2huIiwibGFzdG5hbWUiOiJEb2UiLCJvdGhlcm5hbWUiOiJCZXJyeSIsImVtYWlsIjoiYWRtaW5AZW1haWwuY29tIiwiZGlnaXQiOiIxMjM0NTY3ODkiLCJpc19hZG1pbiI6dHJ1ZSwicGFzc3dvcmQiOiIkMmIkMTAkRWg0anY2Q0lscGJJZmNORjZEVmZ3LkMzc0F3cnYzbkxva1RocnVWOVFPeW9wUjJMODhLNUcifSwiaWF0IjoxNTUxMjc0NzgyfQ.SabqtjrqIxcTU7LA1rZoeVyrqmAQX-Kf7Uqj-t1TozQ';

describe('Auth routes: login', () => {
  it('should login a valid nominal user', (done) => {
    request(app)
      .post('/api/v1/auth/login')
      .set('Accept', 'application/json')
      .send({ ...nominalUserDetails })
      .end((err, res) => {
        userToken = res.body.data.token;
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.a('object');
        expect(res.body.data.user).to.include.keys('firstname');
        expect(res.body.data.user).to.include.keys('lastname');
        expect(res.body.data.user).to.include.keys('email');
        expect(res.body.data.user).to.include.keys('is_admin');
        expect(res.body.data.user).to.include.keys('created_at');
        expect(res.body.data.user.is_admin).to.equal(null);

        done(err);
      });
  });

  it('should return user token', (done) => {
    request(app)
      .post('/api/v1/auth/login')
      .set('Accept', 'application/json')
      .send({ ...nominalUserDetails })
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.a('object');
        expect(res.body.data).to.include.keys('token');

        done(err);
      });
  });

  it('should return login in an Admin User', (done) => {
    request(app)
      .post('/api/v1/auth/login')
      .set('Accept', 'application/json')
      .send({ ...adminUserDetails })
      .end((err, res) => {
        adminToken = res.body.data.token;
        expect(res.statusCode).to.equal(200);
        expect(res.body.data).to.include.keys('token');
        expect(res.body.data.user.is_admin).to.equal(true);

        done(err);
      });
  });

  it('should return user data details', (done) => {
    request(app)
      .post('/api/v1/auth/login')
      .set('Accept', 'application/json')
      .send({ ...nominalUserDetails })
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body.data).to.include.keys('user');
        expect(res.body.data.user).to.include.keys('email');
        expect(res.body.data.user).to.include.keys('firstname');
        expect(res.body.data.user).to.include.keys('created_at');

        done(err);
      });
  });

  it('should validate invalid credentials', (done) => {
    request(app)
      .post('/api/v1/auth/login')
      .set('Accept', 'application/json')
      .send({ ...invalidUserDetails })
      .end((err, res) => {
        expect(res.statusCode).to.equal(401);
        expect(res.body).to.include.keys('error');

        done(err);
      });
  });

  it('should return an error', (done) => {
    request(app)
      .post('/api/v1/auth/login')
      .set('Accept', 'application/json')
      .send({ ...invalidUserDetails })
      .end((err, res) => {
        expect(res.statusCode).to.equal(401);
        expect(res.body).to.be.a('object');
        expect(res.body.error).to.equal('Invalid Credentials');

        done(err);
      });
  });

  it('should return error of missing password field', (done) => {
    request(app)
      .post('/api/v1/auth/login')
      .set('Accept', 'application/json')
      .send({ ...emptyUserDetails })
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        expect(res.body.errors[0].param).to.equal('email');

        done(err);
      });
  });

  it('should return error for invalid email format', (done) => {
    request(app)
      .post('/api/v1/auth/login')
      .set('Accept', 'application/json')
      .send({ ...emptyUserDetails })
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        expect(res.body).to.include.keys('errors');

        done(err);
      });
  });
});

describe('Update User Details', () => {
  describe('## Inputs', () => {
    it('should output error for empty user details', (done) => {
      request(app)
        .patch('/api/v1/auth/user')
        .set('authorization', userToken)
        .send({ })
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.include.keys('message');
          expect(res.body).to.include.keys('data');
          expect(res.body.data).to.be.a('object');

          done(err);
        });
    });

    it('should output error for unauthorized access', (done) => {
      request(app)
        .patch('/api/v1/auth/user')
        .send({ })
        .end((err, res) => {
          expect(res.statusCode).to.equal(401);

          done(err);
        });
    });
  });
});

export default { userToken, adminToken };
