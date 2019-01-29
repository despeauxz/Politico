import request from 'supertest';
import { expect } from 'chai';
import app from '../../../src/app';

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
})