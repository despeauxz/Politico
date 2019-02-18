/* eslint-disable class-methods-use-this */
import moment from 'moment';
import db from './index';


class Petition {
  create(req, data) {
    const value = [
      req.user.id,
      data.office_id,
      data.title,
      data.text,
      moment(new Date()),
    ];

    const text = `INSERT INTO
        petitions(created_by, office_id, title, text, created_at)
        VALUES ($1, $2, $3, $4, $5) returning *`;

    const response = db.query(text, value);
    return response;
  }
}

export default new Petition();
