/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-undef */
import request from 'supertest';
import { expect } from 'chai';
import mockData from '../utils/mockData';
import app from '../../src/app';
import tokens from './auth/login';

const { invalidDetails } = mockData.votes;
const { userToken } = tokens;


describe('Votes', () => {
  describe('## Wrong Input', () => {
    it('should output error if candidate does not exist', (done) => {
      request(app)
        .post('/api/v1/votes')
        .set('Accept', 'application/json')
        .set('authorization', userToken)
        .send({ ...invalidDetails })
        .end((err, res) => {
          expect(res.statusCode).to.equal(404);
          expect(res.body).to.include.keys('message');
          expect(res.body.message).to.equal('Candidate does not exists');

          done(err);
        });
    });

    it('should output error for unauthorized user', (done) => {
      request(app)
        .post('/api/v1/votes')
        .set('Accept', 'application/json')
        .send({ ...invalidDetails })
        .end((err, res) => {
          expect(res.statusCode).to.equal(401);
          expect(res.body).to.include.keys('error');
          expect(res.body.error).to.equal('Unauthorized user');

          done(err);
        });
    });
  });
});
