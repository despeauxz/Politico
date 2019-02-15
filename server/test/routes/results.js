/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-undef */
import request from 'supertest';
import { expect } from 'chai';
import app from '../../src/app';
import tokens from './auth/login';

const invalidId = 20;
const { userToken } = tokens;


describe('Results', () => {
  describe('## Wrong Input', () => {
    it('should output error if office not found', (done) => {
      request(app)
        .get(`/api/v1/office/${invalidId}/result`)
        .set('authorization', userToken)
        .end((err, res) => {
          expect(res.statusCode).to.equal(404);
          expect(res.body).to.include.keys('error');
          expect(res.body.error).to.equal('Office not found');

          done(err);
        });
    });

    it('should output error for unauthorized user', (done) => {
      request(app)
        .get(`/api/v1/office/${invalidId}/result`)
        .end((err, res) => {
          expect(res.statusCode).to.equal(401);
          expect(res.body).to.include.keys('error');
          expect(res.body.error).to.equal('Unauthorized user');

          done(err);
        });
    });
  });
});
