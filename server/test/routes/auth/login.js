/* eslint-disable import/no-extraneous-dependencies */
import request from 'supertest';
import { expect } from 'chai';
import mockData from '../../utils/mockData';
import app from '../../../src/app';

const {
  nominalUserDetails, adminUserDetails, invalidUserDetails, emptyUserDetails,
} = mockData.login;

let userToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJmaXJzdG5hbWUiOiJKb2huIiwibGFzdG5hbWUiOiJEb2UiLCJvdGhlcm5hbWUiOiJCZXJyeSIsImVtYWlsIjoiZXhhbXBsZUBnbWFpbC5jb20iLCJkaWdpdCI6IjEyMzQ1Njc4OSIsImF2YXRhciI6bnVsbCwiaXNfYWRtaW4iOm51bGwsInBhc3N3b3JkIjoiJDJiJDEwJHAuOG9iaEhjcHlOOGxHVVhremRoNk9WSlpxekt5RkZRRzltVmJVdUVVcFlRSndBczcwUXRxIiwiY3JlYXRlZF9hdCI6IjIwMTktMDItMTRUMDg6NTg6MDMuOTc4WiIsIm1vZGlmaWVkX2F0IjpudWxsfSwiaWF0IjoxNTUwMTM4Mjg0LCJleHAiOjE1NTAzMTEwODR9.VG9ROlr5j2zP6JGUdYM6dXm1hbLyvbQKtQjRMdZ65DY';
let adminToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoyLCJmaXJzdG5hbWUiOiJKb2huIiwibGFzdG5hbWUiOiJEb2UiLCJvdGhlcm5hbWUiOiJCZXJyeSIsImVtYWlsIjoiYWRtaW5AZW1haWwuY29tIiwiZGlnaXQiOiIxMjM0NTY3ODkiLCJhdmF0YXIiOm51bGwsImlzX2FkbWluIjp0cnVlLCJwYXNzd29yZCI6IiQyYiQxMCQ0UmYyMzVZU011ODJubFlkVmx3dlp1NzZ4bjJ4WXJEVHptblN1Ui5vRlg4U0hPOXFzOWRMeSIsImNyZWF0ZWRfYXQiOiIyMDE5LTAyLTE0VDA4OjU4OjA0LjEzOVoiLCJtb2RpZmllZF9hdCI6bnVsbH0sImlhdCI6MTU1MDEzODI4NCwiZXhwIjoxNTUwMzExMDg0fQ.ezcDKIUF1JFlyWV03_FuTDAlElYy7LL9oKI4dqybARk';

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

export default { userToken, adminToken };
