/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-undef */
import request from 'supertest';
import { expect } from 'chai';
import mockData from '../../utils/mockData';
import app from '../../../src/app';
import tokens from '../auth/login';

const { createPartyDetails } = mockData.createParty;
const { userToken, adminToken } = tokens;


describe('Join Party', () => {
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

  it('should return error for party not found', (done) => {
    request(app)
      .patch('/api/v1/auth/join-party')
      .set('Accept', 'application/json')
      .set('authorization', userToken)
      .send({ party_id: 20 })
      .end((err, res) => {
        expect(res.statusCode).to.equal(404);
        expect(res.body).to.be.a('object');
        expect(res.body).to.include.keys('error');

        done(err);
      });
  });

  it('should return error for unauthorized user', (done) => {
    request(app)
      .patch('/api/v1/auth/join-party')
      .set('Accept', 'application/json')
      .send({ party_id: 2 })
      .end((err, res) => {
        expect(res.statusCode).to.equal(401);
        expect(res.body).to.include.keys('error');
        expect(res.body.error).to.equal('Unauthorized user');

        done(err);
      });
  });

  it('should return chosen party & user details with new party ID', (done) => {
    request(app)
      .patch('/api/v1/auth/join-party')
      .set('Accept', 'application/json')
      .set('authorization', userToken)
      .send({ partyId: 2 })
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.a('object');
        expect(res.body).to.include.keys('message');
        expect(res.body).to.include.keys('data');

        done(err);
      });
  });
});
