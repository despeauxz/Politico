import request from 'supertest';
import { expect } from 'chai';
import app from '../../../src/app';

const validID = 1;
const invalidID = 30;

describe('Party\'s Route: Update parties name', () => {
    it('should change the name of given party', (done) => {
        request(app)
            .patch(`/api/v1/parties/${validID}/name`)
            .set('Accept', 'application/json')
            .send({ name: 'APC' })
            .end((err, res) => {
                expect(res.statusCode).to.equal(200);
                expect(res.body).to.be.a('object');
                expect(res.body.data).to.include.keys('name');

            done(err);
            })
    });

    it('should output error for invalid party ID', (done) => {
        request(app)
            .patch(`/api/v1/parties/${invalidID}/name`)
            .set('Accept', 'application/json')
            .send({ name: 'PDP' })
            .end((err, res) => {
                expect(res.statusCode).to.equal(404);
                expect(res.body).to.include.keys('error');

            done(err);
            })
    })
})