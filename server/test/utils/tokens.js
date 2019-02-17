import jwt from 'jsonwebtoken';
import moment from 'moment';

const tokens = {
  adminToken: `Bearer ${jwt.sign({
    id: 1,
    firstname: 'John',
    lastname: 'Doe',
    othername: 'Berry',
    email: 'admin@email.com',
    digit: 123456789,
    is_admin: true,
    password: 'password',
    passwordConfirm: 'password',
    created_at: moment(new Date()),
  }, 'ilovejavascript', { expiresIn: '48 hour' })}`,
  userToken: `Bearer ${jwt.sign({
    id: 2,
    firstname: 'John',
    lastname: 'Doe',
    othername: 'Berry',
    email: 'example@gmail.com',
    digit: 123456789,
    password: 'password',
    passwordConfirm: 'password',
    created_at: moment(new Date())
  }, 'ilovejavascript', { expiresIn: '48 hour' })}`,
};


export default tokens;
