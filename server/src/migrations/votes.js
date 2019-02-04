import pool from './index';


const createVotesTable = () => {
    const queryText =
        `CREATE TABLE IF NOT EXISTS
            votes(
                id SERIAL PRIMARY KEY,
                createdOn TIMESTAMP,
                created_by UUID NOT NULL,
                office_id UUID NOT NULL,
                candidate_id INT NOT NULL,
                FOREIGN KEY (created_by) REFERENCES users (id) ON DELETE CASCADE,
                FOREIGN KEY (office_id) REFERENCES offices (id) ON DELETE CASCADE,
                FOREIGN KEY (candidate_id) REFERENCES candidates (id) ON DELETE CASCADE,
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
