import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import hashPassword from '../../src/helpers/hashPassword';

config();

const tokens = {
  adminToken: `Bearer ${jwt.sign({
    id: 2,
    firstname: 'John',
    lastname: 'Doe',
    othername: 'Berry',
    email: 'admin@email.com',
    digit: 123456789,
    is_admin: true,
    password: hashPassword('password', 10),
  }, process.env.SECRET, { expiresIn: '48 hour' })}`,
  userToken: `Bearer ${jwt.sign({
    id: 1,
    firstname: 'John',
    lastname: 'Doe',
    othername: 'Berry',
    email: 'example@gmail.com',
    digit: 123456789,
    password: hashPassword('password', 10),
  }, process.env.SECRET, { expiresIn: '48 hour' })}`,
};


export default tokens;
