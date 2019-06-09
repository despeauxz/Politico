/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-undef */
import request from 'supertest';
import { expect } from 'chai';
import app from '../../../src/app';
import tokens from '../auth/login';

const validID = 1;
const invalidID = 30;

const { userToken } = tokens;

describe('Offices route: Get Offices', () => {
  it('should get all offices', (done) => {
    request(app)
      .get('/api/v1/offices')
      .set('authorization', userToken)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body.data).to.be.a('array');

        done(err);
      });
  });

  it('should get all offices', (done) => {
    request(app)
      .get('/api/v1/offices')
      .end((err, res) => {
        expect(res.statusCode).to.equal(401);
        expect(res.body).to.be.a('object');
        expect(res.body).to.include.keys('error');
        expect(res.body.error).to.equal('Unauthorized user');

        done(err);
      });
  });

  describe('Get a specific Office:', () => {
    it('should get an Office by a valid ID', (done) => {
      request(app)
        .get(`/api/v1/offices/${validID}`)
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
        .get(`/api/v1/offices/${invalidID}`)
        .set('authorization', userToken)
        .end((err, res) => {
          expect(res.statusCode).to.equal(404);
          expect(res.body.message).to.equal('Office Not Found');

          done(err);
        });
    });
  });
});
