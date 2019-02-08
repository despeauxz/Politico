import request from 'supertest';
import { expect } from 'chai';
import app from '../../../src/app';

const validID = 1;
const invalidID = 30;


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
                    expect(res.body.message).to.equal('Office Not Found');

                done(err);
                });
        });
    })
});
