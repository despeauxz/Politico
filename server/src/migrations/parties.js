import pool from './index';


const createPartiesTable = () => {
    const queryText =
        `CREATE TABLE IF NOT EXISTS
            parties(
                id UUID PRIMARY KEY,
                name VARCHAR(128) UNIQUE NOT NULL,
                hq_address TEXT NOT NULL,
                logo_url VARCHAR(128) NOT NULL,
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
    createPartiesTable,
};

require('make-runnable');
