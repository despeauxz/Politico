/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
import request from 'supertest';
import { expect } from 'chai';
import mockData from '../../utils/mockData';
import app from '../../../src/app';

const {
  nominalUserDetails, adminUserDetails, invalidUserDetails, emptyUserDetails,
} = mockData.login;

let userToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJmaXJzdG5hbWUiOiJKb2huIiwibGFzdG5hbWUiOiJEb2UiLCJvdGhlcm5hbWUiOiJCZXJyeSIsImVtYWlsIjoiZXhhbXBsZUBnbWFpbC5jb20iLCJkaWdpdCI6IjEyMzQ1Njc4OSIsImF2YXRhciI6Imh0dHBzOi8vd3d3LnRhbm5lcmZpbmFuY2lhbC5jYS93cC1jb250ZW50L3VwbG9hZHMvMjAxOS8wMS9wZXJzb24tcGxhY2Vob2xkZXItbWFsZS01LTEtMzAweDMwMC0yNTB4MjUwLmpwZyIsImlzX2FkbWluIjpudWxsLCJwYXNzd29yZCI6IiQyYiQxMCREUmVJa0ZTQlloUGh0a3k4aTN0V2guMHZaTVhrdkZQMzlyRFFhblFzYnZLWFNrNU9SaWRxMiIsImNyZWF0ZWRfYXQiOiIyMDE5LTAyLTE2VDEyOjU2OjI1LjI3MloiLCJtb2RpZmllZF9hdCI6bnVsbH0sImlhdCI6MTU1MDMyNTM4NiwiZXhwIjoxNTUwNDk4MTg2fQ.pzerpAk39jVbp0IWbxZPNG6uCxEMqua9TeNsRggBMEo';
let adminToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoyLCJmaXJzdG5hbWUiOiJKb2huIiwibGFzdG5hbWUiOiJEb2UiLCJvdGhlcm5hbWUiOiJCZXJyeSIsImVtYWlsIjoiYWRtaW5AZW1haWwuY29tIiwiZGlnaXQiOiIxMjM0NTY3ODkiLCJhdmF0YXIiOiJodHRwczovL3d3dy50YW5uZXJmaW5hbmNpYWwuY2Evd3AtY29udGVudC91cGxvYWRzLzIwMTkvMDEvcGVyc29uLXBsYWNlaG9sZGVyLW1hbGUtNS0xLTMwMHgzMDAtMjUweDI1MC5qcGciLCJpc19hZG1pbiI6dHJ1ZSwicGFzc3dvcmQiOiIkMmIkMTAkTTFlMjg1eDRFN2s1Mno2Nmh6N0ZELmFPRnBxVldnVTk5N3BXMzFMU3h1Z0RQSk1lTzBCOUMiLCJjcmVhdGVkX2F0IjoiMjAxOS0wMi0xNlQxMjo1NjoyNi4yODlaIiwibW9kaWZpZWRfYXQiOm51bGx9LCJpYXQiOjE1NTAzMjUzODYsImV4cCI6MTU1MDQ5ODE4Nn0.ZNct618p_oPToA9TvQZk3WjoSPTd7TwrHlhhKv38RR4';

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
      .post('/api/v1/auth/signup')
      .set('Accept', 'application/json')
      .send({ ...emptyUserDetails })
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        expect(res.body.errors).to.include.keys('password');

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
        expect(res.body.errors.email.msg).to.equal('Please input a valid email address');

        done(err);
      });
  });
});

describe('Update User Details', () => {
  describe('## Wrong input', () => {
    it('should output error for empty user details', (done) => {
      request(app)
        .patch('/api/v1/auth/user')
        .set('authorization', userToken)
        .send({ })
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body).to.include.keys('error');

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
