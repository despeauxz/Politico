import request from 'supertest';
import { expect } from 'chai';
import app from '../../../src/app';


describe('Auth routes: Forgot Password', () => {
  it('should return error invalid email', (done) => {
    request(app)
      .post('/api/v1/auth/forgot_password')
      .set('Accept', 'application/json')
      .send({ email: 'malik@gmail.com' })
      .end((err, res) => {
        expect(res.statusCode).to.equal(404);
        expect(res.body).to.include.keys('error');
        expect(res.body.error).to.equal('User could not be found, Please Signup instead');

        done(err);
      });
  });
});
