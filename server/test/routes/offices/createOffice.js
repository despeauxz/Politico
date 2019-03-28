/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
import request from 'supertest';
import { expect } from 'chai';
import mockData from '../../utils/mockData';
import app from '../../../src/app';
import tokens from '../auth/login';

const { createOfficeDetails, invalidOfficeDetails } = mockData.createOffice;
const { userToken, adminToken } = tokens;

describe('Office Routes: create a new office', () => {
  it('should add a new office', (done) => {
    request(app)
      .post('/api/v1/offices')
      .set('Accept', 'application/json')
      .set('authorization', adminToken)
      .send({ ...createOfficeDetails })
      .end((err, res) => {
        expect(res.statusCode).to.equal(201);
        expect(res.body).to.be.a('object');

        done();
      });
  })

  it('should check for office unique name field', (done) => {
    request(app)
      .post('/api/v1/offices')
      .set('Accept', 'application/json')
      .set('authorization', adminToken)
      .send({ ...createOfficeDetails })
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        expect(res.body).to.include.keys('error');

        done();
      });
  })


  it('should return errors for unauthorized access', (done) => {
    request(app)
      .post('/api/v1/offices')
      .set('Accept', 'application/json')
      .send({ ...invalidOfficeDetails })
      .end((err, res) => {
        expect(res.statusCode).to.equal(401);
        expect(res.body).to.be.a('object');
        expect(res.body).to.include.keys('error');
        expect(res.body.error).to.equal('Unauthorized user');

        done();
      });
  });

  it('should check for office unique field', (done) => {
    request(app)
      .post('/api/v1/offices')
      .set('Accept', 'application/json')
      .set('authorization', adminToken)
      .send({ ...createOfficeDetails })
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        expect(res.body).to.include.keys('error');
        expect(res.body.error).to.equal('Office already exists');

        done(err);
      });
  });

  it('should return error of forbiden access', (done) => {
    request(app)
      .post('/api/v1/parties')
      .set('Accept', 'application/json')
      .set('authorization', userToken)
      .send({ ...invalidOfficeDetails })
      .end((err, res) => {
        expect(res.statusCode).to.equal(403);
        expect(res.body).to.include.keys('message');
        expect(res.body.message).to.equal('Unauthorized Access! Admin only');

        done();
      });
  });
});
