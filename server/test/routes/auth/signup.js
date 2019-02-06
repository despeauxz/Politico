import request from 'supertest';
import { expect } from 'chai';
import mockData from '../../utils/mockData';
import app from '../../../src/app';

const { validUserDetails, invalidUserDetails } = mockData.signup;

describe('Auth routes:', () => {
  it('should add a new user', (done) => {
    request(app)
      .post('/api/v1/auth/signup')
      .set('Accept', 'application/json')
      .send({ ...validUserDetails })
      .end((err, res) => {
        expect(res.statusCode).to.equal(201);
        expect(res.body).to.be.a('object');

        done(err);
      });
  });

  it('should check if user already exists', (done) => {
    request(app)
      .post('/api/v1/auth/signup')
      .set('Accept', 'application/json')
      .send({ ...validUserDetails })
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        expect(res.body).to.include.keys('message');

        done(err);
      });
  });

  it('should return errors for invalid fields', (done) => {
    request(app)
      .post('/api/v1/auth/signup')
      .set('Accept', 'application/json')
      .send({ ...invalidUserDetails })
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        expect(res.body).to.be.a('object');
        expect(res.body).to.include.keys('errors');

        done(err);
      });
  });

  it('should return error of missing name field', (done) => {
    request(app)
      .post('/api/v1/auth/signup')
      .set('Accept', 'application/json')
      .send({ ...invalidUserDetails })
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        expect(res.body.errors).to.include.keys('firstname');

        done(err);
      });
  });

  it('should return error for mismatch of password', (done) => {
    request(app)
      .post('/api/v1/auth/signup')
      .set('Accept', 'application/json')
      .send({ ...invalidUserDetails })
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        expect(res.body).to.include.keys('errors');
        expect(res.body.errors.passwordConfirm.msg).to.equal('Passwords don\'t match');

        done(err);
      });
  });
});
