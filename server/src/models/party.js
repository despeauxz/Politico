/* eslint-disable class-methods-use-this */
import moment from 'moment';
import db from './index';


class Party {
  /**
   * Create a new party
   * @param {*} data
   * @returns { object } party object
   * @memberof Party
   */
  create(data) {
    const newParty = [
      data.name,
      data.hqAddress,
      data.fullname,
      data.logoUrl,
      moment(new Date()),
    ];

    const text = `INSERT INTO
        Parties(name, hqAddress, fullname, logoUrl, created_at)
        VALUES ($1, $2, $3, $4, $5) returning *`;

    const response = db.query(text, newParty);
    return response;
  }

  findOne(id) {
    const text = 'SELECT * FROM Parties WHERE id = $1';
    const response = db.query(text, [id]);
    return response;
  }

  findAll() {
    const findAllQuery = 'SELECT * FROM Parties ORDER BY id ASC';
    const response = db.query(findAllQuery);
    return response;
  }

  update(id, data) {
    const text = `UPDATE Parties
      SET name=$1, modified_at=$2 WHERE id=$3 returning *`;
    const values = [
      data.name,
      moment(new Date()),
      id,
    ];
    const response = db.query(text, values);
    return response;
  }

  delete(id) {
    const deleteQuery = 'DELETE FROM Parties WHERE id=$1 returning *';
    db.query(deleteQuery, [id]);
  }
}

export default new Party();
