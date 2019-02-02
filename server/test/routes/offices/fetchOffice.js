import request from 'supertest';
import { expect } from 'chai';
import app from '../../../src/app';

const validID = '303e1797-3c0b-4dc4-8ad7-e926a165f67c';
const invalidID = '303e1797-3c0b-4dc4-8ad7-e926a165f63se';


describe('Offices route: Get Offices', () => {
    it('should get all offices', (done) => {
        request(app)
            .get('/api/v1/offices')
            .end((err, res) => {
                expect(res.statusCode).to.equal(200);
                expect(res.body.data).to.be.a('array');

            done(err);
            });
    });

    describe('Get a specific Office:', () => {
        it('should get an Office by a valid ID', (done) => {
            request(app)
                .get(`/api/v1/offices/${validID}`)
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
                .end((err, res) => {
                    expect(res.statusCode).to.equal(404);
                    expect(res.body).to.include.keys('error');
                    expect(res.body.error).to.equal('Office not found');

                done(err);
                });
        });
    })
});
