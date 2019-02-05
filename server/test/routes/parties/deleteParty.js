import request from 'supertest';
import { expect } from 'chai';
import app from '../../../src/app';

const validID = 1;
const invalidID = 30;

describe('delete party', () => {
    it('should delete an existing party', (done) => {
        request(app)
            .delete(`/api/v1/parties/${validID}`)
            .end((err, res) => {
                expect(res.statusCode).to.equal(200);
                expect(res.body).to.be.a('object');

            done(err);
            })
    })

    it('should return error for invalid ID', (done) => {
        request(app)
            .delete(`/api/v1/parties/${invalidID}`)
            .end((err, res) => {
                expect(res.statusCode).to.equal(404);
                expect(res.body).to.include.keys('error');

            done(err);
            });
    })
})