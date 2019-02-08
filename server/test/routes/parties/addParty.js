import request from 'supertest';
import { expect } from 'chai';
import mockData from '../../utils/mockData';
import app from '../../../src/app';

const { createPartyDetails, invalidPartyDetails } = mockData.createParty;

describe('Party Routes: create a new party', () => {
    it('should add a new party', (done) => {
        request(app)
            .post('/api/v1/parties')
            .set('Accept', 'application/json')
            .send({ ...createPartyDetails })
            .end((err, res) => {
                expect(res.statusCode).to.equal(201);
                expect(res.body).to.be.a('object');

            done(err);
            })
    })

    it('should return errors for invalid fields', (done) => {
        request(app)
            .post('/api/v1/parties')
            .set('Accept', 'application/json')
            .send({ ...invalidPartyDetails })
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
            .send({ ...invalidPartyDetails })
            .end((err, res) => {
                expect(res.statusCode).to.equal(400);
                expect(res.body.errors).to.include.keys('name');
            done(err);
            });
    });

})