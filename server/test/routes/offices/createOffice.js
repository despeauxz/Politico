import request from 'supertest';
import { expect } from 'chai';
import mockData from '../../utils/mockData';
import app from '../../../src/app';

const { createOfficeDetails, invalidOfficeDetails } = mockData.createOffice;

describe('Office Routes: create a new office', () => {
    it('should add a new office', (done) => {
        request(app)
            .post('/api/v1/offices')
            .set('Accept', 'application/json')
            .send({ ...createOfficeDetails })
            .end((err, res) => {
                expect(res.statusCode).to.equal(201);
                expect(res.body).to.be.a('object');

            done(err);
            });
    })

    it('should check for field satisfaction', (done) => {
        request(app)
            .post('/api/v1/offices')
            .set('Accept', 'application/json')
            .send({ ...createOfficeDetails })
            .end((err, res) => {
                expect(res.statusCode).to.equal(400);
                expect(res.body).to.include.keys('message');

            done(err);
            });
    })

    it('should return errors for invalid fields', (done) => {
        request(app)
            .post('/api/v1/offices')
            .set('Accept', 'application/json')
            .send({ ...invalidOfficeDetails })
            .end((err, res) => {
                expect(res.statusCode).to.equal(400);
                expect(res.body).to.be.a('object');
                expect(res.body).to.include.keys('errors');

            done(err);
            });
    });

    it('should return error of missing name field', (done) => {
        request(app)
            .post('/api/v1/parties')
            .set('Accept', 'application/json')
            .send({ ...invalidOfficeDetails })
            .end((err, res) => {
                expect(res.statusCode).to.equal(400);
                expect(res.body.errors).to.include.keys('name');

            done(err);
            });
    });

})