import request from 'supertest';
import { expect } from 'chai';
import app from '../../../src/app';


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
});
