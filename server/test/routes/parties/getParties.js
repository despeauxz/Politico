/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-undef */
import request from 'supertest';
import { expect } from 'chai';
import app from '../../../src/app';
import tokens from '../auth/login';

const validID = 1;
const invalidID = 30;
const { userToken } = tokens;

describe('Parties route:', () => {
  it('should get all parties', (done) => {
    request(app)
      .get('/api/v1/parties')
      .set('authorization', userToken)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body.data).to.be.a('array');

        done(err);
      });
  });

  it('should return errors for unauthorized user', (done) => {
    request(app)
      .get('/api/v1/parties')
      .end((err, res) => {
        expect(res.statusCode).to.equal(401);
        expect(res.body).to.include.keys('error');

        done(err);
      });
  });

  it('should get parties by a valid ID', (done) => {
    request(app)
      .get(`/api/v1/parties/${validID}`)
      .set('authorization', userToken)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.a('object');
        expect(res.body).to.include.keys('data');

        done(err);
      });
  });

  it('should return errors for invalid ID', (done) => {
    request(app)
      .get(`/api/v1/parties/${invalidID}`)
      .set('authorization', userToken)
      .end((err, res) => {
        expect(res.statusCode).to.equal(404);
        expect(res.body).to.be.a('object');

        done(err);
      });
  });
});
