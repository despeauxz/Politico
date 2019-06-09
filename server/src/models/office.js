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
      data.electionDate || null,
      moment(new Date()),
    ];

    const text = `INSERT INTO
      Offices(name, type, electionDate, created_at)
      VALUES ($1, $2, $3, $4) returning *`;

    const response = db.query(text, value);
    return response;
  }

  findOne(id) {
    const text = 'SELECT * FROM Offices WHERE id = $1';
    const response = db.query(text, [id]);
    return response;
  }

  findAll() {
    const findAllQuery = 'SELECT * FROM Offices';
    const response = db.query(findAllQuery);
    return response;
  }

  update(id, data) {
    const text = `UPDATE Offices
      SET name=$1, type=$2, electiondate=$3, modified_at=$4 WHERE id=$5 returning *`;
    const values = [
      data.name,
      data.type,
      data.electionDate,
      moment(new Date()),
      id,
    ];
    const response = db.query(text, values);
    return response;
  }

  delete(id) {
    const deleteQuery = 'DELETE FROM Offices WHERE id=$1 returning *';
    db.query(deleteQuery, [id]);
  }
}

export default new Office();
