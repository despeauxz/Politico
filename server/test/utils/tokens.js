import jwt from 'jsonwebtoken';
import uuidv4 from 'uuid/v4';
import moment from 'moment';

const tokens = {
  adminToken: `Bearer ${jwt.sign({
    id: uuidv4(),
    firstname: 'John',
    lastname: 'Doe',
    othername: 'Berry',
    email: 'example@gmail.com',
    digit: 123456789,
    is_admin: true,
    password: 'password',
    passwordConfirm: 'password',
    created_at: moment(new Date()),
  }, process.env.SECRET, { expiresIn: '48 hour' })}`,
};

export default tokens;
