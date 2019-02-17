/* eslint-disable class-methods-use-this */
import moment from 'moment';
import db from './index';


class Office {
  /**
     * Create a new office
     * @param {*} data
     * @returns { object } office object
     * @memberof Party
     */
  create(data) {
    const value = [
      data.name,
      data.type,
      moment(new Date()),
    ];

    const text = `INSERT INTO
      offices(name, type, created_at)
      VALUES ($1, $2, $3) returning *`;

    const response = db.query(text, value);
    return response;
  }

  findOne(id) {
    const text = 'SELECT * FROM offices WHERE id = $1';
    const response = db.query(text, [id]);
    return response;
  }

  findAll() {
    const findAllQuery = 'SELECT * FROM offices';
    const response = db.query(findAllQuery);
    return response;
  }
}

export default new Office();