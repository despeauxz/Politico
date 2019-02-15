/* eslint-disable no-undef */
import request from 'supertest';
import { expect } from 'chai';
import app from '../../../src/app';
import tokens from '../auth/login';

const validID = 1;
const invalidID = 30;
const { userToken, adminToken } = tokens;

describe('Party\'s Route: Update parties name', () => {
  it('should change the name of given party', (done) => {
    request(app)
      .patch(`/api/v1/parties/${validID}/name`)
      .set('Accept', 'application/json')
      .set('authorization', adminToken)
      .send({ name: 'PPC' })
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.a('object');
        expect(res.body.data).to.include.keys('name');

        done(err);
      })
  });

  it('should return error for forbidden access', (done) => {
    request(app)
      .patch(`/api/v1/parties/${validID}/name`)
      .set('Accept', 'application/json')
      .set('authorization', userToken)
      .send({ name: 'PPC' })
      .end((err, res) => {
        expect(res.statusCode).to.equal(403);
        expect(res.body).to.be.a('object');
        expect(res.body).to.include.keys('message');

        done(err);
      })
  });

  it('should return error for unauthorized user', (done) => {
    request(app)
      .patch(`/api/v1/parties/${validID}/name`)
      .set('Accept', 'application/json')
      .send({ name: 'PPC' })
      .end((err, res) => {
        expect(res.statusCode).to.equal(401);
        expect(res.body).to.be.a('object');
        expect(res.body).to.include.keys('error');
        expect(res.body.error).to.equal('Unauthorized user');

        done(err);
      })
  });

  it('should output error for invalid party ID', (done) => {
    request(app)
      .patch(`/api/v1/parties/${invalidID}/name`)
      .set('Accept', 'application/json')
      .set('authorization', adminToken)
      .send({ name: 'PDP' })
      .end((err, res) => {
        expect(res.statusCode).to.equal(404);
        expect(res.body).to.include.keys('error');

        done(err);
      })
  });
});
