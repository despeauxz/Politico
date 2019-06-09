/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
import request from 'supertest';
import { expect } from 'chai';
import mockData from '../../utils/mockData';
import app from '../../../src/app';
import tokens from '../auth/login';

const { validOfficeDetails, duplicateOfficeDetails } = mockData.updateOffice;
const { userToken, adminToken } = tokens;

describe('Office Routes', () => {
  describe('Update Office Details', () => {
    it('should update office and it\'s response', (done) => {
      request(app)
        .patch('/api/v1/offices/2')
        .set('Accept', 'application/json')
        .set('authorization', adminToken)
        .send({ ...validOfficeDetails })
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.be.a('object');
          expect(res.body.data).to.include.keys('name');
          expect(res.body.data).to.include.keys('type');
          expect(res.body.data).to.include.keys('electiondate');

          done(err);
        });
    });

    it('should return error for invalid office ID', (done) => {
      request(app)
        .patch('/api/v1/offices/10')
        .set('Accept', 'application/json')
        .set('authorization', adminToken)
        .send({ ...validOfficeDetails })
        .end((err, res) => {
          expect(res.statusCode).to.equal(404);
          expect(res.body).to.be.a('object');
          expect(res.body).to.include.keys('error');
          expect(res.body.error).to.equal('Office Not Found');

          done(err);
        });
    });

    it('should return error for duplicate update', (done) => {
      request(app)
        .patch('/api/v1/offices/2')
        .set('Accept', 'application/json')
        .set('authorization', adminToken)
        .send({ ...duplicateOfficeDetails })
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body).to.be.a('object');
          expect(res.body).to.include.keys('error');
          expect(res.body.error).to.equal('Office already exists');

          done(err);
        });
    });

    it('should return forbidden access', (done) => {
      request(app)
        .patch('/api/v1/offices/2')
        .set('Accept', 'application/json')
        .set('Authorization', userToken)
        .send({ ...validOfficeDetails })
        .end((err, res) => {
          expect(res.statusCode).to.equal(403);
          expect(res.body).to.include.keys('message');
          expect(res.body.message).to.equal('Unauthorized Access! Admin only');

          done(err);
        });
    });

    it('should return forbidden access', (done) => {
      request(app)
        .patch('/api/v1/offices/2')
        .set('Accept', 'application/json')
        .send({ ...validOfficeDetails })
        .end((err, res) => {
          expect(res.statusCode).to.equal(401);
          expect(res.body).to.include.keys('error');
          expect(res.body.error).to.equal('Unauthorized user');

          done(err);
        });
    });
  });

  describe('#Delete Office', () => {
    it('should delete and existing office', (done) => {
      request(app)
        .delete('/api/v1/offices/3')
        .set('Accept', 'application/json')
        .set('authorization', adminToken)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.be.a('object');
          expect(res.body).to.include.keys('message');
          expect(res.body.message).to.equal('Office successfully deleted');

          done(err);
        });
    });

    it('should return error for invalid office ID', (done) => {
      request(app)
        .delete('/api/v1/offices/10')
        .set('Accept', 'application/json')
        .set('authorization', adminToken)
        .end((err, res) => {
          expect(res.statusCode).to.equal(404);
          expect(res.body).to.be.a('object');
          expect(res.body).to.include.keys('error');
          expect(res.body.error).to.equal('Office Not Found');

          done(err);
        });
    });

    it('should return forbidden error', (done) => {
      request(app)
        .delete('/api/v1/offices/3')
        .set('Accept', 'application/json')
        .set('authorization', userToken)
        .end((err, res) => {
          expect(res.statusCode).to.equal(403);
          expect(res.body).to.include.keys('message');
          expect(res.body.message).to.equal('Unauthorized Access! Admin only');

          done(err);
        });
    });
  });
});
