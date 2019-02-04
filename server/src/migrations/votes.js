import pool from './index';


const createVotesTable = () => {
    const queryText =
        `CREATE TABLE IF NOT EXISTS
            votes(
                id SERIAL PRIMARY KEY,
                createdOn TIMESTAMP,
                FOREIGN KEY (createdBy) REFERENCES users (id) ON DELETE CASCADE,
                FOREIGN KEY (office) REFERENCES offices (id) ON DELETE CASCADE,
                FOREIGN KEY (candidate) REFERENCES candidates (id) ON DELETE CASCADE,
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
    createVotesTable,
};

require('make-runnable');
