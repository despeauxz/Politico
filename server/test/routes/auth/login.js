import request from 'supertest';
import { expect } from 'chai';
import mockData from '../../utils/mockData';
import app from '../../../src/app';

const { validUserDetails, invalidUserDetails, emptyUserDetails } = mockData.login;

describe('Auth routes: login', () => {
    it('should login a valid user', (done) => {
        request(app)
            .post('/api/v1/auth/login')
            .set('Accept', 'application/json')
            .send({ ...validUserDetails })
            .end((err, res) => {
                expect(res.statusCode).to.equal(200);
                expect(res.body).to.be.a('object');

            done(err);
        });
    });

    it('should return user token', (done) => {
        request(app)
            .post('/api/v1/auth/login')
            .set('Accept', 'application/json')
            .send({ ...validUserDetails })
            .end((err, res) => {
                expect(res.statusCode).to.equal(200);
                expect(res.body.data).to.include.keys('token');

            done(err);
          });
    });

    it('should return user data details', (done) => {
        request(app)
            .post('/api/v1/auth/login')
            .set('Accept', 'application/json')
            .send({ ...validUserDetails })
            .end((err, res) => {
                expect(res.statusCode).to.equal(200);
                expect(res.body.data).to.include.keys('user');
                expect(res.body.data.user).to.include.keys('email');
                expect(res.body.data.user).to.include.keys('firstname');
                expect(res.body.data.user).to.include.keys('password');

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
