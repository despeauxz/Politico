import pool from './index';


const createOfficesTable = () => {
    const queryText =
        `CREATE TABLE IF NOT EXISTS
            offices(
                id UUID PRIMARY KEY,
                name VARCHAR(128) UNIQUE NOT NULL,
                type VARCHAR(128) NOT NULL,
                created_at TIMESTAMP,
                modified_at TIMESTAMP DEFAULT NULL
            )`;

    pool.query(queryText)
        .then((res) => {
            console.log(res);
            pool.end();
        }).catch((err) => {
            console.log(err);
            pool.end();
        });
};


module.exports = {
    createOfficesTable,
};

require('make-runnable');
