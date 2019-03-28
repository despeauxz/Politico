/* eslint-disable no-undef */
import request from 'supertest';
import { expect } from 'chai';
import mockData from '../../utils/mockData';
import app from '../../../src/app';
import tokens from '../auth/login';

const { createPartyDetails, invalidPartyDetails } = mockData.createParty;
const { userToken, adminToken } = tokens;


describe('Party Routes: create a new party', () => {
  it('should add a new party', (done) => {
    request(app)
      .post('/api/v1/parties')
      .set('Accept', 'application/json')
      .set('authorization', adminToken)
      .send({ ...createPartyDetails })
      .end((err, res) => {
        expect(res.statusCode).to.equal(201);
        expect(res.body).to.be.a('object');

        done(err);
      });
  });

  it('should return error for forbidden access', (done) => {
    request(app)
      .post('/api/v1/parties')
      .set('Accept', 'application/json')
      .set('authorization', userToken)
      .send({ ...createPartyDetails })
      .end((err, res) => {
        expect(res.statusCode).to.equal(403);
        expect(res.body).to.include.keys('message');
        expect(res.body.message).to.equal('Unauthorized Access! Admin only');

        done(err);
      })
  });

  it('should return error for unauthorized user', (done) => {
    request(app)
      .post('/api/v1/parties')
      .set('Accept', 'application/json')
      .send({ ...createPartyDetails })
      .end((err, res) => {
        expect(res.statusCode).to.equal(401);
        expect(res.body).to.include.keys('error');
        expect(res.body.error).to.equal('Unauthorized user');

        done(err);
      })
  });

  it('should return errors for invalid fields', (done) => {
    request(app)
      .post('/api/v1/parties')
      .set('Accept', 'application/json')
      .set('authorization', adminToken)
      .send({ ...invalidPartyDetails })
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        expect(res.body).to.be.a('object');
        expect(res.body.errors).to.be.a('array');

        done(err);
      });
  });

  it('should return error of missing name field', (done) => {
    request(app)
      .post('/api/v1/parties')
      .set('Accept', 'application/json')
      .set('authorization', adminToken)
      .send({ ...invalidPartyDetails })
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        expect(res.body.errors[0].param).to.equal('name');
        done(err);
      });
  });
});
