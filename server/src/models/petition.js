/* eslint-disable class-methods-use-this */
import moment from 'moment';
import db from './index';


class Petition {
  create(req, data) {
    const value = [
      req.user.id,
      data.officeId,
      data.title,
      data.text,
      moment(new Date()),
    ];

    const text = `INSERT INTO
        Petitions(created_by, officeId, title, text, created_at)
        VALUES ($1, $2, $3, $4, $5) returning *`;

    const response = db.query(text, value);
    return response;
  }

  findAll() {
    const findAllQuery = `SELECT Petitions.id, Petitions.title, Petitions.text, Petitions.evidence, Petitions.created_at, 
      Users.firstname as firstname, Users.lastname as lastname, Offices.name as officename FROM Petitions 
      LEFT JOIN Users ON Users.id = Petitions.created_by 
      LEFT JOIN Offices ON Offices.id = Petitions.officeid`;
    const response = db.query(findAllQuery);
    return response;
  }
}

export default new Petition();
