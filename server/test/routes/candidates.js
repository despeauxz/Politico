/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-undef */
import request from 'supertest';
import { expect } from 'chai';
import mockData from '../utils/mockData';
import app from '../../src/app';
import tokens from './auth/login';


const validId = 1;
const newId = 2;
const invalidId = 40;
const { validDetails, emptyDetails } = mockData.candidates;
const { userToken, adminToken } = tokens;

describe('Register Candidate', () => {
  describe('## Wrong Input', () => {
    it('should return error for invalid user ID', (done) => {
      request(app)
        .post(`/api/v1/office/${invalidId}/register`)
        .set('Accept', 'application/json')
        .set('authorization', adminToken)
        .send({ ...validDetails })
        .end((err, res) => {
          expect(res.statusCode).to.equal(404);
          expect(res.body).to.include.keys('message');
          expect(res.body.message).to.equal('User not found');

          done(err);
        });
    });

    it('should return error for forbidden access', (done) => {
      request(app)
        .post(`/api/v1/office/${validId}/register`)
        .set('Accept', 'application/json')
        .set('authorization', userToken)
        .send({ ...validDetails })
        .end((err, res) => {
          expect(res.statusCode).to.equal(403);
          expect(res.body).to.include.keys('message');

          done(err);
        });
    });

    it('should return error for unauthorized user', (done) => {
      request(app)
        .post(`/api/v1/office/${validId}/register`)
        .set('Accept', 'application/json')
        .send({ ...validDetails })
        .end((err, res) => {
          expect(res.statusCode).to.equal(401);
          expect(res.body).to.include.keys('error');
          expect(res.body.error).to.equal('Unauthorized user');

          done(err);
        });
    });

    it('should return error with empty request', (done) => {
      request(app)
        .post(`/api/v1/office/${newId}/register`)
        .set('Accept', 'application/json')
        .set('authorization', adminToken)
        .send({ ...emptyDetails })
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body).to.include.keys('errors');
          expect(res.body.errors).to.include.keys('officeId');
          expect(res.body.errors).to.include.keys('partyId');

          done(err);
        });
    });
  });
});
