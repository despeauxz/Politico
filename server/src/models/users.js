/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
import moment from 'moment';
import db from './index';
import hashPassword from '../helpers/hashPassword';

class User {
  create(req, data) {
    const text = `INSERT INTO
        users(firstname, lastname, email, isAdmin, password, created_at) 
        VALUES ($1, $2, $3, $4, $5, $6) returning *`;
    const {
      firstname, lastname, email, password, passwordCofirm,
    } = data;
    const newPassword = hashPassword(password, 10);
    const { admin } = req.query;
    const user = [
      firstname, lastname, email.toLowerCase(), admin,
      newPassword, moment(new Date()),
    ];
    const response = db.query(text, user);
    return response;
  }

  find(key) {
    const query = 'SELECT * FROM users WHERE email=$1';
    const response = db.query(query, [key]);
    return response;
  }

  update(req, data) {
    const updateQuery = `UPDATE users
      SET firstname=$1, lastname=$2, modified_at=$3 WHERE email=$4 returning *`;
    const value = [
      data.firstname || req.user.firstname,
      data.lastname || req.user.lastname,
      moment(new Date()),
      req.user.email,
    ];
    const response = db.query(updateQuery, value);
    return response;
  }

  updateToken(req, token, expiry, email) {
    const updateQuery = `UPDATE Users
      SET resetPasswordToken=$1, resetPasswordExpiry=$2, modified_at=$3 WHERE email=$4 returning *`;

    const values = [
      token,
      expiry,
      moment(new Date()),
      email,
    ];
    const response = db.query(updateQuery, values);
    return response;
  }

  updateParty(req, data) {
    const updateQuery = `UPDATE users
      SET partyId=$1, modified_at=$2 WHERE email=$3 returning *`;
    const value = [
      data.partyId,
      moment(new Date()),
      req.user.email,
    ];
    const response = db.query(updateQuery, value);
    return response;
  }

  findByToken(req, token, expiry) {
    const query = 'SELECT * FROM Users WHERE resetPasswordToken=$1 && (resetPasswordExpiry) < $2';
    const values = [
      token,
      expiry,
    ];

    const response = db.query(query, values);
    return response;
  }
}

export default new User();
