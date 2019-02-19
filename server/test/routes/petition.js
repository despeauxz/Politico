/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-undef */
import request from 'supertest';
import { expect } from 'chai';
import app from '../../src/app';
import mockData from '../utils/mockData';
import tokens from './auth/login';

const { validDetails, invalidDetails, emptyDetails } = mockData.petition;
const { userToken, adminToken } = tokens;


describe('Petition', () => {
  describe('## Right Input', () => {
    it('should create a new petition', (done) => {
      request(app)
        .post('/api/v1/petition')
        .set('Accept', 'application/json')
        .set('authorization', userToken)
        .send({ ...validDetails })
        .end((err, res) => {
          expect(res.statusCode).to.equal(201);
          expect(res.body).to.include.keys('message');
          expect(res.body).to.include.keys('data');
          expect(res.body.data).to.include.keys('title');
          expect(res.body.data).to.include.keys('text');
          expect(res.body.data).to.include.keys('created_by');
          expect(res.body.data).to.include.keys('created_at');

          done(err);
        });
    });

    it('should return all petitions', (done) => {
      request(app)
        .get('/api/v1/petition')
        .set('authorization', adminToken)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.include.keys('data');
          expect(res.body.data).to.be.a('array');

          done(err);
        });
    });
  });

  describe('## Wrong Input', () => {
    it('should output error for invalid office', (done) => {
      request(app)
        .post('/api/v1/petition')
        .set('Accept', 'application/json')
        .set('authorization', userToken)
        .send({ ...invalidDetails })
        .end((err, res) => {
          expect(res.statusCode).to.equal(404);
          expect(res.body).to.include.keys('error');
          expect(res.body.error).to.equal('Office does not exist');

          done(err);
        });
    });

    it('should output error for empty fields', (done) => {
      request(app)
        .post('/api/v1/petition')
        .set('Accept', 'application/json')
        .set('authorization', userToken)
        .send({ ...emptyDetails })
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body).to.include.keys('errors');
          expect(res.body.errors).to.include.keys('title');
          expect(res.body.errors).to.include.keys('text');

          done(err);
        });
    });

    it('should output error for unauthorized user', (done) => {
      request(app)
        .post('/api/v1/petition')
        .set('Accept', 'application/json')
        .send({ ...validDetails })
        .end((err, res) => {
          expect(res.statusCode).to.equal(401);
          expect(res.body).to.include.keys('error');
          expect(res.body.error).to.equal('Unauthorized user');

          done(err);
        });
    });

    it('should output error for forbidden access', (done) => {
      request(app)
        .get('/api/v1/petition')
        .set('authorization', userToken)
        .end((err, res) => {
          expect(res.statusCode).to.equal(403);
          expect(res.body).to.include.keys('message');
          expect(res.body.message).to.equal('Unauthorized Access! Admin only');

          done(err);
        });
    });

    it('should output error for unauthorized access', (done) => {
      request(app)
        .get('/api/v1/petition')
        .end((err, res) => {
          expect(res.statusCode).to.equal(401);
          expect(res.body).to.include.keys('error');
          expect(res.body.error).to.equal('Unauthorized user');

          done(err);
        });
    });
  });
});
