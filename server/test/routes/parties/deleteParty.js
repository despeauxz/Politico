/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
import request from 'supertest';
import { expect } from 'chai';
import app from '../../../src/app';
import tokens from '../auth/login';

const validID = 1;
const invalidID = 30;
const { userToken, adminToken } = tokens;

describe('delete party', () => {
  it('should delete an existing party', (done) => {
    request(app)
      .delete(`/api/v1/parties/${validID}`)
      .set('authorization', adminToken)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.a('object');

        done(err);
      });
  });

  it('should return error for forbidden access', (done) => {
    request(app)
      .delete(`/api/v1/parties/${validID}`)
      .set('authorization', userToken)
      .end((err, res) => {
        expect(res.statusCode).to.equal(403);
        expect(res.body).to.be.a('object');
        expect(res.body).to.include.keys('message');

        done(err);
      });
  });

  it('should return error for unauthorized access', (done) => {
    request(app)
      .delete(`/api/v1/parties/${validID}`)
      .end((err, res) => {
        expect(res.statusCode).to.equal(401);
        expect(res.body).to.include.keys('error');
        expect(res.body.error).to.equal('Unauthorized user');

        done(err);
      });
  });

  it('should return error for invalid ID', (done) => {
    request(app)
      .delete(`/api/v1/parties/${invalidID}`)
      .set('authorization', adminToken)
      .end((err, res) => {
        expect(res.statusCode).to.equal(404);
        expect(res.body).to.include.keys('error');

        done(err);
      });
  });
});
