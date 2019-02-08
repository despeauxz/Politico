import uuidv4 from 'uuid/v4';
import moment from 'moment';
import db from '../models';
import hashPassword from '../helpers/hashPassword';

const text = 'INSERT INTO users (id, firstname, lastname, othername, email, digit, is_admin, password, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)';
const values = [uuidv4(), 'John', 'Doe', 'Berry', 'admin@email.com', '0810877621', true, hashPassword('password', 10), moment(new Date())];
db.query(text, values);
