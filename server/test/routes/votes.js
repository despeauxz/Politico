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
  describe('## Right Input', () => {
    it('should be able to vote a candidate', (done) => {
      request(app)
        .post('/api/v1/votes')
        .set('Accept', 'application/json')
        .set('authorization', userToken)
        .send({ officeId: 2, candidateId: 1 })
        .end((err, res) => {
          expect(res.statusCode).to.equal(201);
          expect(res.body).to.include.keys('message');
          expect(res.body.message).to.equal('Your vote has been successfuly casted');

          done(err);
        });
    });
  });

  describe('## Wrong Input', () => {
    it('should error for unscheduled election date', (done) => {
      request(app)
        .post('/api/v1/votes')
        .set('Accept', 'application/json')
        .set('authorization', userToken)
        .send({ officeId: 1, candidateId: 1 })
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body).to.include.keys('error');
          expect(res.body.error).to.equal('Election date hasn\'t been fixed yet');

          done(err);
        });
    });

    it('should output error if candidate does not exist', (done) => {
      request(app)
        .post('/api/v1/votes')
        .set('Accept', 'application/json')
        .set('authorization', userToken)
        .send({ ...invalidDetails })
        .end((err, res) => {
          expect(res.statusCode).to.equal(404);
          expect(res.body).to.include.keys('error');
          expect(res.body.error).to.equal('Candidate does not exists');

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

describe('## Voting history', () => {
  it('should return user voting history', (done) => {
    request(app)
      .get('/api/v1/votes/history')
      .set('authorization', userToken)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.include.keys('data');
        expect(res.body).to.include.keys('rowCount');
        expect(res.body.data).to.be.a('array');

        done(err);
      });
  });

  it('should return an error for unauthorized user', (done) => {
    request(app)
      .get('/api/v1/votes/history')
      .end((err, res) => {
        expect(res.statusCode).to.equal(401);
        expect(res.body).to.include.keys('error');
        expect(res.body.error).to.equal('Unauthorized user');

        done(err);
      });
  });
});
