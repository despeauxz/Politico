import moment from 'moment';
import db from '../models';
import hashPassword from '../helpers/hashPassword';

const text = 'INSERT INTO users (firstname, lastname, email, isAdmin, password, created_at) VALUES ($1, $2, $3, $4, $5, $6)';
const values = ['Godwin', 'Malik', 'malikberwy@gmail.com', true, hashPassword('password', 10), moment(new Date())];
db.query(text, values);
