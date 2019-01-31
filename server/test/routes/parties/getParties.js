import request from 'supertest';
import { expect } from 'chai';
import app from '../../../src/app';

const validID = 'fb097bde-5959-45ff-8e21-51184fa60c25';
const invalidID = 'fb097bde-5959-45ff-8e21-51184fa60c';

describe('Parties route:', () => {
    it('should get all parties', (done) => {
        request(app)
            .get('/api/v1/parties')
            .end((err, res) => {
                expect(res.statusCode).to.equal(200);
                expect(res.body.data).to.be.a('array');

            done(err);
            });
    });

    it('should get parties by a valid ID', (done) => {
        request(app)
            .get(`/api/v1/parties/${validID}`)
            .end((err, res) => {
                expect(res.statusCode).to.equal(200);
                expect(res.body).to.be.a('object');
                expect(res.body).to.include.keys('data');

            done(err);
            });
    });

    it('should return errors for invalid ID', (done) => {
        request(app)
            .get(`/api/v1/parties/${invalidID}`)
            .end((err, res) => {
                expect(res.statusCode).to.equal(404);
                expect(res.body).to.include.keys('error');
                expect(res.body.error).to.equal('party not found');

            done(err);
            });
    });
})