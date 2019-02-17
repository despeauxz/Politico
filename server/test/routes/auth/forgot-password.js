/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-undef */
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

  it('should send email to reset password', (done) => {
    request(app)
      .post('/api/v1/auth/forgot_password')
      .set('Accept', 'application/json')
      .send({ email: 'example@gmail.com' })
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.include.keys('message');
        expect(res.body.message).to.equal('A reset token has been sent to your email address');

        done(err);
      });
  });
});
