import request from 'supertest';
import { expect } from 'chai';
import app from '../../../src/app';

const validID = 'fb097bde-5959-45ff-8e21-51184fa60c25';
const invalidID = 'fb097bde-5959-45ff-8e21-51184fa60c';

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