import pool from '../migrations';

export default {
  /**
     * Database Queries
     * @param {*} queries
     * @param {*} params
     * @returns { object } Object
     * Gotten from Olawale Aladeusi post on Codementor
     */
  query(queries, params) {
    return new Promise((resolve, reject) => {
      pool.query(queries, params)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};
