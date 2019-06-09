/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
import request from 'supertest';
import { expect } from 'chai';
import mockData from '../../utils/mockData';
import app from '../../../src/app';

const {
  nominalUserDetails, adminUserDetails, invalidUserDetails, emptyUserDetails,
} = mockData.login;

let userToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJmaXJzdG5hbWUiOiJKb2huIiwibGFzdG5hbWUiOiJEb2UiLCJvdGhlcm5hbWUiOm51bGwsImVtYWlsIjoiZXhhbXBsZUBnbWFpbC5jb20iLCJwaG9uZU5vIjpudWxsLCJhdmF0YXIiOiJodHRwczovL3d3dy50YW5uZXJmaW5hbmNpYWwuY2Evd3AtY29udGVudC91cGxvYWRzLzIwMTkvMDEvcGVyc29uLXBsYWNlaG9sZGVyLW1hbGUtNS0xLTMwMHgzMDAtMjUweDI1MC5qcGciLCJwYXJ0eUlkIjpudWxsLCJjcmVhdGVkX2F0IjoiMjAxOS0wNi0wOFQxODo0MToyNi41MTRaIiwibW9kaWZpZWRfYXQiOm51bGx9LCJpYXQiOjE1NjAwMjI4ODZ9.rjoLSxdGPrxa2t6cgKrHRsYwbh9kdIboCK8WGFfVhqk';
let adminToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoyLCJmaXJzdG5hbWUiOiJKb2huIiwibGFzdG5hbWUiOiJEb2UiLCJvdGhlcm5hbWUiOm51bGwsImVtYWlsIjoiYWRtaW5AZW1haWwuY29tIiwicGhvbmVObyI6bnVsbCwiYXZhdGFyIjoiaHR0cHM6Ly93d3cudGFubmVyZmluYW5jaWFsLmNhL3dwLWNvbnRlbnQvdXBsb2Fkcy8yMDE5LzAxL3BlcnNvbi1wbGFjZWhvbGRlci1tYWxlLTUtMS0zMDB4MzAwLTI1MHgyNTAuanBnIiwicGFydHlJZCI6bnVsbCwiY3JlYXRlZF9hdCI6IjIwMTktMDYtMDhUMTg6NDE6MjYuNjEyWiIsIm1vZGlmaWVkX2F0IjpudWxsfSwiaWF0IjoxNTYwMDIyODg2fQ.I5jk49-dPpcQe3bwHNWIoF5OHn3s8By0jp5dbRiAE-8';

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
        expect(res.body.data.user).to.include.keys('isAdmin');
        expect(res.body.data.user).to.include.keys('created_at');
        expect(res.body.data.user.isAdmin).to.equal(null);

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
        expect(res.body.data.user.isAdmin).to.equal(true);

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
        expect(res.body.errors).to.include.keys('email');

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
